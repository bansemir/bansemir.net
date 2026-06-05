sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "sap/ui/core/Theming"
], function (BaseController, Theming) {
    "use strict";

    var THEMES = { light: "sap_horizon", dark: "sap_horizon_dark" };
    var THEME_KEY = "bansemir.theme";

    return BaseController.extend("net.bansemir.profile.controller.App", {

        onInit: function () {
            var sMode = this._resolveThemeMode();
            var sTarget = THEMES[sMode];
            if (sTarget !== Theming.getTheme()) {
                Theming.setTheme(sTarget);
            }
            this._applyLanguageFromStorage();
            this._updateThemeIcon();
        },

        // Returns "light" or "dark". Honors a stored preference (migrating any
        // legacy value), otherwise falls back to the OS prefers-color-scheme.
        _resolveThemeMode: function () {
            var sSaved = this._migrateStoredTheme(localStorage.getItem(THEME_KEY));
            if (sSaved === "light" || sSaved === "dark") {
                return sSaved;
            }
            var bPrefersDark = window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
            return bPrefersDark ? "dark" : "light";
        },

        // Maps any previously persisted value to the current "light"/"dark" keys.
        // Earlier builds (and a defensive fallback) may have stored a full theme
        // name like "sap_fiori_3" / "sap_fiori_3_dark"; normalize those here and
        // rewrite storage so the value is consistent going forward.
        _migrateStoredTheme: function (sStored) {
            if (!sStored) {
                return null;
            }
            var sMode = sStored;
            if (sStored.indexOf("sap_") === 0) {
                sMode = sStored.indexOf("dark") > -1 ? "dark" : "light";
            }
            if (sMode !== "light" && sMode !== "dark") {
                return null;
            }
            if (sMode !== sStored) {
                localStorage.setItem(THEME_KEY, sMode);
            }
            return sMode;
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
            localStorage.setItem(THEME_KEY, sMode);
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
            var sUrl = this.getOwnerComponent().getModel("config").getProperty("/social/github");
            window.open(sUrl, "_blank");
        }
    });
});
