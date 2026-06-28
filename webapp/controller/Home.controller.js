sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.Home", {
        onInit: function () {
            var oModel = new JSONModel();
            oModel.loadData("model/mockdata/Dashboard.json");
            this.getOwnerComponent().setModel(oModel, "dashboard");
        },

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
