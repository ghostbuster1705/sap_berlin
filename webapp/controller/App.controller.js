sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.App", {
        onInit: function () {
            this._oRouter = UIComponent.getRouterFor(this);
            this._oRouter.attachRouteMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name");
            var mRouteKeys = {
                home: "home",
                worklist: "worklist",
                object: "worklist",
                analytics: "analytics"
            };
            var sKey = mRouteKeys[sRouteName] || "home";
            this.getView().getModel("app").setProperty("/selectedKey", sKey);

            var oToolPage = this.byId("toolPage");
            if (oToolPage && sap.ui.Device.system.phone) {
                oToolPage.setSideExpanded(false);
            }
        },

        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        onItemSelect: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            var mRoutes = {
                home: "home",
                worklist: "worklist",
                analytics: "analytics"
            };
            if (mRoutes[sKey]) {
                this._oRouter.navTo(mRoutes[sKey]);
            } else if (sKey === "settings") {
                MessageToast.show("Einstellungen werden in Kürze verfügbar sein.");
            }
        },

        onGlobalSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                this._oRouter.navTo("worklist");
                var oWorklistRoute = this._oRouter.getRoute("worklist");
                oWorklistRoute.attachPatternMatched(function () {
                    var oView = this._oRouter.getTargets().getTarget("worklist")._oView;
                    if (oView) {
                        var oController = oView.getController();
                        if (oController && oController.applySearch) {
                            oController.applySearch(sQuery);
                        }
                    }
                }.bind(this), true);
            }
        },

        onAvatarPress: function () {
            this._oRouter.navTo("object", { employeeId: "E001" });
        }
    });
});
