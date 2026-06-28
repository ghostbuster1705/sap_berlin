sap.ui.define([
    "sap/ui/core/UIComponent",
    "cornelsen/talent/portal/model/models"
], function (UIComponent, models) {
    "use strict";

    return UIComponent.extend("cornelsen.talent.portal.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
            this.setModel(models.createAppModel(), "app");

            var oRouter = this.getRouter();
            setTimeout(function () {
                oRouter.initialize();
            }, 0);
        }
    });
});
