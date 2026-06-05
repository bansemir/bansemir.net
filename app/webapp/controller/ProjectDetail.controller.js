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
            // The projects model loads asynchronously: on a cold deep link the
            // route fires before the JSON is available, so defer the lookup
            // until the model is loaded (resolves immediately when it already is).
            oModel.dataLoaded().then(function () {
                var aProjects = oModel.getProperty("/projects") || [];
                var iIndex = aProjects.findIndex(function (oProject) {
                    return oProject.id === sProjectId;
                });
                if (iIndex >= 0) {
                    this.getView().bindElement({
                        path: "/projects/" + iIndex,
                        model: "projects"
                    });
                } else {
                    // Unknown project id: show a friendly not-found page
                    // instead of an empty, unbound view.
                    this.getRouter().getTargets().display("notFound");
                }
            }.bind(this));
        }
    });
});
