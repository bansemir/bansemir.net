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
            var aCategories = oSkillsModel.getProperty("/categories");
            if (aCategories) {
                this._buildFlatSkills(oSkillsModel);
            } else {
                oSkillsModel.attachEventOnce("requestCompleted", function () {
                    this._buildFlatSkills(oSkillsModel);
                }.bind(this));
                setTimeout(function () {
                    if (!this.getView().getModel("skillsFlat")) {
                        this._buildFlatSkills(oSkillsModel);
                    }
                }.bind(this), 3000);
            }
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
            this.getView().setModel(new JSONModel(aFlat), "skillsFlat");
        },

        onSkillSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") ||
                oEvent.getParameter("newValue") || "";
            var oTable = this.byId("skillsTable");
            var oBinding = oTable.getBinding("rows");
            if (oBinding) {
                var aFilters = sQuery
                    ? [new Filter("name", FilterOperator.Contains, sQuery)]
                    : [];
                oBinding.filter(aFilters);
            }
        },

        onNavToProject: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("projects");
            var sProjectId = oContext.getProperty("id");
            this.navTo("projectDetail", { projectId: sProjectId });
        },

        onNavToCaseStudy: function () {
            this.navTo("caseStudy");
        }
    });
});
