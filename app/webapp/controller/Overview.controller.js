sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "net/bansemir/profile/model/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, formatter, JSONModel, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("net.bansemir.profile.controller.Overview", {

        formatter: formatter,

        onInit: function () {
            this._flattenSkills();
        },

        onOpenCalendly: function () {
            var sUrl = this.getOwnerComponent().getModel("config").getProperty("/services/calendlyUrl");
            if (sUrl) {
                window.open(sUrl, "_blank");
            }
        },

        _flattenSkills: function () {
            var oSkillsModel = this.getOwnerComponent().getModel("skills");
            if (!oSkillsModel) {
                return;
            }
            // dataLoaded() resolves immediately if the model is already loaded,
            // otherwise once the JSON request completes -- the correct API instead
            // of an attachEventOnce + setTimeout(3000) readiness race.
            oSkillsModel.dataLoaded().then(function () {
                this._buildFlatSkills(oSkillsModel);
            }.bind(this));
        },

        _buildFlatSkills: function (oSkillsModel) {
            var aCategories = oSkillsModel.getProperty("/categories") || [];
            var sLocale = this.getLocale();
            var aFlat = [];
            aCategories.forEach(function (oCategory) {
                var sCategoryLabel = oCategory.label
                    ? (oCategory.label[sLocale] || oCategory.label.de)
                    : oCategory.id;
                (oCategory.skills || []).forEach(function (oSkill) {
                    aFlat.push({
                        name: oSkill.name,
                        category: sCategoryLabel,
                        categoryId: oCategory.id,
                        years: oSkill.years,
                        level: oSkill.level,
                        projects: oSkill.projects
                    });
                });
            });
            // Reuse the model on re-entry so we never orphan a previous instance.
            var oFlatModel = this.getView().getModel("skillsFlat");
            if (oFlatModel) {
                oFlatModel.setData(aFlat);
            } else {
                this._oSkillsFlatModel = new JSONModel(aFlat);
                this.getView().setModel(this._oSkillsFlatModel, "skillsFlat");
            }
        },

        onExit: function () {
            // The skillsFlat model is created in the controller (not via manifest),
            // so the controller owns its lifecycle and must clean it up.
            if (this._oSkillsFlatModel) {
                this._oSkillsFlatModel.destroy();
                this._oSkillsFlatModel = null;
            }
        },

        onSkillSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") ||
                oEvent.getParameter("newValue") || "";
            var oTable = this.byId("skillsTable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                var aFilters = sQuery
                    ? [new Filter("name", FilterOperator.Contains, sQuery)]
                    : [];
                oBinding.filter(aFilters);
            }
        },

        onNavToProject: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("projects");
            var sProjectId = oContext && oContext.getProperty("id");
            if (!sProjectId) {
                return;
            }
            this.navTo("projectDetail", { projectId: sProjectId });
        },

        onNavToCaseStudy: function () {
            this.navTo("caseStudy");
        }
    });
});
