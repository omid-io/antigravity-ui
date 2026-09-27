(function() {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");

    var LOG_PREFIX = "[Antigravity UI Loader]";
    var homeDir = os.homedir();
    var LOG_FILE = path.join(homeDir, "antigravity-ui.log");
    var LOADER_VERSION = "2.0.0";
    var EXT_DIR_RE = /^(?:omid-io\.)?antigravity-ui(?:-(\d+)\.(\d+)\.(\d+))?/;

    function log() {
        var args = Array.prototype.slice.call(arguments);
        var line = new Date().toISOString() + " " + args.join(" ") + "\n";
        try { fs.appendFileSync(LOG_FILE, line); } catch (e) {}
        console.warn.apply(console, [LOG_PREFIX].concat(args));
    }

    try {
        fs.writeFileSync(
            LOG_FILE,
            "=== antigravity-ui-loader started at " + new Date().toISOString() + " ===\nhome=" + homeDir + "\n"
        );
    } catch (initErr) {
        console.warn(LOG_PREFIX, "FATAL: cannot write log", initErr.message);
    }

    log("pid=" + process.pid, "version=" + LOADER_VERSION);

    var electron;
    try {
        electron = require("electron");
        log(
            "electron ok. app=" + (electron.app ? "ok" : "undefined") +
            " BrowserWindow=" + (electron.BrowserWindow ? "ok" : "undefined")
        );
    } catch (e) {
        log("FATAL: require('electron') failed:", e.message);
        return;
    }

    function parseExtensionVersion(dirName) {
        var m = dirName.match(EXT_DIR_RE);
        if (!m || !m[1]) return [0, 0, 0];
        return [Number(m[1]), Number(m[2]), Number(m[3])];
    }

    function compareExtensionDirs(a, b) {
        var va = parseExtensionVersion(a);
        var vb = parseExtensionVersion(b);
        for (var i = 0; i < 3; i++) {
            if (va[i] !== vb[i]) return va[i] - vb[i];
        }
        return 0;
    }

    function findRtlScript() {
        var args = process.argv;
        var extDir = "";
        for (var i = 0; i < args.length; i++) {
            if (args[i] === "--extensions-dir" && args[i + 1]) {
                extDir = args[i + 1];
                break;
            }
            if (typeof args[i].startsWith === "function" && args[i].startsWith("--extensions-dir=")) {
                extDir = args[i].slice("--extensions-dir=".length);
                break;
            }
        }
        var searchDirs = [];
        if (extDir) searchDirs.push(extDir);
        searchDirs.push(
            path.join(homeDir, ".antigravity-ide", "extensions"),
            path.join(homeDir, ".antigravity", "extensions"),
            path.join(homeDir, ".vscode", "extensions")
        );

        for (var s = 0; s < searchDirs.length; s++) {
            var candidateDir = searchDirs[s];
            if (!fs.existsSync(candidateDir)) continue;
            try {
                var entries = fs.readdirSync(candidateDir);
                var dirs = entries
                    .filter(function(d) { return EXT_DIR_RE.test(d); })
                    .sort(compareExtensionDirs);
                if (dirs.length > 0) {
                    var rtlPath = path.join(candidateDir, dirs[dirs.length - 1], "resources", "rtl.js");
                    if (fs.existsSync(rtlPath)) {
                        log("rtl.js found at:", rtlPath);
                        return rtlPath;
                    }
                }
            } catch (e) {
                log("searchDirs error in " + candidateDir + ":", e.message);
            }
        }
        return "";
    }

    function isWorkbenchUrl(url) {
        return typeof url === "string" && (
            url.indexOf("workbench.html") !== -1 ||
            url.indexOf("workbench-jetski-agent") !== -1 ||
            url.indexOf("workbench-dev.html") !== -1
        );
    }

    function isRtlRuntimeAlive(wc) {
        return wc.executeJavaScript('typeof window.__antigravityUiRtlScanAll === "function" || typeof window.__cursorRtlScanAll === "function"');
    }

    function runRtlScript(wc, label, currentUrl) {
        var rtlPath = findRtlScript();
        if (!rtlPath) {
            log(label, "rtl.js NOT FOUND");
            wc.__rtlInjecting = false;
            return;
        }
        var script = fs.readFileSync(rtlPath, "utf-8");
        var configScript = "window.__antigravityUiConfig = " + JSON.stringify({ editorRtl: "off" }) + ";\n";
        log(label, "executeJavaScript length:", script.length);
        wc.executeJavaScript(configScript + script)
            .then(function() { return isRtlRuntimeAlive(wc); })
            .then(function(alive) {
                wc.__rtlInjecting = false;
                if (alive) {
                    wc.__rtlInjectedUrl = currentUrl;
                    log(label, "OK, Antigravity UI runtime verified");
                } else {
                    wc.__rtlInjectedUrl = "";
                    log(label, "finished but runtime not verified");
                }
            })
            .catch(function(err) {
                wc.__rtlInjecting = false;
                wc.__rtlInjectedUrl = "";
                log(label, "ERROR:", err && err.message);
            });
    }

    function injectIntoWebContents(wc, label) {
        if (!wc || wc.isDestroyed()) { log(label, "wc destroyed"); return; }
        if (wc.__rtlInjecting) { log(label, "in flight"); return; }
        var currentUrl = "";
        try { currentUrl = wc.getURL ? wc.getURL() : ""; } catch (e) { currentUrl = ""; }
        if (!isWorkbenchUrl(currentUrl)) {
            log(label, "not workbench url=" + currentUrl);
            return;
        }
        if (wc.__rtlInjectedUrl === currentUrl) {
            isRtlRuntimeAlive(wc)
                .then(function(alive) {
                    if (alive) {
                        log(label, "already active");
                        return;
                    }
                    wc.__rtlInjectedUrl = "";
                    injectIntoWebContents(wc, label + "-revive");
                })
                .catch(function() {
                    wc.__rtlInjectedUrl = "";
                    injectIntoWebContents(wc, label + "-revive");
                });
            return;
        }
        wc.__rtlInjecting = true;
        try {
            runRtlScript(wc, label, currentUrl);
        } catch (e) {
            wc.__rtlInjecting = false;
            wc.__rtlInjectedUrl = "";
            log(label, "inject error:", e.message);
        }
    }

    function scheduleInjectFallback(wc, winId) {
        var delays = [250, 1000];
        for (var i = 0; i < delays.length; i++) {
            (function(delay) {
                setTimeout(function() {
                    if (!wc || wc.isDestroyed()) return;
                    var url = "";
                    try { url = wc.getURL ? wc.getURL() : ""; } catch (e) { url = ""; }
                    if (!isWorkbenchUrl(url)) return;
                    isRtlRuntimeAlive(wc)
                        .then(function(alive) {
                            if (!alive) {
                                injectIntoWebContents(wc, "fallback[" + winId + "@" + delay + "ms]");
                            }
                        })
                        .catch(function() {
                            injectIntoWebContents(wc, "fallback[" + winId + "@" + delay + "ms]");
                        });
                }, delay);
            })(delays[i]);
        }
    }

    function setupWindow(win, label) {
        if (!win || !win.webContents) { log(label, "no webContents"); return; }
        var wc = win.webContents;
        var winId = win.id;
        wc.on("did-start-loading", function() {
            wc.__rtlInjectedUrl = "";
        });
        wc.on("did-finish-load", function() {
            injectIntoWebContents(wc, "inject[" + winId + "]");
        });
        scheduleInjectFallback(wc, winId);
        if (!wc.isLoading() && !wc.isDestroyed()) {
            injectIntoWebContents(wc, "inject-now[" + winId + "]");
        }
    }

    try {
        electron.app.on("browser-window-created", function(ev, win) {
            log("browser-window-created id=" + win.id);
            setupWindow(win, "setup[" + win.id + "]");
        });
        log("browser-window-created listener registered");
    } catch (e) {
        log("FATAL: app.on failed:", e.message);
        return;
    }

    try {
        var existing = electron.BrowserWindow.getAllWindows();
        log("existing windows:", existing.length);
        for (var i = 0; i < existing.length; i++) {
            setupWindow(existing[i], "existing[" + existing[i].id + "]");
        }
    } catch (e) {
        log("getAllWindows error:", e.message);
    }

    log("Antigravity UI loader setup complete.");
})();
