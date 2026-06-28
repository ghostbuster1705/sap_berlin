sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.Analytics", {
        onInit: function () {
            var oComponent = this.getOwnerComponent();
            if (!oComponent.getModel("dashboard")) {
                var oModel = new JSONModel();
                oModel.loadData("model/mockdata/Dashboard.json");
                oComponent.setModel(oModel, "dashboard");
            }
        }
    });
});
