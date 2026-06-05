sap.ui.define([
    "net/bansemir/profile/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("net.bansemir.profile.controller.NotFound", {

        onNavToOverview: function () {
            this.getRouter().navTo("overview", {}, undefined, true);
        }
    });
});
