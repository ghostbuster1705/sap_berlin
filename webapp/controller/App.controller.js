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
                home: 0,
                worklist: 1,
                object: 1,
                analytics: 2
            };
            var iIndex = mRouteKeys[sRouteName];
            if (iIndex !== undefined) {
                this.byId("sideNavigation").setSelectedItem(
                    this.byId("sideNavigation").getItems()[iIndex]
                );
            }

            if (sap.ui.Device.system.phone) {
                this.byId("sideNavPanel").setVisible(false);
            }
        },

        onSideNavButtonPress: function () {
            var oPanel = this.byId("sideNavPanel");
            oPanel.setVisible(!oPanel.getVisible());
        },

        onNavSelect: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            if (!oItem) {
                return;
            }
            var sKey = oItem.data("navKey");
            var mRoutes = {
                home: "home",
                worklist: "worklist",
                analytics: "analytics"
            };
            if (mRoutes[sKey]) {
                this._oRouter.navTo(mRoutes[sKey]);
            }
        },

        onGlobalSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                this._oRouter.navTo("worklist");
                setTimeout(function () {
                    var oTarget = this._oRouter.getTargets().getTarget("worklist");
                    var oView = oTarget && oTarget._oView;
                    if (oView && oView.getController().applySearch) {
                        oView.getController().applySearch(sQuery);
                    }
                }.bind(this), 500);
            }
        },

        onAvatarPress: function () {
            this._oRouter.navTo("object", { employeeId: "E001" });
        }
    });
});
