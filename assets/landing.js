(function () {
    var root = document.documentElement;
    var btn = document.getElementById("themeToggle");

    // Die Demo-Clips gibt es je Sprache in einer hellen und einer dunklen
    // Fassung. Das Markup liefert die helle aus — sie passt zum CSS-Standard,
    // bevor hier ein data-theme gesetzt wird.
    var DEMO_PATH = "../assets/toolkit-demo/";
    var demoVideos = Array.prototype.slice.call(
        document.querySelectorAll(".demo-video[data-clip]")
    );

    function syncDemoTheme(theme) {
        demoVideos.forEach(function (video) {
            var base = DEMO_PATH + video.getAttribute("data-clip") + "-" + theme;
            if (video.getAttribute("src") === base + ".mp4") {
                return;
            }
            var wasPlaying = !video.paused;
            var position = video.currentTime;

            video.setAttribute("poster", base + ".webp");
            video.setAttribute("src", base + ".mp4");

            // Ein noch nie abgespieltes Video traegt preload="none" — dort gibt es
            // nichts wiederherzustellen, und load() wuerde nur unnoetig laden.
            if (!wasPlaying && position === 0) {
                return;
            }
            video.load();
            var restore = function () {
                video.removeEventListener("loadedmetadata", restore);
                if (position > 0 && position < video.duration) {
                    video.currentTime = position;
                }
                if (wasPlaying) {
                    video.play().catch(function () {});
                }
            };
            video.addEventListener("loadedmetadata", restore);
        });
    }

    var theme = localStorage.getItem("bansemir.theme");
    if (!theme) {
        theme = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
    }

    function applyTheme(next) {
        theme = next;
        root.setAttribute("data-theme", theme);
        btn.textContent = theme === "dark" ? "\u2600" : "\u263E";
        syncDemoTheme(theme);
    }

    applyTheme(theme);

    btn.addEventListener("click", function () {
        applyTheme(theme === "dark" ? "light" : "dark");
        localStorage.setItem("bansemir.theme", theme);
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

// Toolkit-Demos: laufen an, sobald sie im Blickfeld sind, und halten an, sobald
// sie es verlassen. Die Videos tragen preload="none" — geladen wird erst beim
// ersten Abspielen. Jede Demo hat einen eigenen Schalter, weil bewegte Inhalte
// jenseits von fuenf Sekunden anhaltbar sein muessen (WCAG 2.2.2).
(function () {
    var section = document.querySelector(".toolkit");
    if (!section) {
        return;
    }

    var playLabel = section.getAttribute("data-play-label");
    var pauseLabel = section.getAttribute("data-pause-label");
    var toggles = section.querySelectorAll(".demo-toggle");
    var videos = [];

    function reflect(video, toggle) {
        var running = !video.paused;
        toggle.setAttribute("aria-label", running ? pauseLabel : playLabel);
        toggle.textContent = running ? "\u23F8" : "\u25B6";
    }

    Array.prototype.forEach.call(toggles, function (toggle) {
        var video = document.getElementById(toggle.getAttribute("data-demo"));
        if (!video) {
            return;
        }
        videos.push(video);
        reflect(video, toggle);

        toggle.addEventListener("click", function () {
            if (video.paused) {
                delete video.dataset.pausedByUser;
                video.play().catch(function () {});
            } else {
                video.dataset.pausedByUser = "1";
                video.pause();
            }
        });

        video.addEventListener("play", function () { reflect(video, toggle); });
        video.addEventListener("pause", function () { reflect(video, toggle); });
    });

    var reducedMotion = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                entry.target.pause();
            } else if (!entry.target.dataset.pausedByUser) {
                entry.target.play().catch(function () {});
            }
        });
    }, { threshold: 0.4 });

    videos.forEach(function (video) { observer.observe(video); });
})();
