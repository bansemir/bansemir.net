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

        setModel: function (oModel, sName) {
            this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        navTo: function (sRoute, oParams) {
            this.getRouter().navTo(sRoute, oParams);
        },

        onNavBack: function () {
            var sPreviousHash = History.getInstance().getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.navTo("overview", {});
            }
        },

        getLocale: function () {
            var sLanguage = Localization.getLanguage();
            return sLanguage.startsWith("en") ? "en" : "de";
        },

        getLocalizedText: function (oData, sField) {
            if (!oData || !oData[sField]) {
                return "";
            }
            var vValue = oData[sField];
            if (typeof vValue === "string") {
                return vValue;
            }
            var sLocale = this.getLocale();
            return vValue[sLocale] || vValue.de || "";
        }
    });
});
