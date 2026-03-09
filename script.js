const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table");
const WHATSAPP_NUMBER = "916003376741";

let total = 0;
let cart = {};
function filterSection(category) {
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

window.onload = function () {
  const tableText = document.getElementById("tableText");
  if (tableText) {
    tableText.innerText = tableNo
      ? "Table No: " + tableNo
      : "Table not found";
  }
};

function changeQty(item, price, change) {
  if (!cart[item]) cart[item] = 0;

  cart[item] += change;

  if (cart[item] < 0) {
    cart[item] = 0;
  }

  const qtySpan = document.getElementById(item + "Qty");
  if (qtySpan) {
    qtySpan.innerText = cart[item];
  }

  total = 0;

  for (let i in cart) {
    if (cart[i] > 0) {
      total += priceFromHTML(i) * cart[i];
    }
  }

  document.getElementById("total").innerText = total;

  showOrderList();
}

function priceFromHTML(item) {
  const element = document.querySelector(`[data-name="${item}"] h3`);
  if (!element) return 0;

  const match = element.innerText.match(/₹(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function showOrderList() {
  const list = document.getElementById("orderList");
  list.innerHTML = "";

  for (let item in cart) {
    if (cart[item] > 0) {
      const li = document.createElement("li");
      li.innerText = item + " x " + cart[item];
      list.appendChild(li);
    }
  }
}

function placeOrder() {
  if (!tableNo || total === 0) {
    alert("Please select items");
    return;
  }

  let message = "🧾 New Order\n";
  message += "Table No: " + tableNo + "\n\n";

  for (let item in cart) {
    if (cart[item] > 0) {
      message += item + " x " + cart[item] + "\n";
    }
  }

  message += "\nTotal: ₹" + total;

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}
