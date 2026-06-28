sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function (Controller, UIComponent, Filter, FilterOperator, Sorter) {
    "use strict";

    return Controller.extend("cornelsen.talent.portal.controller.Worklist", {
        onInit: function () {
            this._aFilters = [];
            this._updateCount();
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("query") || "";
            this._sSearchQuery = sQuery;
            this._applyFilters();
        },

        applySearch: function (sQuery) {
            var oSearchField = this.byId("worklistSearch");
            if (oSearchField) {
                oSearchField.setValue(sQuery);
            }
            this._sSearchQuery = sQuery;
            this._applyFilters();
        },

        onFilterChange: function () {
            this._applyFilters();
        },

        _applyFilters: function () {
            var aFilters = [];

            if (this._sSearchQuery) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("FullName", FilterOperator.Contains, this._sSearchQuery),
                        new Filter("Department", FilterOperator.Contains, this._sSearchQuery),
                        new Filter("Title", FilterOperator.Contains, this._sSearchQuery),
                        new Filter("Email", FilterOperator.Contains, this._sSearchQuery)
                    ],
                    and: false
                }));
            }

            var sDept = this.byId("departmentFilter").getSelectedKey();
            if (sDept) {
                aFilters.push(new Filter("Department", FilterOperator.EQ, sDept));
            }

            var sLocation = this.byId("locationFilter").getSelectedKey();
            if (sLocation) {
                aFilters.push(new Filter("Location", FilterOperator.EQ, sLocation));
            }

            var sStatus = this.byId("statusFilter").getSelectedKey();
            if (sStatus) {
                aFilters.push(new Filter("Status", FilterOperator.EQ, sStatus));
            }

            var oTable = this.byId("employeesTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
            oBinding.sort(new Sorter("LastName", false));
            this._updateCount(oBinding);
        },

        _updateCount: function (oBinding) {
            var iCount;
            if (oBinding) {
                iCount = oBinding.getLength();
            } else {
                iCount = this.getView().getModel().getProperty("/Employees").length;
            }
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            this.byId("worklistCount").setText(oBundle.getText("worklistCount", [iCount]));
        },

        onItemPress: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var sEmployeeId = oItem.getBindingContext().getProperty("ID");
            UIComponent.getRouterFor(this).navTo("object", {
                employeeId: sEmployeeId
            });
        }
    });
});
