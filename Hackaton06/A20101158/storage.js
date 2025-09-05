// storage.js
export function loadRepairs() {
  return JSON.parse(localStorage.getItem("repairs") || "[]");
}

export function saveRepairs(repairs) {
  localStorage.setItem("repairs", JSON.stringify(repairs));
}

export function addRepair(repair) {
  const all = loadRepairs();
  all.push(repair);
  saveRepairs(all);
}

