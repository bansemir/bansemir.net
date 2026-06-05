// Root language redirect. Sends the visitor to the last-chosen locale, or German
// by default. Kept in an external file (no inline script) so a strict
// Content-Security-Policy without 'unsafe-inline' for scripts can be enforced.
(function () {
    var lang = localStorage.getItem("bansemir.lang");
    window.location.href = lang === "en" ? "/en/" : "/de/";
})();
