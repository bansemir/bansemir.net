sap.ui.define([
    "sap/base/i18n/Localization"
], function (Localization) {
    "use strict";

    var _getLocale = function () {
        var sLanguage = Localization.getLanguage();
        return sLanguage.startsWith("en") ? "en" : "de";
    };

    return {
        formatLocalized: function (oValue) {
            if (!oValue) {
                return "";
            }
            if (typeof oValue === "string") {
                return oValue;
            }
            return oValue[_getLocale()] || oValue.de || "";
        },

        formatLevelState: function (sLevel) {
            switch (sLevel) {
                case "expert": return "Success";
                case "advanced": return "Information";
                default: return "None";
            }
        },

        formatYears: function (iYears) {
            return iYears ? iYears + "+" : "";
        }
    };
});
