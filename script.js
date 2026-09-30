document.getElementById("year").textContent = new Date().getFullYear();

// Cycle the "status" value in the hero code sample
const statuses = ['"building…"', '"shipping 🚀"', '"learning"', '"open to work"'];
const statusEl = document.getElementById("status");
let i = 0;
setInterval(() => {
  i = (i + 1) % statuses.length;
  statusEl.textContent = statuses[i];
}, 2000);
