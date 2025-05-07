// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"b5kAs":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "324c7789791b2772";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            if (err.message) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"lltzB":[function(require,module,exports,__globalThis) {
var _govukFrontendMinJs = require("./govuk-frontend.min.js");
(0, _govukFrontendMinJs.initAll)();

},{"./govuk-frontend.min.js":"4mk1Z"}],"4mk1Z":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Accordion", ()=>Accordion) //# sourceMappingURL=govuk-frontend.min.js.map
;
parcelHelpers.export(exports, "Button", ()=>Button);
parcelHelpers.export(exports, "CharacterCount", ()=>CharacterCount);
parcelHelpers.export(exports, "Checkboxes", ()=>Checkboxes);
parcelHelpers.export(exports, "Component", ()=>Component);
parcelHelpers.export(exports, "ConfigurableComponent", ()=>ConfigurableComponent);
parcelHelpers.export(exports, "ErrorSummary", ()=>ErrorSummary);
parcelHelpers.export(exports, "ExitThisPage", ()=>ExitThisPage);
parcelHelpers.export(exports, "FileUpload", ()=>FileUpload);
parcelHelpers.export(exports, "Header", ()=>Header);
parcelHelpers.export(exports, "NotificationBanner", ()=>NotificationBanner);
parcelHelpers.export(exports, "PasswordInput", ()=>PasswordInput);
parcelHelpers.export(exports, "Radios", ()=>Radios);
parcelHelpers.export(exports, "ServiceNavigation", ()=>ServiceNavigation);
parcelHelpers.export(exports, "SkipLink", ()=>SkipLink);
parcelHelpers.export(exports, "Tabs", ()=>Tabs);
parcelHelpers.export(exports, "createAll", ()=>createAll);
parcelHelpers.export(exports, "initAll", ()=>initAll);
parcelHelpers.export(exports, "isSupported", ()=>isSupported);
parcelHelpers.export(exports, "version", ()=>version);
const version = "5.9.0";
function getFragmentFromUrl(t) {
    if (t.includes("#")) return t.split("#").pop();
}
function getBreakpoint(t) {
    const e = `--govuk-frontend-breakpoint-${t}`;
    return {
        property: e,
        value: window.getComputedStyle(document.documentElement).getPropertyValue(e) || void 0
    };
}
function setFocus(t, e = {}) {
    var i;
    const n = t.getAttribute("tabindex");
    function onBlur() {
        var i;
        null == (i = e.onBlur) || i.call(t), n || t.removeAttribute("tabindex");
    }
    n || t.setAttribute("tabindex", "-1"), t.addEventListener("focus", function() {
        t.addEventListener("blur", onBlur, {
            once: !0
        });
    }, {
        once: !0
    }), null == (i = e.onBeforeFocus) || i.call(t), t.focus();
}
function isSupported(t = document.body) {
    return !!t && t.classList.contains("govuk-frontend-supported");
}
function isObject(t) {
    return !!t && "object" == typeof t && !function(t) {
        return Array.isArray(t);
    }(t);
}
function formatErrorMessage(Component, t) {
    return `${Component.moduleName}: ${t}`;
}
class GOVUKFrontendError extends Error {
    constructor(...t){
        super(...t), this.name = "GOVUKFrontendError";
    }
}
class SupportError extends GOVUKFrontendError {
    constructor(t = document.body){
        const e = "noModule" in HTMLScriptElement.prototype ? 'GOV.UK Frontend initialised without `<body class="govuk-frontend-supported">` from template `<script>` snippet' : "GOV.UK Frontend is not supported in this browser";
        super(t ? e : 'GOV.UK Frontend initialised without `<script type="module">`'), this.name = "SupportError";
    }
}
class ConfigError extends GOVUKFrontendError {
    constructor(...t){
        super(...t), this.name = "ConfigError";
    }
}
class ElementError extends GOVUKFrontendError {
    constructor(t){
        let e = "string" == typeof t ? t : "";
        if ("object" == typeof t) {
            const { component: i, identifier: n, element: s, expectedType: o } = t;
            e = n, e += s ? ` is not of type ${null != o ? o : "HTMLElement"}` : " not found", e = formatErrorMessage(i, e);
        }
        super(e), this.name = "ElementError";
    }
}
class InitError extends GOVUKFrontendError {
    constructor(t){
        super("string" == typeof t ? t : formatErrorMessage(t, "Root element (`$root`) already initialised")), this.name = "InitError";
    }
}
class Component {
    get $root() {
        return this._$root;
    }
    constructor(t){
        this._$root = void 0;
        const e = this.constructor;
        if ("string" != typeof e.moduleName) throw new InitError("`moduleName` not defined in component");
        if (!(t instanceof e.elementType)) throw new ElementError({
            element: t,
            component: e,
            identifier: "Root element (`$root`)",
            expectedType: e.elementType.name
        });
        this._$root = t, e.checkSupport(), this.checkInitialised();
        const i = e.moduleName;
        this.$root.setAttribute(`data-${i}-init`, "");
    }
    checkInitialised() {
        const t = this.constructor, e = t.moduleName;
        if (e && function(t, e) {
            return t instanceof HTMLElement && t.hasAttribute(`data-${e}-init`);
        }(this.$root, e)) throw new InitError(t);
    }
    static checkSupport() {
        if (!isSupported()) throw new SupportError;
    }
}
Component.elementType = HTMLElement;
const t = Symbol.for("configOverride");
class ConfigurableComponent extends Component {
    [t](t) {
        return {};
    }
    get config() {
        return this._config;
    }
    constructor(e, i){
        super(e), this._config = void 0;
        const n = this.constructor;
        if (!isObject(n.defaults)) throw new ConfigError(formatErrorMessage(n, "Config passed as parameter into constructor but no defaults defined"));
        const s = function(Component, t) {
            if (!isObject(Component.schema)) throw new ConfigError(formatErrorMessage(Component, "Config passed as parameter into constructor but no schema defined"));
            const e = {}, i = Object.entries(Component.schema.properties);
            for (const n of i){
                const [i, s] = n, o = i.toString();
                o in t && (e[o] = normaliseString(t[o], s)), "object" === (null == s ? void 0 : s.type) && (e[o] = extractConfigByNamespace(Component.schema, t, i));
            }
            return e;
        }(n, this._$root.dataset);
        this._config = mergeConfigs(n.defaults, null != i ? i : {}, this[t](s), s);
    }
}
function normaliseString(t, e) {
    const i = t ? t.trim() : "";
    let n, s = null == e ? void 0 : e.type;
    switch(s || ([
        "true",
        "false"
    ].includes(i) && (s = "boolean"), i.length > 0 && isFinite(Number(i)) && (s = "number")), s){
        case "boolean":
            n = "true" === i;
            break;
        case "number":
            n = Number(i);
            break;
        default:
            n = t;
    }
    return n;
}
function mergeConfigs(...t) {
    const e = {};
    for (const i of t)for (const t of Object.keys(i)){
        const n = e[t], s = i[t];
        isObject(n) && isObject(s) ? e[t] = mergeConfigs(n, s) : e[t] = s;
    }
    return e;
}
function extractConfigByNamespace(t, e, i) {
    const n = t.properties[i];
    if ("object" !== (null == n ? void 0 : n.type)) return;
    const s = {
        [i]: {}
    };
    for (const [o, r] of Object.entries(e)){
        let t = s;
        const e = o.split(".");
        for (const [n, s] of e.entries())isObject(t) && (n < e.length - 1 ? (isObject(t[s]) || (t[s] = {}), t = t[s]) : o !== i && (t[s] = normaliseString(r)));
    }
    return s[i];
}
class I18n {
    constructor(t = {}, e = {}){
        var i;
        this.translations = void 0, this.locale = void 0, this.translations = t, this.locale = null != (i = e.locale) ? i : document.documentElement.lang || "en";
    }
    t(t, e) {
        if (!t) throw new Error("i18n: lookup key missing");
        let i = this.translations[t];
        if ("number" == typeof (null == e ? void 0 : e.count) && "object" == typeof i) {
            const n = i[this.getPluralSuffix(t, e.count)];
            n && (i = n);
        }
        if ("string" == typeof i) {
            if (i.match(/%{(.\S+)}/)) {
                if (!e) throw new Error("i18n: cannot replace placeholders in string if no option data provided");
                return this.replacePlaceholders(i, e);
            }
            return i;
        }
        return t;
    }
    replacePlaceholders(t, e) {
        const i = Intl.NumberFormat.supportedLocalesOf(this.locale).length ? new Intl.NumberFormat(this.locale) : void 0;
        return t.replace(/%{(.\S+)}/g, function(t, n) {
            if (Object.prototype.hasOwnProperty.call(e, n)) {
                const t = e[n];
                return !1 === t || "number" != typeof t && "string" != typeof t ? "" : "number" == typeof t ? i ? i.format(t) : `${t}` : t;
            }
            throw new Error(`i18n: no data found to replace ${t} placeholder in string`);
        });
    }
    hasIntlPluralRulesSupport() {
        return Boolean("PluralRules" in window.Intl && Intl.PluralRules.supportedLocalesOf(this.locale).length);
    }
    getPluralSuffix(t, e) {
        if (e = Number(e), !isFinite(e)) return "other";
        const i = this.translations[t], n = this.hasIntlPluralRulesSupport() ? new Intl.PluralRules(this.locale).select(e) : this.selectPluralFormUsingFallbackRules(e);
        if ("object" == typeof i) {
            if (n in i) return n;
            if ("other" in i) return console.warn(`i18n: Missing plural form ".${n}" for "${this.locale}" locale. Falling back to ".other".`), "other";
        }
        throw new Error(`i18n: Plural form ".other" is required for "${this.locale}" locale`);
    }
    selectPluralFormUsingFallbackRules(t) {
        t = Math.abs(Math.floor(t));
        const e = this.getPluralRulesForLocale();
        return e ? I18n.pluralRules[e](t) : "other";
    }
    getPluralRulesForLocale() {
        const t = this.locale.split("-")[0];
        for(const e in I18n.pluralRulesMap){
            const i = I18n.pluralRulesMap[e];
            if (i.includes(this.locale) || i.includes(t)) return e;
        }
    }
}
I18n.pluralRulesMap = {
    arabic: [
        "ar"
    ],
    chinese: [
        "my",
        "zh",
        "id",
        "ja",
        "jv",
        "ko",
        "ms",
        "th",
        "vi"
    ],
    french: [
        "hy",
        "bn",
        "fr",
        "gu",
        "hi",
        "fa",
        "pa",
        "zu"
    ],
    german: [
        "af",
        "sq",
        "az",
        "eu",
        "bg",
        "ca",
        "da",
        "nl",
        "en",
        "et",
        "fi",
        "ka",
        "de",
        "el",
        "hu",
        "lb",
        "no",
        "so",
        "sw",
        "sv",
        "ta",
        "te",
        "tr",
        "ur"
    ],
    irish: [
        "ga"
    ],
    russian: [
        "ru",
        "uk"
    ],
    scottish: [
        "gd"
    ],
    spanish: [
        "pt-PT",
        "it",
        "es"
    ],
    welsh: [
        "cy"
    ]
}, I18n.pluralRules = {
    arabic: (t)=>0 === t ? "zero" : 1 === t ? "one" : 2 === t ? "two" : t % 100 >= 3 && t % 100 <= 10 ? "few" : t % 100 >= 11 && t % 100 <= 99 ? "many" : "other",
    chinese: ()=>"other",
    french: (t)=>0 === t || 1 === t ? "one" : "other",
    german: (t)=>1 === t ? "one" : "other",
    irish: (t)=>1 === t ? "one" : 2 === t ? "two" : t >= 3 && t <= 6 ? "few" : t >= 7 && t <= 10 ? "many" : "other",
    russian (t) {
        const e = t % 100, i = e % 10;
        return 1 === i && 11 !== e ? "one" : i >= 2 && i <= 4 && !(e >= 12 && e <= 14) ? "few" : 0 === i || i >= 5 && i <= 9 || e >= 11 && e <= 14 ? "many" : "other";
    },
    scottish: (t)=>1 === t || 11 === t ? "one" : 2 === t || 12 === t ? "two" : t >= 3 && t <= 10 || t >= 13 && t <= 19 ? "few" : "other",
    spanish: (t)=>1 === t ? "one" : t % 1e6 == 0 && 0 !== t ? "many" : "other",
    welsh: (t)=>0 === t ? "zero" : 1 === t ? "one" : 2 === t ? "two" : 3 === t ? "few" : 6 === t ? "many" : "other"
};
class Accordion extends ConfigurableComponent {
    constructor(t, e = {}){
        super(t, e), this.i18n = void 0, this.controlsClass = "govuk-accordion__controls", this.showAllClass = "govuk-accordion__show-all", this.showAllTextClass = "govuk-accordion__show-all-text", this.sectionClass = "govuk-accordion__section", this.sectionExpandedClass = "govuk-accordion__section--expanded", this.sectionButtonClass = "govuk-accordion__section-button", this.sectionHeaderClass = "govuk-accordion__section-header", this.sectionHeadingClass = "govuk-accordion__section-heading", this.sectionHeadingDividerClass = "govuk-accordion__section-heading-divider", this.sectionHeadingTextClass = "govuk-accordion__section-heading-text", this.sectionHeadingTextFocusClass = "govuk-accordion__section-heading-text-focus", this.sectionShowHideToggleClass = "govuk-accordion__section-toggle", this.sectionShowHideToggleFocusClass = "govuk-accordion__section-toggle-focus", this.sectionShowHideTextClass = "govuk-accordion__section-toggle-text", this.upChevronIconClass = "govuk-accordion-nav__chevron", this.downChevronIconClass = "govuk-accordion-nav__chevron--down", this.sectionSummaryClass = "govuk-accordion__section-summary", this.sectionSummaryFocusClass = "govuk-accordion__section-summary-focus", this.sectionContentClass = "govuk-accordion__section-content", this.$sections = void 0, this.$showAllButton = null, this.$showAllIcon = null, this.$showAllText = null, this.i18n = new I18n(this.config.i18n);
        const i = this.$root.querySelectorAll(`.${this.sectionClass}`);
        if (!i.length) throw new ElementError({
            component: Accordion,
            identifier: `Sections (\`<div class="${this.sectionClass}">\`)`
        });
        this.$sections = i, this.initControls(), this.initSectionHeaders(), this.updateShowAllButton(this.areAllSectionsOpen());
    }
    initControls() {
        this.$showAllButton = document.createElement("button"), this.$showAllButton.setAttribute("type", "button"), this.$showAllButton.setAttribute("class", this.showAllClass), this.$showAllButton.setAttribute("aria-expanded", "false"), this.$showAllIcon = document.createElement("span"), this.$showAllIcon.classList.add(this.upChevronIconClass), this.$showAllButton.appendChild(this.$showAllIcon);
        const t = document.createElement("div");
        t.setAttribute("class", this.controlsClass), t.appendChild(this.$showAllButton), this.$root.insertBefore(t, this.$root.firstChild), this.$showAllText = document.createElement("span"), this.$showAllText.classList.add(this.showAllTextClass), this.$showAllButton.appendChild(this.$showAllText), this.$showAllButton.addEventListener("click", ()=>this.onShowOrHideAllToggle()), "onbeforematch" in document && document.addEventListener("beforematch", (t)=>this.onBeforeMatch(t));
    }
    initSectionHeaders() {
        this.$sections.forEach((t, e)=>{
            const i = t.querySelector(`.${this.sectionHeaderClass}`);
            if (!i) throw new ElementError({
                component: Accordion,
                identifier: `Section headers (\`<div class="${this.sectionHeaderClass}">\`)`
            });
            this.constructHeaderMarkup(i, e), this.setExpanded(this.isExpanded(t), t), i.addEventListener("click", ()=>this.onSectionToggle(t)), this.setInitialState(t);
        });
    }
    constructHeaderMarkup(t, e) {
        const i = t.querySelector(`.${this.sectionButtonClass}`), n = t.querySelector(`.${this.sectionHeadingClass}`), s = t.querySelector(`.${this.sectionSummaryClass}`);
        if (!n) throw new ElementError({
            component: Accordion,
            identifier: `Section heading (\`.${this.sectionHeadingClass}\`)`
        });
        if (!i) throw new ElementError({
            component: Accordion,
            identifier: `Section button placeholder (\`<span class="${this.sectionButtonClass}">\`)`
        });
        const o = document.createElement("button");
        o.setAttribute("type", "button"), o.setAttribute("aria-controls", `${this.$root.id}-content-${e + 1}`);
        for (const d of Array.from(i.attributes))"id" !== d.name && o.setAttribute(d.name, d.value);
        const r = document.createElement("span");
        r.classList.add(this.sectionHeadingTextClass), r.id = i.id;
        const a = document.createElement("span");
        a.classList.add(this.sectionHeadingTextFocusClass), r.appendChild(a), Array.from(i.childNodes).forEach((t)=>a.appendChild(t));
        const l = document.createElement("span");
        l.classList.add(this.sectionShowHideToggleClass), l.setAttribute("data-nosnippet", "");
        const c = document.createElement("span");
        c.classList.add(this.sectionShowHideToggleFocusClass), l.appendChild(c);
        const u = document.createElement("span"), h = document.createElement("span");
        if (h.classList.add(this.upChevronIconClass), c.appendChild(h), u.classList.add(this.sectionShowHideTextClass), c.appendChild(u), o.appendChild(r), o.appendChild(this.getButtonPunctuationEl()), s) {
            const t = document.createElement("span"), e = document.createElement("span");
            e.classList.add(this.sectionSummaryFocusClass), t.appendChild(e);
            for (const i of Array.from(s.attributes))t.setAttribute(i.name, i.value);
            Array.from(s.childNodes).forEach((t)=>e.appendChild(t)), s.remove(), o.appendChild(t), o.appendChild(this.getButtonPunctuationEl());
        }
        o.appendChild(l), n.removeChild(i), n.appendChild(o);
    }
    onBeforeMatch(t) {
        const e = t.target;
        if (!(e instanceof Element)) return;
        const i = e.closest(`.${this.sectionClass}`);
        i && this.setExpanded(!0, i);
    }
    onSectionToggle(t) {
        const e = !this.isExpanded(t);
        this.setExpanded(e, t), this.storeState(t, e);
    }
    onShowOrHideAllToggle() {
        const t = !this.areAllSectionsOpen();
        this.$sections.forEach((e)=>{
            this.setExpanded(t, e), this.storeState(e, t);
        }), this.updateShowAllButton(t);
    }
    setExpanded(t, e) {
        const i = e.querySelector(`.${this.upChevronIconClass}`), n = e.querySelector(`.${this.sectionShowHideTextClass}`), s = e.querySelector(`.${this.sectionButtonClass}`), o = e.querySelector(`.${this.sectionContentClass}`);
        if (!o) throw new ElementError({
            component: Accordion,
            identifier: `Section content (\`<div class="${this.sectionContentClass}">\`)`
        });
        if (!i || !n || !s) return;
        const r = t ? this.i18n.t("hideSection") : this.i18n.t("showSection");
        n.textContent = r, s.setAttribute("aria-expanded", `${t}`);
        const a = [], l = e.querySelector(`.${this.sectionHeadingTextClass}`);
        l && a.push(`${l.textContent}`.trim());
        const c = e.querySelector(`.${this.sectionSummaryClass}`);
        c && a.push(`${c.textContent}`.trim());
        const u = t ? this.i18n.t("hideSectionAriaLabel") : this.i18n.t("showSectionAriaLabel");
        a.push(u), s.setAttribute("aria-label", a.join(" , ")), t ? (o.removeAttribute("hidden"), e.classList.add(this.sectionExpandedClass), i.classList.remove(this.downChevronIconClass)) : (o.setAttribute("hidden", "until-found"), e.classList.remove(this.sectionExpandedClass), i.classList.add(this.downChevronIconClass)), this.updateShowAllButton(this.areAllSectionsOpen());
    }
    isExpanded(t) {
        return t.classList.contains(this.sectionExpandedClass);
    }
    areAllSectionsOpen() {
        return Array.from(this.$sections).every((t)=>this.isExpanded(t));
    }
    updateShowAllButton(t) {
        this.$showAllButton && this.$showAllText && this.$showAllIcon && (this.$showAllButton.setAttribute("aria-expanded", t.toString()), this.$showAllText.textContent = t ? this.i18n.t("hideAllSections") : this.i18n.t("showAllSections"), this.$showAllIcon.classList.toggle(this.downChevronIconClass, !t));
    }
    getIdentifier(t) {
        const e = t.querySelector(`.${this.sectionButtonClass}`);
        return null == e ? void 0 : e.getAttribute("aria-controls");
    }
    storeState(t, e) {
        if (!this.config.rememberExpanded) return;
        const i = this.getIdentifier(t);
        if (i) try {
            window.sessionStorage.setItem(i, e.toString());
        } catch (n) {}
    }
    setInitialState(t) {
        if (!this.config.rememberExpanded) return;
        const e = this.getIdentifier(t);
        if (e) try {
            const i = window.sessionStorage.getItem(e);
            null !== i && this.setExpanded("true" === i, t);
        } catch (i) {}
    }
    getButtonPunctuationEl() {
        const t = document.createElement("span");
        return t.classList.add("govuk-visually-hidden", this.sectionHeadingDividerClass), t.textContent = ", ", t;
    }
}
Accordion.moduleName = "govuk-accordion", Accordion.defaults = Object.freeze({
    i18n: {
        hideAllSections: "Hide all sections",
        hideSection: "Hide",
        hideSectionAriaLabel: "Hide this section",
        showAllSections: "Show all sections",
        showSection: "Show",
        showSectionAriaLabel: "Show this section"
    },
    rememberExpanded: !0
}), Accordion.schema = Object.freeze({
    properties: {
        i18n: {
            type: "object"
        },
        rememberExpanded: {
            type: "boolean"
        }
    }
});
class Button extends ConfigurableComponent {
    constructor(t, e = {}){
        super(t, e), this.debounceFormSubmitTimer = null, this.$root.addEventListener("keydown", (t)=>this.handleKeyDown(t)), this.$root.addEventListener("click", (t)=>this.debounce(t));
    }
    handleKeyDown(t) {
        const e = t.target;
        " " === t.key && e instanceof HTMLElement && "button" === e.getAttribute("role") && (t.preventDefault(), e.click());
    }
    debounce(t) {
        if (this.config.preventDoubleClick) return this.debounceFormSubmitTimer ? (t.preventDefault(), !1) : void (this.debounceFormSubmitTimer = window.setTimeout(()=>{
            this.debounceFormSubmitTimer = null;
        }, 1e3));
    }
}
function closestAttributeValue(t, e) {
    const i = t.closest(`[${e}]`);
    return i ? i.getAttribute(e) : null;
}
Button.moduleName = "govuk-button", Button.defaults = Object.freeze({
    preventDoubleClick: !1
}), Button.schema = Object.freeze({
    properties: {
        preventDoubleClick: {
            type: "boolean"
        }
    }
});
class CharacterCount extends ConfigurableComponent {
    [t](t) {
        let e = {};
        return ("maxwords" in t || "maxlength" in t) && (e = {
            maxlength: void 0,
            maxwords: void 0
        }), e;
    }
    constructor(t, e = {}){
        var i, n;
        super(t, e), this.$textarea = void 0, this.$visibleCountMessage = void 0, this.$screenReaderCountMessage = void 0, this.lastInputTimestamp = null, this.lastInputValue = "", this.valueChecker = null, this.i18n = void 0, this.maxLength = void 0;
        const s = this.$root.querySelector(".govuk-js-character-count");
        if (!(s instanceof HTMLTextAreaElement || s instanceof HTMLInputElement)) throw new ElementError({
            component: CharacterCount,
            element: s,
            expectedType: "HTMLTextareaElement or HTMLInputElement",
            identifier: "Form field (`.govuk-js-character-count`)"
        });
        const o = function(t, e) {
            const i = [];
            for (const [n, s] of Object.entries(t)){
                const t = [];
                if (Array.isArray(s)) {
                    for (const { required: i, errorMessage: n } of s)i.every((t)=>!!e[t]) || t.push(n);
                    "anyOf" !== n || s.length - t.length >= 1 || i.push(...t);
                }
            }
            return i;
        }(CharacterCount.schema, this.config);
        if (o[0]) throw new ConfigError(formatErrorMessage(CharacterCount, o[0]));
        this.i18n = new I18n(this.config.i18n, {
            locale: closestAttributeValue(this.$root, "lang")
        }), this.maxLength = null != (i = null != (n = this.config.maxwords) ? n : this.config.maxlength) ? i : 1 / 0, this.$textarea = s;
        const r = `${this.$textarea.id}-info`, a = document.getElementById(r);
        if (!a) throw new ElementError({
            component: CharacterCount,
            element: a,
            identifier: `Count message (\`id="${r}"\`)`
        });
        `${a.textContent}`.match(/^\s*$/) && (a.textContent = this.i18n.t("textareaDescription", {
            count: this.maxLength
        })), this.$textarea.insertAdjacentElement("afterend", a);
        const l = document.createElement("div");
        l.className = "govuk-character-count__sr-status govuk-visually-hidden", l.setAttribute("aria-live", "polite"), this.$screenReaderCountMessage = l, a.insertAdjacentElement("afterend", l);
        const c = document.createElement("div");
        c.className = a.className, c.classList.add("govuk-character-count__status"), c.setAttribute("aria-hidden", "true"), this.$visibleCountMessage = c, a.insertAdjacentElement("afterend", c), a.classList.add("govuk-visually-hidden"), this.$textarea.removeAttribute("maxlength"), this.bindChangeEvents(), window.addEventListener("pageshow", ()=>this.updateCountMessage()), this.updateCountMessage();
    }
    bindChangeEvents() {
        this.$textarea.addEventListener("keyup", ()=>this.handleKeyUp()), this.$textarea.addEventListener("focus", ()=>this.handleFocus()), this.$textarea.addEventListener("blur", ()=>this.handleBlur());
    }
    handleKeyUp() {
        this.updateVisibleCountMessage(), this.lastInputTimestamp = Date.now();
    }
    handleFocus() {
        this.valueChecker = window.setInterval(()=>{
            (!this.lastInputTimestamp || Date.now() - 500 >= this.lastInputTimestamp) && this.updateIfValueChanged();
        }, 1e3);
    }
    handleBlur() {
        this.valueChecker && window.clearInterval(this.valueChecker);
    }
    updateIfValueChanged() {
        this.$textarea.value !== this.lastInputValue && (this.lastInputValue = this.$textarea.value, this.updateCountMessage());
    }
    updateCountMessage() {
        this.updateVisibleCountMessage(), this.updateScreenReaderCountMessage();
    }
    updateVisibleCountMessage() {
        const t = this.maxLength - this.count(this.$textarea.value) < 0;
        this.$visibleCountMessage.classList.toggle("govuk-character-count__message--disabled", !this.isOverThreshold()), this.$textarea.classList.toggle("govuk-textarea--error", t), this.$visibleCountMessage.classList.toggle("govuk-error-message", t), this.$visibleCountMessage.classList.toggle("govuk-hint", !t), this.$visibleCountMessage.textContent = this.getCountMessage();
    }
    updateScreenReaderCountMessage() {
        this.isOverThreshold() ? this.$screenReaderCountMessage.removeAttribute("aria-hidden") : this.$screenReaderCountMessage.setAttribute("aria-hidden", "true"), this.$screenReaderCountMessage.textContent = this.getCountMessage();
    }
    count(t) {
        if (this.config.maxwords) {
            var e;
            return (null != (e = t.match(/\S+/g)) ? e : []).length;
        }
        return t.length;
    }
    getCountMessage() {
        const t = this.maxLength - this.count(this.$textarea.value), e = this.config.maxwords ? "words" : "characters";
        return this.formatCountMessage(t, e);
    }
    formatCountMessage(t, e) {
        if (0 === t) return this.i18n.t(`${e}AtLimit`);
        const i = t < 0 ? "OverLimit" : "UnderLimit";
        return this.i18n.t(`${e}${i}`, {
            count: Math.abs(t)
        });
    }
    isOverThreshold() {
        if (!this.config.threshold) return !0;
        const t = this.count(this.$textarea.value);
        return this.maxLength * this.config.threshold / 100 <= t;
    }
}
CharacterCount.moduleName = "govuk-character-count", CharacterCount.defaults = Object.freeze({
    threshold: 0,
    i18n: {
        charactersUnderLimit: {
            one: "You have %{count} character remaining",
            other: "You have %{count} characters remaining"
        },
        charactersAtLimit: "You have 0 characters remaining",
        charactersOverLimit: {
            one: "You have %{count} character too many",
            other: "You have %{count} characters too many"
        },
        wordsUnderLimit: {
            one: "You have %{count} word remaining",
            other: "You have %{count} words remaining"
        },
        wordsAtLimit: "You have 0 words remaining",
        wordsOverLimit: {
            one: "You have %{count} word too many",
            other: "You have %{count} words too many"
        },
        textareaDescription: {
            other: ""
        }
    }
}), CharacterCount.schema = Object.freeze({
    properties: {
        i18n: {
            type: "object"
        },
        maxwords: {
            type: "number"
        },
        maxlength: {
            type: "number"
        },
        threshold: {
            type: "number"
        }
    },
    anyOf: [
        {
            required: [
                "maxwords"
            ],
            errorMessage: 'Either "maxlength" or "maxwords" must be provided'
        },
        {
            required: [
                "maxlength"
            ],
            errorMessage: 'Either "maxlength" or "maxwords" must be provided'
        }
    ]
});
class Checkboxes extends Component {
    constructor(t){
        super(t), this.$inputs = void 0;
        const e = this.$root.querySelectorAll('input[type="checkbox"]');
        if (!e.length) throw new ElementError({
            component: Checkboxes,
            identifier: 'Form inputs (`<input type="checkbox">`)'
        });
        this.$inputs = e, this.$inputs.forEach((t)=>{
            const e = t.getAttribute("data-aria-controls");
            if (e) {
                if (!document.getElementById(e)) throw new ElementError({
                    component: Checkboxes,
                    identifier: `Conditional reveal (\`id="${e}"\`)`
                });
                t.setAttribute("aria-controls", e), t.removeAttribute("data-aria-controls");
            }
        }), window.addEventListener("pageshow", ()=>this.syncAllConditionalReveals()), this.syncAllConditionalReveals(), this.$root.addEventListener("click", (t)=>this.handleClick(t));
    }
    syncAllConditionalReveals() {
        this.$inputs.forEach((t)=>this.syncConditionalRevealWithInputState(t));
    }
    syncConditionalRevealWithInputState(t) {
        const e = t.getAttribute("aria-controls");
        if (!e) return;
        const i = document.getElementById(e);
        if (null != i && i.classList.contains("govuk-checkboxes__conditional")) {
            const e = t.checked;
            t.setAttribute("aria-expanded", e.toString()), i.classList.toggle("govuk-checkboxes__conditional--hidden", !e);
        }
    }
    unCheckAllInputsExcept(t) {
        document.querySelectorAll(`input[type="checkbox"][name="${t.name}"]`).forEach((e)=>{
            t.form === e.form && e !== t && (e.checked = !1, this.syncConditionalRevealWithInputState(e));
        });
    }
    unCheckExclusiveInputs(t) {
        document.querySelectorAll(`input[data-behaviour="exclusive"][type="checkbox"][name="${t.name}"]`).forEach((e)=>{
            t.form === e.form && (e.checked = !1, this.syncConditionalRevealWithInputState(e));
        });
    }
    handleClick(t) {
        const e = t.target;
        if (!(e instanceof HTMLInputElement) || "checkbox" !== e.type) return;
        if (e.getAttribute("aria-controls") && this.syncConditionalRevealWithInputState(e), !e.checked) return;
        "exclusive" === e.getAttribute("data-behaviour") ? this.unCheckAllInputsExcept(e) : this.unCheckExclusiveInputs(e);
    }
}
Checkboxes.moduleName = "govuk-checkboxes";
class ErrorSummary extends ConfigurableComponent {
    constructor(t, e = {}){
        super(t, e), this.config.disableAutoFocus || setFocus(this.$root), this.$root.addEventListener("click", (t)=>this.handleClick(t));
    }
    handleClick(t) {
        const e = t.target;
        e && this.focusTarget(e) && t.preventDefault();
    }
    focusTarget(t) {
        if (!(t instanceof HTMLAnchorElement)) return !1;
        const e = getFragmentFromUrl(t.href);
        if (!e) return !1;
        const i = document.getElementById(e);
        if (!i) return !1;
        const n = this.getAssociatedLegendOrLabel(i);
        return !!n && (n.scrollIntoView(), i.focus({
            preventScroll: !0
        }), !0);
    }
    getAssociatedLegendOrLabel(t) {
        var e;
        const i = t.closest("fieldset");
        if (i) {
            const e = i.getElementsByTagName("legend");
            if (e.length) {
                const i = e[0];
                if (t instanceof HTMLInputElement && ("checkbox" === t.type || "radio" === t.type)) return i;
                const n = i.getBoundingClientRect().top, s = t.getBoundingClientRect();
                if (s.height && window.innerHeight) {
                    if (s.top + s.height - n < window.innerHeight / 2) return i;
                }
            }
        }
        return null != (e = document.querySelector(`label[for='${t.getAttribute("id")}']`)) ? e : t.closest("label");
    }
}
ErrorSummary.moduleName = "govuk-error-summary", ErrorSummary.defaults = Object.freeze({
    disableAutoFocus: !1
}), ErrorSummary.schema = Object.freeze({
    properties: {
        disableAutoFocus: {
            type: "boolean"
        }
    }
});
class ExitThisPage extends ConfigurableComponent {
    constructor(t, e = {}){
        super(t, e), this.i18n = void 0, this.$button = void 0, this.$skiplinkButton = null, this.$updateSpan = null, this.$indicatorContainer = null, this.$overlay = null, this.keypressCounter = 0, this.lastKeyWasModified = !1, this.timeoutTime = 5e3, this.keypressTimeoutId = null, this.timeoutMessageId = null;
        const i = this.$root.querySelector(".govuk-exit-this-page__button");
        if (!(i instanceof HTMLAnchorElement)) throw new ElementError({
            component: ExitThisPage,
            element: i,
            expectedType: "HTMLAnchorElement",
            identifier: "Button (`.govuk-exit-this-page__button`)"
        });
        this.i18n = new I18n(this.config.i18n), this.$button = i;
        const n = document.querySelector(".govuk-js-exit-this-page-skiplink");
        n instanceof HTMLAnchorElement && (this.$skiplinkButton = n), this.buildIndicator(), this.initUpdateSpan(), this.initButtonClickHandler(), "govukFrontendExitThisPageKeypress" in document.body.dataset || (document.addEventListener("keyup", this.handleKeypress.bind(this), !0), document.body.dataset.govukFrontendExitThisPageKeypress = "true"), window.addEventListener("pageshow", this.resetPage.bind(this));
    }
    initUpdateSpan() {
        this.$updateSpan = document.createElement("span"), this.$updateSpan.setAttribute("role", "status"), this.$updateSpan.className = "govuk-visually-hidden", this.$root.appendChild(this.$updateSpan);
    }
    initButtonClickHandler() {
        this.$button.addEventListener("click", this.handleClick.bind(this)), this.$skiplinkButton && this.$skiplinkButton.addEventListener("click", this.handleClick.bind(this));
    }
    buildIndicator() {
        this.$indicatorContainer = document.createElement("div"), this.$indicatorContainer.className = "govuk-exit-this-page__indicator", this.$indicatorContainer.setAttribute("aria-hidden", "true");
        for(let t = 0; t < 3; t++){
            const t = document.createElement("div");
            t.className = "govuk-exit-this-page__indicator-light", this.$indicatorContainer.appendChild(t);
        }
        this.$button.appendChild(this.$indicatorContainer);
    }
    updateIndicator() {
        if (!this.$indicatorContainer) return;
        this.$indicatorContainer.classList.toggle("govuk-exit-this-page__indicator--visible", this.keypressCounter > 0);
        this.$indicatorContainer.querySelectorAll(".govuk-exit-this-page__indicator-light").forEach((t, e)=>{
            t.classList.toggle("govuk-exit-this-page__indicator-light--on", e < this.keypressCounter);
        });
    }
    exitPage() {
        this.$updateSpan && (this.$updateSpan.textContent = "", document.body.classList.add("govuk-exit-this-page-hide-content"), this.$overlay = document.createElement("div"), this.$overlay.className = "govuk-exit-this-page-overlay", this.$overlay.setAttribute("role", "alert"), document.body.appendChild(this.$overlay), this.$overlay.textContent = this.i18n.t("activated"), window.location.href = this.$button.href);
    }
    handleClick(t) {
        t.preventDefault(), this.exitPage();
    }
    handleKeypress(t) {
        this.$updateSpan && ("Shift" !== t.key || this.lastKeyWasModified ? this.keypressTimeoutId && this.resetKeypressTimer() : (this.keypressCounter += 1, this.updateIndicator(), this.timeoutMessageId && (window.clearTimeout(this.timeoutMessageId), this.timeoutMessageId = null), this.keypressCounter >= 3 ? (this.keypressCounter = 0, this.keypressTimeoutId && (window.clearTimeout(this.keypressTimeoutId), this.keypressTimeoutId = null), this.exitPage()) : 1 === this.keypressCounter ? this.$updateSpan.textContent = this.i18n.t("pressTwoMoreTimes") : this.$updateSpan.textContent = this.i18n.t("pressOneMoreTime"), this.setKeypressTimer()), this.lastKeyWasModified = t.shiftKey);
    }
    setKeypressTimer() {
        this.keypressTimeoutId && window.clearTimeout(this.keypressTimeoutId), this.keypressTimeoutId = window.setTimeout(this.resetKeypressTimer.bind(this), this.timeoutTime);
    }
    resetKeypressTimer() {
        if (!this.$updateSpan) return;
        this.keypressTimeoutId && (window.clearTimeout(this.keypressTimeoutId), this.keypressTimeoutId = null);
        const t = this.$updateSpan;
        this.keypressCounter = 0, t.textContent = this.i18n.t("timedOut"), this.timeoutMessageId = window.setTimeout(()=>{
            t.textContent = "";
        }, this.timeoutTime), this.updateIndicator();
    }
    resetPage() {
        document.body.classList.remove("govuk-exit-this-page-hide-content"), this.$overlay && (this.$overlay.remove(), this.$overlay = null), this.$updateSpan && (this.$updateSpan.setAttribute("role", "status"), this.$updateSpan.textContent = ""), this.updateIndicator(), this.keypressTimeoutId && window.clearTimeout(this.keypressTimeoutId), this.timeoutMessageId && window.clearTimeout(this.timeoutMessageId);
    }
}
ExitThisPage.moduleName = "govuk-exit-this-page", ExitThisPage.defaults = Object.freeze({
    i18n: {
        activated: "Loading.",
        timedOut: "Exit this page expired.",
        pressTwoMoreTimes: "Shift, press 2 more times to exit.",
        pressOneMoreTime: "Shift, press 1 more time to exit."
    }
}), ExitThisPage.schema = Object.freeze({
    properties: {
        i18n: {
            type: "object"
        }
    }
});
class FileUpload extends ConfigurableComponent {
    constructor(t, e = {}){
        super(t, e), this.$input = void 0, this.$button = void 0, this.$status = void 0, this.i18n = void 0, this.id = void 0;
        const i = this.$root.querySelector("input");
        if (null === i) throw new ElementError({
            component: FileUpload,
            identifier: 'File inputs (`<input type="file">`)'
        });
        if ("file" !== i.type) throw new ElementError(formatErrorMessage(FileUpload, 'File input (`<input type="file">`) attribute (`type`) is not `file`'));
        if (this.$input = i, this.$input.setAttribute("hidden", "true"), !this.$input.id) throw new ElementError({
            component: FileUpload,
            identifier: 'File input (`<input type="file">`) attribute (`id`)'
        });
        this.id = this.$input.id, this.i18n = new I18n(this.config.i18n, {
            locale: closestAttributeValue(this.$root, "lang")
        });
        const n = this.findLabel();
        n.id || (n.id = `${this.id}-label`), this.$input.id = `${this.id}-input`;
        const s = document.createElement("button");
        s.classList.add("govuk-file-upload-button"), s.type = "button", s.id = this.id, s.classList.add("govuk-file-upload-button--empty");
        const o = this.$input.getAttribute("aria-describedby");
        o && s.setAttribute("aria-describedby", o);
        const r = document.createElement("span");
        r.className = "govuk-body govuk-file-upload-button__status", r.setAttribute("aria-live", "polite"), r.innerText = this.i18n.t("noFileChosen"), s.appendChild(r);
        const a = document.createElement("span");
        a.className = "govuk-visually-hidden", a.innerText = ", ", a.id = `${this.id}-comma`, s.appendChild(a);
        const l = document.createElement("span");
        l.className = "govuk-file-upload-button__pseudo-button-container";
        const c = document.createElement("span");
        c.className = "govuk-button govuk-button--secondary govuk-file-upload-button__pseudo-button", c.innerText = this.i18n.t("chooseFilesButton"), l.appendChild(c), l.insertAdjacentText("beforeend", " ");
        const u = document.createElement("span");
        u.className = "govuk-body govuk-file-upload-button__instruction", u.innerText = this.i18n.t("dropInstruction"), l.appendChild(u), s.appendChild(l), s.setAttribute("aria-labelledby", `${n.id} ${a.id} ${s.id}`), s.addEventListener("click", this.onClick.bind(this)), s.addEventListener("dragover", (t)=>{
            t.preventDefault();
        }), this.$root.insertAdjacentElement("afterbegin", s), this.$input.setAttribute("tabindex", "-1"), this.$input.setAttribute("aria-hidden", "true"), this.$button = s, this.$status = r, this.$input.addEventListener("change", this.onChange.bind(this)), this.updateDisabledState(), this.observeDisabledState(), this.$announcements = document.createElement("span"), this.$announcements.classList.add("govuk-file-upload-announcements"), this.$announcements.classList.add("govuk-visually-hidden"), this.$announcements.setAttribute("aria-live", "assertive"), this.$root.insertAdjacentElement("afterend", this.$announcements), this.$button.addEventListener("drop", this.onDrop.bind(this)), document.addEventListener("dragenter", this.updateDropzoneVisibility.bind(this)), document.addEventListener("dragenter", ()=>{
            this.enteredAnotherElement = !0;
        }), document.addEventListener("dragleave", ()=>{
            this.enteredAnotherElement || this.$button.disabled || (this.hideDraggingState(), this.$announcements.innerText = this.i18n.t("leftDropZone")), this.enteredAnotherElement = !1;
        });
    }
    updateDropzoneVisibility(t) {
        this.$button.disabled || t.target instanceof Node && (this.$root.contains(t.target) ? t.dataTransfer && isContainingFiles(t.dataTransfer) && (this.$button.classList.contains("govuk-file-upload-button--dragging") || (this.showDraggingState(), this.$announcements.innerText = this.i18n.t("enteredDropZone"))) : this.$button.classList.contains("govuk-file-upload-button--dragging") && (this.hideDraggingState(), this.$announcements.innerText = this.i18n.t("leftDropZone")));
    }
    showDraggingState() {
        this.$button.classList.add("govuk-file-upload-button--dragging");
    }
    hideDraggingState() {
        this.$button.classList.remove("govuk-file-upload-button--dragging");
    }
    onDrop(t) {
        t.preventDefault(), t.dataTransfer && isContainingFiles(t.dataTransfer) && (this.$input.files = t.dataTransfer.files, this.$input.dispatchEvent(new CustomEvent("change")), this.hideDraggingState());
    }
    onChange() {
        const t = this.$input.files.length;
        0 === t ? (this.$status.innerText = this.i18n.t("noFileChosen"), this.$button.classList.add("govuk-file-upload-button--empty")) : (this.$status.innerText = 1 === t ? this.$input.files[0].name : this.i18n.t("multipleFilesChosen", {
            count: t
        }), this.$button.classList.remove("govuk-file-upload-button--empty"));
    }
    findLabel() {
        const t = document.querySelector(`label[for="${this.$input.id}"]`);
        if (!t) throw new ElementError({
            component: FileUpload,
            identifier: `Field label (\`<label for=${this.$input.id}>\`)`
        });
        return t;
    }
    onClick() {
        this.$input.click();
    }
    observeDisabledState() {
        new MutationObserver((t)=>{
            for (const e of t)"attributes" === e.type && "disabled" === e.attributeName && this.updateDisabledState();
        }).observe(this.$input, {
            attributes: !0
        });
    }
    updateDisabledState() {
        this.$button.disabled = this.$input.disabled, this.$root.classList.toggle("govuk-drop-zone--disabled", this.$button.disabled);
    }
}
function isContainingFiles(t) {
    const e = 0 === t.types.length, i = t.types.some((t)=>"Files" === t);
    return e || i;
}
FileUpload.moduleName = "govuk-file-upload", FileUpload.defaults = Object.freeze({
    i18n: {
        chooseFilesButton: "Choose file",
        dropInstruction: "or drop file",
        noFileChosen: "No file chosen",
        multipleFilesChosen: {
            one: "%{count} file chosen",
            other: "%{count} files chosen"
        },
        enteredDropZone: "Entered drop zone",
        leftDropZone: "Left drop zone"
    }
}), FileUpload.schema = Object.freeze({
    properties: {
        i18n: {
            type: "object"
        }
    }
});
class Header extends Component {
    constructor(t){
        super(t), this.$menuButton = void 0, this.$menu = void 0, this.menuIsOpen = !1, this.mql = null;
        const e = this.$root.querySelector(".govuk-js-header-toggle");
        if (!e) return this;
        const i = e.getAttribute("aria-controls");
        if (!i) throw new ElementError({
            component: Header,
            identifier: 'Navigation button (`<button class="govuk-js-header-toggle">`) attribute (`aria-controls`)'
        });
        const n = document.getElementById(i);
        if (!n) throw new ElementError({
            component: Header,
            element: n,
            identifier: `Navigation (\`<ul id="${i}">\`)`
        });
        this.$menu = n, this.$menuButton = e, this.setupResponsiveChecks(), this.$menuButton.addEventListener("click", ()=>this.handleMenuButtonClick());
    }
    setupResponsiveChecks() {
        const t = getBreakpoint("desktop");
        if (!t.value) throw new ElementError({
            component: Header,
            identifier: `CSS custom property (\`${t.property}\`) on pseudo-class \`:root\``
        });
        this.mql = window.matchMedia(`(min-width: ${t.value})`), "addEventListener" in this.mql ? this.mql.addEventListener("change", ()=>this.checkMode()) : this.mql.addListener(()=>this.checkMode()), this.checkMode();
    }
    checkMode() {
        this.mql && this.$menu && this.$menuButton && (this.mql.matches ? (this.$menu.removeAttribute("hidden"), this.$menuButton.setAttribute("hidden", "")) : (this.$menuButton.removeAttribute("hidden"), this.$menuButton.setAttribute("aria-expanded", this.menuIsOpen.toString()), this.menuIsOpen ? this.$menu.removeAttribute("hidden") : this.$menu.setAttribute("hidden", "")));
    }
    handleMenuButtonClick() {
        this.menuIsOpen = !this.menuIsOpen, this.checkMode();
    }
}
Header.moduleName = "govuk-header";
class NotificationBanner extends ConfigurableComponent {
    constructor(t, e = {}){
        super(t, e), "alert" !== this.$root.getAttribute("role") || this.config.disableAutoFocus || setFocus(this.$root);
    }
}
NotificationBanner.moduleName = "govuk-notification-banner", NotificationBanner.defaults = Object.freeze({
    disableAutoFocus: !1
}), NotificationBanner.schema = Object.freeze({
    properties: {
        disableAutoFocus: {
            type: "boolean"
        }
    }
});
class PasswordInput extends ConfigurableComponent {
    constructor(t, e = {}){
        super(t, e), this.i18n = void 0, this.$input = void 0, this.$showHideButton = void 0, this.$screenReaderStatusMessage = void 0;
        const i = this.$root.querySelector(".govuk-js-password-input-input");
        if (!(i instanceof HTMLInputElement)) throw new ElementError({
            component: PasswordInput,
            element: i,
            expectedType: "HTMLInputElement",
            identifier: "Form field (`.govuk-js-password-input-input`)"
        });
        if ("password" !== i.type) throw new ElementError("Password input: Form field (`.govuk-js-password-input-input`) must be of type `password`.");
        const n = this.$root.querySelector(".govuk-js-password-input-toggle");
        if (!(n instanceof HTMLButtonElement)) throw new ElementError({
            component: PasswordInput,
            element: n,
            expectedType: "HTMLButtonElement",
            identifier: "Button (`.govuk-js-password-input-toggle`)"
        });
        if ("button" !== n.type) throw new ElementError("Password input: Button (`.govuk-js-password-input-toggle`) must be of type `button`.");
        this.$input = i, this.$showHideButton = n, this.i18n = new I18n(this.config.i18n, {
            locale: closestAttributeValue(this.$root, "lang")
        }), this.$showHideButton.removeAttribute("hidden");
        const s = document.createElement("div");
        s.className = "govuk-password-input__sr-status govuk-visually-hidden", s.setAttribute("aria-live", "polite"), this.$screenReaderStatusMessage = s, this.$input.insertAdjacentElement("afterend", s), this.$showHideButton.addEventListener("click", this.toggle.bind(this)), this.$input.form && this.$input.form.addEventListener("submit", ()=>this.hide()), window.addEventListener("pageshow", (t)=>{
            t.persisted && "password" !== this.$input.type && this.hide();
        }), this.hide();
    }
    toggle(t) {
        t.preventDefault(), "password" !== this.$input.type ? this.hide() : this.show();
    }
    show() {
        this.setType("text");
    }
    hide() {
        this.setType("password");
    }
    setType(t) {
        if (t === this.$input.type) return;
        this.$input.setAttribute("type", t);
        const e = "password" === t, i = e ? "show" : "hide", n = e ? "passwordHidden" : "passwordShown";
        this.$showHideButton.innerText = this.i18n.t(`${i}Password`), this.$showHideButton.setAttribute("aria-label", this.i18n.t(`${i}PasswordAriaLabel`)), this.$screenReaderStatusMessage.innerText = this.i18n.t(`${n}Announcement`);
    }
}
PasswordInput.moduleName = "govuk-password-input", PasswordInput.defaults = Object.freeze({
    i18n: {
        showPassword: "Show",
        hidePassword: "Hide",
        showPasswordAriaLabel: "Show password",
        hidePasswordAriaLabel: "Hide password",
        passwordShownAnnouncement: "Your password is visible",
        passwordHiddenAnnouncement: "Your password is hidden"
    }
}), PasswordInput.schema = Object.freeze({
    properties: {
        i18n: {
            type: "object"
        }
    }
});
class Radios extends Component {
    constructor(t){
        super(t), this.$inputs = void 0;
        const e = this.$root.querySelectorAll('input[type="radio"]');
        if (!e.length) throw new ElementError({
            component: Radios,
            identifier: 'Form inputs (`<input type="radio">`)'
        });
        this.$inputs = e, this.$inputs.forEach((t)=>{
            const e = t.getAttribute("data-aria-controls");
            if (e) {
                if (!document.getElementById(e)) throw new ElementError({
                    component: Radios,
                    identifier: `Conditional reveal (\`id="${e}"\`)`
                });
                t.setAttribute("aria-controls", e), t.removeAttribute("data-aria-controls");
            }
        }), window.addEventListener("pageshow", ()=>this.syncAllConditionalReveals()), this.syncAllConditionalReveals(), this.$root.addEventListener("click", (t)=>this.handleClick(t));
    }
    syncAllConditionalReveals() {
        this.$inputs.forEach((t)=>this.syncConditionalRevealWithInputState(t));
    }
    syncConditionalRevealWithInputState(t) {
        const e = t.getAttribute("aria-controls");
        if (!e) return;
        const i = document.getElementById(e);
        if (null != i && i.classList.contains("govuk-radios__conditional")) {
            const e = t.checked;
            t.setAttribute("aria-expanded", e.toString()), i.classList.toggle("govuk-radios__conditional--hidden", !e);
        }
    }
    handleClick(t) {
        const e = t.target;
        if (!(e instanceof HTMLInputElement) || "radio" !== e.type) return;
        const i = document.querySelectorAll('input[type="radio"][aria-controls]'), n = e.form, s = e.name;
        i.forEach((t)=>{
            const e = t.form === n;
            t.name === s && e && this.syncConditionalRevealWithInputState(t);
        });
    }
}
Radios.moduleName = "govuk-radios";
class ServiceNavigation extends Component {
    constructor(t){
        super(t), this.$menuButton = void 0, this.$menu = void 0, this.menuIsOpen = !1, this.mql = null;
        const e = this.$root.querySelector(".govuk-js-service-navigation-toggle");
        if (!e) return this;
        const i = e.getAttribute("aria-controls");
        if (!i) throw new ElementError({
            component: ServiceNavigation,
            identifier: 'Navigation button (`<button class="govuk-js-service-navigation-toggle">`) attribute (`aria-controls`)'
        });
        const n = document.getElementById(i);
        if (!n) throw new ElementError({
            component: ServiceNavigation,
            element: n,
            identifier: `Navigation (\`<ul id="${i}">\`)`
        });
        this.$menu = n, this.$menuButton = e, this.setupResponsiveChecks(), this.$menuButton.addEventListener("click", ()=>this.handleMenuButtonClick());
    }
    setupResponsiveChecks() {
        const t = getBreakpoint("tablet");
        if (!t.value) throw new ElementError({
            component: ServiceNavigation,
            identifier: `CSS custom property (\`${t.property}\`) on pseudo-class \`:root\``
        });
        this.mql = window.matchMedia(`(min-width: ${t.value})`), "addEventListener" in this.mql ? this.mql.addEventListener("change", ()=>this.checkMode()) : this.mql.addListener(()=>this.checkMode()), this.checkMode();
    }
    checkMode() {
        this.mql && this.$menu && this.$menuButton && (this.mql.matches ? (this.$menu.removeAttribute("hidden"), this.$menuButton.setAttribute("hidden", "")) : (this.$menuButton.removeAttribute("hidden"), this.$menuButton.setAttribute("aria-expanded", this.menuIsOpen.toString()), this.menuIsOpen ? this.$menu.removeAttribute("hidden") : this.$menu.setAttribute("hidden", "")));
    }
    handleMenuButtonClick() {
        this.menuIsOpen = !this.menuIsOpen, this.checkMode();
    }
}
ServiceNavigation.moduleName = "govuk-service-navigation";
class SkipLink extends Component {
    constructor(t){
        var e;
        super(t);
        const i = this.$root.hash, n = null != (e = this.$root.getAttribute("href")) ? e : "";
        let s;
        try {
            s = new window.URL(this.$root.href);
        } catch (a) {
            throw new ElementError(`Skip link: Target link (\`href="${n}"\`) is invalid`);
        }
        if (s.origin !== window.location.origin || s.pathname !== window.location.pathname) return;
        const o = getFragmentFromUrl(i);
        if (!o) throw new ElementError(`Skip link: Target link (\`href="${n}"\`) has no hash fragment`);
        const r = document.getElementById(o);
        if (!r) throw new ElementError({
            component: SkipLink,
            element: r,
            identifier: `Target content (\`id="${o}"\`)`
        });
        this.$root.addEventListener("click", ()=>setFocus(r, {
                onBeforeFocus () {
                    r.classList.add("govuk-skip-link-focused-element");
                },
                onBlur () {
                    r.classList.remove("govuk-skip-link-focused-element");
                }
            }));
    }
}
SkipLink.elementType = HTMLAnchorElement, SkipLink.moduleName = "govuk-skip-link";
class Tabs extends Component {
    constructor(t){
        super(t), this.$tabs = void 0, this.$tabList = void 0, this.$tabListItems = void 0, this.jsHiddenClass = "govuk-tabs__panel--hidden", this.changingHash = !1, this.boundTabClick = void 0, this.boundTabKeydown = void 0, this.boundOnHashChange = void 0, this.mql = null;
        const e = this.$root.querySelectorAll("a.govuk-tabs__tab");
        if (!e.length) throw new ElementError({
            component: Tabs,
            identifier: 'Links (`<a class="govuk-tabs__tab">`)'
        });
        this.$tabs = e, this.boundTabClick = this.onTabClick.bind(this), this.boundTabKeydown = this.onTabKeydown.bind(this), this.boundOnHashChange = this.onHashChange.bind(this);
        const i = this.$root.querySelector(".govuk-tabs__list"), n = this.$root.querySelectorAll("li.govuk-tabs__list-item");
        if (!i) throw new ElementError({
            component: Tabs,
            identifier: 'List (`<ul class="govuk-tabs__list">`)'
        });
        if (!n.length) throw new ElementError({
            component: Tabs,
            identifier: 'List items (`<li class="govuk-tabs__list-item">`)'
        });
        this.$tabList = i, this.$tabListItems = n, this.setupResponsiveChecks();
    }
    setupResponsiveChecks() {
        const t = getBreakpoint("tablet");
        if (!t.value) throw new ElementError({
            component: Tabs,
            identifier: `CSS custom property (\`${t.property}\`) on pseudo-class \`:root\``
        });
        this.mql = window.matchMedia(`(min-width: ${t.value})`), "addEventListener" in this.mql ? this.mql.addEventListener("change", ()=>this.checkMode()) : this.mql.addListener(()=>this.checkMode()), this.checkMode();
    }
    checkMode() {
        var t;
        null != (t = this.mql) && t.matches ? this.setup() : this.teardown();
    }
    setup() {
        var t;
        this.$tabList.setAttribute("role", "tablist"), this.$tabListItems.forEach((t)=>{
            t.setAttribute("role", "presentation");
        }), this.$tabs.forEach((t)=>{
            this.setAttributes(t), t.addEventListener("click", this.boundTabClick, !0), t.addEventListener("keydown", this.boundTabKeydown, !0), this.hideTab(t);
        });
        const e = null != (t = this.getTab(window.location.hash)) ? t : this.$tabs[0];
        this.showTab(e), window.addEventListener("hashchange", this.boundOnHashChange, !0);
    }
    teardown() {
        this.$tabList.removeAttribute("role"), this.$tabListItems.forEach((t)=>{
            t.removeAttribute("role");
        }), this.$tabs.forEach((t)=>{
            t.removeEventListener("click", this.boundTabClick, !0), t.removeEventListener("keydown", this.boundTabKeydown, !0), this.unsetAttributes(t);
        }), window.removeEventListener("hashchange", this.boundOnHashChange, !0);
    }
    onHashChange() {
        const t = window.location.hash, e = this.getTab(t);
        if (!e) return;
        if (this.changingHash) return void (this.changingHash = !1);
        const i = this.getCurrentTab();
        i && (this.hideTab(i), this.showTab(e), e.focus());
    }
    hideTab(t) {
        this.unhighlightTab(t), this.hidePanel(t);
    }
    showTab(t) {
        this.highlightTab(t), this.showPanel(t);
    }
    getTab(t) {
        return this.$root.querySelector(`a.govuk-tabs__tab[href="${t}"]`);
    }
    setAttributes(t) {
        const e = getFragmentFromUrl(t.href);
        if (!e) return;
        t.setAttribute("id", `tab_${e}`), t.setAttribute("role", "tab"), t.setAttribute("aria-controls", e), t.setAttribute("aria-selected", "false"), t.setAttribute("tabindex", "-1");
        const i = this.getPanel(t);
        i && (i.setAttribute("role", "tabpanel"), i.setAttribute("aria-labelledby", t.id), i.classList.add(this.jsHiddenClass));
    }
    unsetAttributes(t) {
        t.removeAttribute("id"), t.removeAttribute("role"), t.removeAttribute("aria-controls"), t.removeAttribute("aria-selected"), t.removeAttribute("tabindex");
        const e = this.getPanel(t);
        e && (e.removeAttribute("role"), e.removeAttribute("aria-labelledby"), e.classList.remove(this.jsHiddenClass));
    }
    onTabClick(t) {
        const e = this.getCurrentTab(), i = t.currentTarget;
        e && i instanceof HTMLAnchorElement && (t.preventDefault(), this.hideTab(e), this.showTab(i), this.createHistoryEntry(i));
    }
    createHistoryEntry(t) {
        const e = this.getPanel(t);
        if (!e) return;
        const i = e.id;
        e.id = "", this.changingHash = !0, window.location.hash = i, e.id = i;
    }
    onTabKeydown(t) {
        switch(t.key){
            case "ArrowLeft":
            case "Left":
                this.activatePreviousTab(), t.preventDefault();
                break;
            case "ArrowRight":
            case "Right":
                this.activateNextTab(), t.preventDefault();
        }
    }
    activateNextTab() {
        const t = this.getCurrentTab();
        if (null == t || !t.parentElement) return;
        const e = t.parentElement.nextElementSibling;
        if (!e) return;
        const i = e.querySelector("a.govuk-tabs__tab");
        i && (this.hideTab(t), this.showTab(i), i.focus(), this.createHistoryEntry(i));
    }
    activatePreviousTab() {
        const t = this.getCurrentTab();
        if (null == t || !t.parentElement) return;
        const e = t.parentElement.previousElementSibling;
        if (!e) return;
        const i = e.querySelector("a.govuk-tabs__tab");
        i && (this.hideTab(t), this.showTab(i), i.focus(), this.createHistoryEntry(i));
    }
    getPanel(t) {
        const e = getFragmentFromUrl(t.href);
        return e ? this.$root.querySelector(`#${e}`) : null;
    }
    showPanel(t) {
        const e = this.getPanel(t);
        e && e.classList.remove(this.jsHiddenClass);
    }
    hidePanel(t) {
        const e = this.getPanel(t);
        e && e.classList.add(this.jsHiddenClass);
    }
    unhighlightTab(t) {
        t.parentElement && (t.setAttribute("aria-selected", "false"), t.parentElement.classList.remove("govuk-tabs__list-item--selected"), t.setAttribute("tabindex", "-1"));
    }
    highlightTab(t) {
        t.parentElement && (t.setAttribute("aria-selected", "true"), t.parentElement.classList.add("govuk-tabs__list-item--selected"), t.setAttribute("tabindex", "0"));
    }
    getCurrentTab() {
        return this.$root.querySelector(".govuk-tabs__list-item--selected a.govuk-tabs__tab");
    }
}
function initAll(t) {
    var e;
    if (t = void 0 !== t ? t : {}, !isSupported()) return void (t.onError ? t.onError(new SupportError, {
        config: t
    }) : console.log(new SupportError));
    const i = [
        [
            Accordion,
            t.accordion
        ],
        [
            Button,
            t.button
        ],
        [
            CharacterCount,
            t.characterCount
        ],
        [
            Checkboxes
        ],
        [
            ErrorSummary,
            t.errorSummary
        ],
        [
            ExitThisPage,
            t.exitThisPage
        ],
        [
            FileUpload,
            t.fileUpload
        ],
        [
            Header
        ],
        [
            NotificationBanner,
            t.notificationBanner
        ],
        [
            PasswordInput,
            t.passwordInput
        ],
        [
            Radios
        ],
        [
            ServiceNavigation
        ],
        [
            SkipLink
        ],
        [
            Tabs
        ]
    ], n = {
        scope: null != (e = t.scope) ? e : document,
        onError: t.onError
    };
    i.forEach(([Component, t])=>{
        createAll(Component, t, n);
    });
}
function createAll(Component, t, e) {
    let i, n = document;
    var s;
    "object" == typeof e && (n = null != (s = e.scope) ? s : n, i = e.onError);
    "function" == typeof e && (i = e), e instanceof HTMLElement && (n = e);
    const o = n.querySelectorAll(`[data-module="${Component.moduleName}"]`);
    return isSupported() ? Array.from(o).map((e)=>{
        try {
            return void 0 !== t ? new Component(e, t) : new Component(e);
        } catch (n) {
            return i ? i(n, {
                element: e,
                component: Component,
                config: t
            }) : console.log(n), null;
        }
    }).filter(Boolean) : (i ? i(new SupportError, {
        component: Component,
        config: t
    }) : console.log(new SupportError), []);
}
Tabs.moduleName = "govuk-tabs";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["b5kAs","lltzB"], "lltzB", "parcelRequire5f8f")

//# sourceMappingURL=iai-design-system.js.map
