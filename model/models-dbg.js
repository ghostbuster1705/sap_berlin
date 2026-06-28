sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        createAppModel: function () {
            var oModel = new JSONModel({
                layout: "OneColumn",
                selectedKey: "home",
                busy: false,
                notifications: 3
            });
            oModel.setDefaultBindingMode("TwoWay");
            return oModel;
        }
    };
});
