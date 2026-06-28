sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.Home", {
        onNavWorklist: function () {
            UIComponent.getRouterFor(this).navTo("worklist");
        },

        onNavAnalytics: function () {
            UIComponent.getRouterFor(this).navTo("analytics");
        },

        onEmployeePress: function () {
            UIComponent.getRouterFor(this).navTo("worklist");
        },

        onNewsPress: function () {
            MessageToast.show("Artikel wird geöffnet...");
        }
    });
});
