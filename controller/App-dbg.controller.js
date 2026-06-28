sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.App", {
        onInit: function () {
            this._oRouter = this.getOwnerComponent().getRouter();
            this._oRouter.attachRouteMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name");
            var mRouteKeys = { home: 0, worklist: 1, object: 1, analytics: 2 };
            var iIndex = mRouteKeys[sRouteName];
            var oList = this.byId("sideNavigation");
            if (iIndex !== undefined && oList) {
                oList.setSelectedItem(oList.getItems()[iIndex]);
            }
        },

        onSideNavButtonPress: function () {
            var oPanel = this.byId("sideNavPanel");
            if (oPanel) { oPanel.setVisible(!oPanel.getVisible()); }
        },

        onNavSelect: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            if (!oItem) { return; }
            var mRoutes = { home: "home", worklist: "worklist", analytics: "analytics" };
            var sKey = oItem.data("navKey");
            if (mRoutes[sKey]) {
                this._oRouter.navTo(mRoutes[sKey]);
            }
        },

        onGlobalSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            if (sQuery) { this._oRouter.navTo("worklist"); }
        },

        onAvatarPress: function () {
            this._oRouter.navTo("object", { employeeId: "E001" });
        }
    });
});
