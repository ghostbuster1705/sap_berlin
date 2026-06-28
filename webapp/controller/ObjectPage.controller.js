sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.ObjectPage", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("object").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sEmployeeId = oEvent.getParameter("arguments").employeeId;
            var oComponent = this.getOwnerComponent();
            var oEmployeesModel = oComponent.getModel();

            var fnShow = function () {
                var aEmployees = oEmployeesModel.getProperty("/Employees") || [];
                var oEmployee = aEmployees.find(function (e) { return e.ID === sEmployeeId; });
                if (!oEmployee) {
                    MessageBox.error("Mitarbeiter nicht gefunden.");
                    return;
                }
                this.getView().setModel(new JSONModel(oEmployee));
            }.bind(this);

            if (oEmployeesModel && oEmployeesModel.getProperty("/Employees")) {
                fnShow();
            } else {
                oEmployeesModel = new JSONModel();
                oEmployeesModel.loadData("model/mockdata/Employees.json", null, false, "GET", false, false, function () {
                    oComponent.setModel(oEmployeesModel);
                    fnShow();
                });
            }
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("worklist");
        },

        onSendEmail: function () {
            var sEmail = this.getView().getModel().getProperty("/Email");
            if (sEmail) {
                sap.m.URLHelper.redirect("mailto:" + sEmail, true);
            }
        },

        onCall: function () {
            var sPhone = this.getView().getModel().getProperty("/Mobile") ||
                this.getView().getModel().getProperty("/Phone");
            if (sPhone) {
                MessageToast.show("Anruf an " + sPhone);
            }
        },

        onManagerPress: function () {
            var sManagerId = this.getView().getModel().getProperty("/ManagerID");
            if (sManagerId) {
                UIComponent.getRouterFor(this).navTo("object", {
                    employeeId: sManagerId
                });
            }
        }
    });
});
