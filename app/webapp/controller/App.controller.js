sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "sap/base/i18n/Localization",
    "sap/ui/core/Theming"
], function (BaseController, Localization, Theming) {
    "use strict";

    var LIGHT_THEME = "sap_fiori_3";
    var DARK_THEME = "sap_fiori_3_dark";

    return BaseController.extend("net.bansemir.profile.controller.App", {

        onInit: function () {
            var sSaved = localStorage.getItem("bansemir.theme");
            if (sSaved && sSaved !== Theming.getTheme()) {
                Theming.setTheme(sSaved);
            }
            this._updateThemeIcon();
        },

        onThemeToggle: function () {
            var bIsDark = Theming.getTheme().indexOf("dark") > -1;
            var sTarget = bIsDark ? LIGHT_THEME : DARK_THEME;
            Theming.setTheme(sTarget);
            localStorage.setItem("bansemir.theme", sTarget);
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
            Localization.setLanguage(sTarget);
            location.reload();
        },

        onOpenGitHub: function () {
            window.open("https://github.com/bansemir/bansemir.net", "_blank");
        }
    });
});
