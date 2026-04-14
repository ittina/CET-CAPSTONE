let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// TAB SWITCHING
function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

// RENDER TABLE
function renderTable() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";

  inventory.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td contenteditable="true" oninput="updateCell(${index}, 'name', this.innerText)">${item.name}</td>
      <td contenteditable="true" oninput="updateCell(${index}, 'qty', this.innerText)">${item.qty}</td>
      <td contenteditable="true" oninput="updateCell(${index}, 'location', this.innerText)">${item.location}</td>
      <td><button onclick="deleteRow(${index})">❌</button></td>
    `;

    tbody.appendChild(row);
  });

  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// ADD ROW
function addRow() {
  inventory.push({ name: "New Item", qty: "1", location: "Pantry" });
  renderTable();
}

// DELETE ROW
function deleteRow(index) {
  inventory.splice(index, 1);
  renderTable();
}

// UPDATE CELL
function updateCell(index, field, value) {
  inventory[index][field] = value;
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// QR GENERATION
QRCode.toCanvas(document.getElementById("qrcode"), window.location.href);

// QR SCANNER
function startScanner() {
  const qr = new Html5Qrcode("reader");

  qr.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      window.location.href = decodedText;
    }
  );
}

startScanner();

// INIT
renderTable();
showTab('inventory');