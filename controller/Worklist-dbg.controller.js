sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function (Controller, JSONModel, Filter, FilterOperator, Sorter) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.Worklist", {
        onInit: function () {
            var oComponent = this.getOwnerComponent();
            if (!oComponent.getModel()) {
                var oModel = new JSONModel();
                oModel.loadData("model/mockdata/Employees.json");
                oComponent.setModel(oModel);
            }
            this._updateCount();
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("query") || "";
            this._sSearchQuery = sQuery;
            this._applyFilters();
        },

        applySearch: function (sQuery) {
            var oSearchField = this.byId("worklistSearch");
            if (oSearchField) { oSearchField.setValue(sQuery); }
            this._sSearchQuery = sQuery;
            this._applyFilters();
        },

        onFilterChange: function () { this._applyFilters(); },

        _applyFilters: function () {
            var aFilters = [];
            if (this._sSearchQuery) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("FullName", FilterOperator.Contains, this._sSearchQuery),
                        new Filter("Department", FilterOperator.Contains, this._sSearchQuery),
                        new Filter("Title", FilterOperator.Contains, this._sSearchQuery)
                    ],
                    and: false
                }));
            }
            var sDept = this.byId("departmentFilter").getSelectedKey();
            if (sDept) { aFilters.push(new Filter("Department", FilterOperator.EQ, sDept)); }
            var sLocation = this.byId("locationFilter").getSelectedKey();
            if (sLocation) { aFilters.push(new Filter("Location", FilterOperator.EQ, sLocation)); }
            var sStatus = this.byId("statusFilter").getSelectedKey();
            if (sStatus) { aFilters.push(new Filter("Status", FilterOperator.EQ, sStatus)); }

            var oBinding = this.byId("employeesTable").getBinding("items");
            oBinding.filter(aFilters);
            oBinding.sort(new Sorter("LastName", false));
            this._updateCount(oBinding);
        },

        _updateCount: function (oBinding) {
            var iCount = oBinding ? oBinding.getLength() : this.getView().getModel().getProperty("/Employees").length;
            this.byId("worklistCount").setText(this.getView().getModel("i18n").getResourceBundle().getText("worklistCount", [iCount]));
        },

        onItemPress: function (oEvent) {
            var sId = oEvent.getParameter("listItem").getBindingContext().getProperty("ID");
            this.getOwnerComponent().getRouter().navTo("object", { employeeId: sId });
        }
    });
});
