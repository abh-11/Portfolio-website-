// Applied in <head> before the first paint. Keep the fallback usable with storage disabled.
export const themeInitScript = `(function(){var t;try{t=localStorage.getItem("portfolio-theme")}catch(e){}if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t})();`;
