(function () {
    var btn = document.getElementById("themeToggle");
    var root = document.documentElement;
    var theme = localStorage.getItem("bansemir.theme");

    if (!theme) {
        theme = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
    }

    root.setAttribute("data-theme", theme);
    btn.textContent = theme === "dark" ? "\u2600" : "\u263E";

    btn.addEventListener("click", function () {
        theme = theme === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", theme);
        localStorage.setItem("bansemir.theme", theme);
        btn.textContent = theme === "dark" ? "\u2600" : "\u263E";
    });

    var lang = document.documentElement.lang || "de";
    localStorage.setItem("bansemir.lang", lang);

    var langLink = document.querySelector(".lang-switch a");
    if (langLink) {
        langLink.addEventListener("click", function () {
            localStorage.setItem("bansemir.lang", langLink.hreflang);
        });
    }
})();
