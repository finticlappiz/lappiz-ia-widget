(async () => {
  const REPO = "finticlappiz/lappiz-ia-widget";
  const CDN = "https://cdn.jsdelivr.net/gh";

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`);
    const { tag_name } = await res.json();

    const script = document.createElement("script");
    script.type = "module";
    script.src = `${CDN}/${REPO}@${tag_name}/dist/browser/main.js`;
    document.head.appendChild(script);

  } catch (err) {
    console.warn("[lappiz-widget] No se pudo obtener la última versión:", err);
    const script = document.createElement("script");
    script.type = "module";
    script.src = `${CDN}/${REPO}@v1.0.5/dist/browser/main.js`;
    document.head.appendChild(script);
  }
})();
