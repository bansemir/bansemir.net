sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "sap/ui/core/Theming"
], function (BaseController, Theming) {
    "use strict";

    var THEMES = { light: "sap_fiori_3", dark: "sap_fiori_3_dark" };

    return BaseController.extend("net.bansemir.profile.controller.App", {

        onInit: function () {
            var sSaved = localStorage.getItem("bansemir.theme");
            if (sSaved && THEMES[sSaved]) {
                var sTarget = THEMES[sSaved];
                if (sTarget !== Theming.getTheme()) {
                    Theming.setTheme(sTarget);
                }
            }
            this._applyLanguageFromStorage();
            this._updateThemeIcon();
        },

        _applyLanguageFromStorage: function () {
            var sSearch = window.location.search;
            if (sSearch.indexOf("sap-language") > -1) {
                return;
            }
            var sSavedLang = localStorage.getItem("bansemir.lang");
            if (sSavedLang && sSavedLang !== this.getLocale()) {
                window.location.href = window.location.pathname + "?sap-language=" + sSavedLang;
            }
        },

        onThemeToggle: function () {
            var bIsDark = Theming.getTheme().indexOf("dark") > -1;
            var sMode = bIsDark ? "light" : "dark";
            Theming.setTheme(THEMES[sMode]);
            localStorage.setItem("bansemir.theme", sMode);
            this._updateThemeIcon();
        },

        _updateThemeIcon: function () {
            var bIsDark = Theming.getTheme().indexOf("dark") > -1;
            var oBtn = this.byId("themeToggle");
            if (oBtn) {
                oBtn.setIcon(bIsDark ? "sap-icon://light-mode" : "sap-icon://dark-mode");
            }
        },

        onLanguageToggle: function () {
            var sLocale = this.getLocale();
            var sTarget = sLocale === "de" ? "en" : "de";
            localStorage.setItem("bansemir.lang", sTarget);
            window.location.href = window.location.pathname + "?sap-language=" + sTarget;
        },

        onOpenGitHub: function () {
            window.open("https://github.com/bansemir/bansemir.net", "_blank");
        }
    });
});
