sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "sap/base/i18n/Localization"
], function (BaseController, Localization) {
    "use strict";

    return BaseController.extend("net.bansemir.profile.controller.App", {

        onInit: function () {
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
