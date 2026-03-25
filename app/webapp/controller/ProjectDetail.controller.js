sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "net/bansemir/profile/model/formatter"
], function (BaseController, formatter) {
    "use strict";

    return BaseController.extend("net.bansemir.profile.controller.ProjectDetail", {
        formatter: formatter,

        onInit: function () {
            this.getRouter().getRoute("projectDetail")
                .attachPatternMatched(this._onProjectMatched, this);
        },

        _onProjectMatched: function (oEvent) {
            var sProjectId = oEvent.getParameter("arguments").projectId;
            var oModel = this.getModel("projects");
            var aProjects = oModel.getProperty("/projects") || [];
            var iIndex = aProjects.findIndex(function (oProject) {
                return oProject.id === sProjectId;
            });
            if (iIndex >= 0) {
                this.getView().bindElement({
                    path: "/projects/" + iIndex,
                    model: "projects"
                });
            }
        }
    });
});
