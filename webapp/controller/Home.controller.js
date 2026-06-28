sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.Home", {
        onNavWorklist: function () {
            this.getOwnerComponent().getRouter().navTo("worklist");
        },

        onNavAnalytics: function () {
            this.getOwnerComponent().getRouter().navTo("analytics");
        },

        onEmployeePress: function () {
            this.getOwnerComponent().getRouter().navTo("worklist");
        }
    });
});
