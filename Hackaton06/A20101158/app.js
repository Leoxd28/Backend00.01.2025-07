// app.js
import { Phone } from "./models/Phone.js";
import { Repair } from "./models/Repair.js";
import { showSection, hiddenSection } from "./ui/visible_functions.js";
import { thecnicians_person } from "./data/thecnicians_person.js";
import { loadRepairs, addRepair } from "./storage.js";

let currentRepair = null;

// Muestra el primer formulario
showSection("register-repair-form");

// Enviar datos básicos de reparación
document.getElementById("send-repair").addEventListener("click", () => {
  const serial = document.getElementById("serial").value.trim();
  const imei   = document.getElementById("imei").value.trim();
  const brand  = document.getElementById("brand").value;

  if (!serial || !imei || !brand) {
    alert("Complete todos los campos.");
    return;
  }

  const phone = new Phone(serial, imei, brand);
  phone.checkElegibility();

  if (!phone.isElegible) {
    alert("Teléfono registrado como robado.");
    return;
  }

  currentRepair = new Repair(phone);
  hiddenSection("register-repair-form");
  showSection("first-diagnosis-section");
});

// Guardar diagnóstico y pago
document.getElementById("send-first-diagnosis").addEventListener("click", () => {
  const diag  = document.getElementById("first-diagnosis").value.trim();
  const auth  = document.getElementById("authorization").checked;
  const pay   = Number(document.getElementById("payment").value);

  if (!auth) {
    return alert("Se necesita autorización escrita.");
  }
  if (diag === "" || pay <= 0) {
    return alert("Ingrese diagnóstico válido y pago mayor a cero.");
  }

  currentRepair.confirmAuthorization(auth, pay);
  currentRepair.saveDiagnostic(diag);

  // Carga lista de técnicos según marca
  const select = document.getElementById("tech-select");
  select.innerHTML = `<option value="">Seleccione un técnico</option>`;

  thecnicians_person
    .filter(t => t.canRepair(currentRepair.phone.brand))
    .forEach(t => {
      const opt = document.createElement("option");
      opt.value       = t.id;
      opt.textContent = t.name;
      select.appendChild(opt);
    });

  hiddenSection("first-diagnosis-section");
  showSection("select-thecnician");
});

// Asignar técnico, partes y persistir
document.getElementById("send-tech").addEventListener("click", () => {
  const techId = document.getElementById("tech-select").value;
  const parts  = document.getElementById("parts").value.trim();

  if (!techId || parts === "") {
    return alert("Seleccione técnico y agregue partes.");
  }

  currentRepair.assignTechnician(techId);
  currentRepair.addPart(parts);
  addRepair(currentRepair);

  alert("Reparación creada correctamente.");
  currentRepair = null;

  hiddenSection("select-thecnician");
  showSection("register-repair-form");
  renderRepairsTable();
});

// Render inicial de la tabla
document.addEventListener("DOMContentLoaded", renderRepairsTable);

function renderRepairsTable() {
  const list    = loadRepairs();
  const tbody   = document.getElementById("repairs-table-body");
  const section = document.getElementById("repairs-table-section");

  tbody.innerHTML = "";

  if (list.length === 0) {
    section.classList.add("hidden");
    return;
  }

  section.classList.remove("hidden");

  list.forEach(r => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-blue-50";

    tr.innerHTML = `
      <td class="px-3 py-2">${r.id}</td>
      <td class="px-3 py-2">${r.phone.serial}</td>
      <td class="px-3 py-2">${r.phone.imei}</td>
      <td class="px-3 py-2 capitalize">${r.phone.brand}</td>
      <td class="px-3 py-2">${r.diagnosis}</td>
      <td class="px-3 py-2">${r.thecnician}</td>
      <td class="px-3 py-2">${r.parts.join(", ")}</td>
      <td class="px-3 py-2">${r.downPayment}</td>
      <td class="px-3 py-2 ${r.authorization ? "text-green-600" : "text-red-600"}">
        ${r.authorization ? "Sí" : "No"}
      </td>
    `;
    tbody.appendChild(tr);
  });
}
