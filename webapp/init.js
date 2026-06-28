sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

    new ComponentContainer({
        name: "cornelsen.talent.portal",
        id: "container",
        settings: { id: "cornelsenTalentPortal" },
        async: true,
        height: "100%",
        componentCreated: function () {
            var oStatus = document.getElementById("bootStatus");
            if (oStatus) { oStatus.style.display = "none"; }
        },
        componentFailed: function (oEvent) {
            var oError = document.getElementById("bootError");
            var oStatus = document.getElementById("bootStatus");
            var sMsg = oEvent.getParameter("reason") || "Component konnte nicht geladen werden";
            if (oError) {
                oError.style.display = "block";
                oError.textContent = "FEHLER:\n" + sMsg;
            }
            if (oStatus) { oStatus.textContent = "❌ Fehler beim Laden"; }
        }
    }).placeAt("appContainer");
});
