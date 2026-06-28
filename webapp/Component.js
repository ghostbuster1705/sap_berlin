sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "cornelsen/talent/portal/model/models"
], function (UIComponent, JSONModel, Device, models) {
    "use strict";

    return UIComponent.extend("cornelsen.talent.portal.Component", {
        metadata: {
            manifest: "json",
            interfaces: ["sap.ui.core.IAsyncContentCreation"]
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(models.createAppModel(), "app");
            this.getRouter().initialize();
        }
    });
});
