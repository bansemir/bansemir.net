sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "sap/base/i18n/Localization"
], function (BaseController, Localization) {
    "use strict";

    return BaseController.extend("net.bansemir.profile.controller.App", {

        onInit: function () {
            var sLocale = this.getLocale();
            this.byId("languageSelect").setSelectedKey(sLocale);
        },

        onLanguageChange: function (oEvent) {
            var sLanguage = oEvent.getParameter("selectedItem").getKey();
            Localization.setLanguage(sLanguage);
            location.reload();
        },

        onOpenGitHub: function () {
            window.open("https://github.com/bansemir/bansemir.net", "_blank");
        }
    });
});
