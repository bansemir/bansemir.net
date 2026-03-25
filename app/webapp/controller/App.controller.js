sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "sap/base/i18n/Localization",
    "sap/ui/model/json/JSONModel"
], function (BaseController, Localization, JSONModel) {
    "use strict";

    return BaseController.extend("net.bansemir.profile.controller.App", {

        onInit: function () {
            var sLocale = this.getLocale();
            this.getView().setModel(new JSONModel({ locale: sLocale }), "appView");
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
