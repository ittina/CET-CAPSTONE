let pantry = JSON.parse(localStorage.getItem("pantry")) || [];

// Display items
function renderList() {
  const list = document.getElementById("pantryList");
  list.innerHTML = "";

  pantry.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item}
      <button onclick="deleteItem(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("pantry", JSON.stringify(pantry));
}

// Add item
function addItem() {
  const input = document.getElementById("foodInput");
  const value = input.value.trim();

  if (value) {
    pantry.push(value);
    input.value = "";
    renderList();
  }
}

// Delete item
function deleteItem(index) {
  pantry.splice(index, 1);
  renderList();
}

// Generate QR code (link to THIS page)
const currentURL = window.location.href;

QRCode.toCanvas(document.getElementById("qrcode"), currentURL, function (error) {
  if (error) console.error(error);
});

// QR Scanner
function startScanner() {
  const html5QrCode = new Html5Qrcode("preview");

  html5QrCode.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {
      window.location.href = decodedText;
    },
    (error) => {
      console.warn(error);
    }
  );
}

startScanner();

// Initial render
renderList();