(function () {
    var LOADER_VERSION = '1.0.0';
    var MANIFEST_FILE = 'manifest.json';

    function getCurrentScript() {
        if (document.currentScript) {
            return document.currentScript;
        }

        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1] || null;
    }

    function resolveBaseUrl() {
        var current = getCurrentScript();
        if (!current || !current.src) {
            return '/widget/';
        }

        var src = current.src.split('?')[0];
        return src.substring(0, src.lastIndexOf('/') + 1);
    }

    function loadScript(entry, baseUrl) {
        return new Promise(function (resolve, reject) {
            if (!entry || !entry.path) {
                reject(new Error('Entrada de manifest invalida'));
                return;
            }

            var script = document.createElement('script');
            script.src = new URL(entry.path, baseUrl).toString();
            script.defer = true;
            script.crossOrigin = 'anonymous';
            script.dataset.widgetVersion = entry.version || 'unknown';

            if (entry.integrity) {
                script.integrity = entry.integrity;
            }

            script.onload = function () {
                resolve(entry.version || 'unknown');
            };

            script.onerror = function () {
                reject(new Error('No se pudo cargar la version ' + (entry.version || 'desconocida')));
            };

            document.head.appendChild(script);
        });
    }

    function emitStatus(type, detail) {
        window.dispatchEvent(
            new CustomEvent('lappiz:widget-loader:' + type, {
                detail: detail,
            })
        );
    }

    async function run() {
        var baseUrl = resolveBaseUrl();
        var manifestUrl = new URL(MANIFEST_FILE, baseUrl).toString();

        try {
            var response = await fetch(manifestUrl, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Manifest no disponible: ' + response.status + ' ' + response.statusText);
            }

            var manifest = await response.json();
            var stable = manifest && manifest.stable;
            var previousStable = manifest && manifest.previousStable;

            if (!stable || !stable.path) {
                throw new Error('manifest.stable.path es requerido');
            }

            try {
                var loadedStable = await loadScript(stable, baseUrl);
                emitStatus('loaded', {
                    loaderVersion: LOADER_VERSION,
                    source: 'stable',
                    version: loadedStable,
                    manifestUrl: manifestUrl,
                });
            } catch (stableError) {
                if (!previousStable || !previousStable.path) {
                    throw stableError;
                }

                var loadedFallback = await loadScript(previousStable, baseUrl);
                emitStatus('fallback', {
                    loaderVersion: LOADER_VERSION,
                    source: 'previousStable',
                    version: loadedFallback,
                    manifestUrl: manifestUrl,
                    reason: stableError.message,
                });
            }
        } catch (error) {
            console.error('[Lappiz Widget Loader] Error de carga:', error);
            emitStatus('error', {
                loaderVersion: LOADER_VERSION,
                message: error instanceof Error ? error.message : String(error),
                manifestUrl: manifestUrl,
            });
        }
    }

    run();
})();
