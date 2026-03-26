sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "net/bansemir/profile/model/formatter"
], function (BaseController, formatter) {
    "use strict";

    return BaseController.extend("net.bansemir.profile.controller.CaseStudy", {
        formatter: formatter
    });
});
