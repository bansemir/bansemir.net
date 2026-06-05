sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/base/i18n/Localization"
], function (Controller, History, Localization) {
    "use strict";

    return Controller.extend("net.bansemir.profile.controller.BaseController", {

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        navTo: function (sRoute, oParams) {
            this.getRouter().navTo(sRoute, oParams);
        },

        onNavBack: function () {
            var sPreviousHash = History.getInstance().getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                // No in-app history (e.g. deep link / fresh load): route to the
                // overview and replace the current hash so Back doesn't loop.
                this.getRouter().navTo("overview", {}, undefined, true);
            }
        },

        getLocale: function () {
            var sLanguage = Localization.getLanguage();
            return sLanguage.startsWith("en") ? "en" : "de";
        }
    });
});
