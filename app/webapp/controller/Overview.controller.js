sap.ui.define([
    "net/bansemir/profile/controller/BaseController",
    "net/bansemir/profile/model/formatter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Theming"
], function (BaseController, formatter, JSONModel, Filter, FilterOperator, Theming) {
    "use strict";

    // Die Demo-Clips liegen einmal im Wurzelverzeichnis der Site und werden von
    // der Landing Page und von hier aus referenziert — nicht kopiert. Der Pfad
    // ist deshalb absolut; unter dem reinen UI5-Entwicklungsserver (ohne die
    // ausgelieferte Verzeichnisstruktur) laeuft er entsprechend ins Leere.
    var DEMO_PATH = "/assets/toolkit-demo/";

    return BaseController.extend("net.bansemir.profile.controller.Overview", {

        formatter: formatter,

        onInit: function () {
            this._flattenSkills();

            // Ein Theme-Wechsel laeuft ohne Neuladen — die Clips muessen mitziehen.
            this._syncDemos = this._syncToolkitDemos.bind(this);
            Theming.attachApplied(this._syncDemos);

            // Die IconTabBar rendert beim Tabwechsel nur den gewaehlten Inhalt neu;
            // das video-Element existiert also erst nach diesem Rendering.
            var oTabBar = this.byId("toolkitTabBar");
            if (oTabBar) {
                oTabBar.addEventDelegate({ onAfterRendering: this._syncDemos });
            }
        },

        onToolkitTabSelect: function () {
            this._syncToolkitDemos();
        },

        // Setzt Quelle und Poster jedes Demo-Videos auf die Fassung, die zu
        // Sprache und aktivem Theme passt, und startet das sichtbare Video.
        _syncToolkitDemos: function () {
            var oView = this.getView();
            var oDom = oView && oView.getDomRef();
            if (!oDom) {
                return;
            }
            var sTheme = Theming.getTheme().indexOf("dark") > -1 ? "dark" : "light";
            var sVariant = "-" + this.getLocale() + "-" + sTheme;

            Array.prototype.forEach.call(
                oDom.querySelectorAll("video[data-clip]"),
                function (oVideo) {
                    var sBase = DEMO_PATH + oVideo.getAttribute("data-clip") + sVariant;
                    if (oVideo.getAttribute("src") !== sBase + ".mp4") {
                        oVideo.setAttribute("poster", sBase + ".webp");
                        oVideo.setAttribute("src", sBase + ".mp4");
                        oVideo.load();
                    }
                    // Autoplay bleibt aus, wenn der Betrachter selbst pausiert hat.
                    if (oVideo.paused && !oVideo.dataset.pausedByUser) {
                        oVideo.play().catch(function () {});
                    }
                    oVideo.onpause = function () {
                        if (!oVideo.ended) {
                            oVideo.dataset.pausedByUser = "1";
                        }
                    };
                    oVideo.onplay = function () {
                        delete oVideo.dataset.pausedByUser;
                    };
                }
            );
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
            if (this._syncDemos) {
                Theming.detachApplied(this._syncDemos);
                this._syncDemos = null;
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
