const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartEmail = document.getElementById("cart-email");
const cartWhatsapp = document.getElementById("cart-whatsapp");

const cart = [];

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);

const renderCart = () => {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty";
    emptyItem.textContent = "Aún no agregaste productos.";
    cartItems.appendChild(emptyItem);
    cartTotal.textContent = formatCurrency(0);
    updateCheckoutLinks();
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;

    const price = document.createElement("span");
    price.textContent = formatCurrency(item.price);

    li.appendChild(price);
    cartItems.appendChild(li);
  });

  cartTotal.textContent = formatCurrency(total);
  updateCheckoutLinks(total);
};

const updateCheckoutLinks = (total = 0) => {
  const itemsText = cart.length
    ? cart
        .map((item) => `- ${item.name} (${formatCurrency(item.price)})`)
        .join("\n")
    : "Sin productos";

  const message = `Hola, FrutyShop. Quiero comprar:\n${itemsText}\nTotal: ${formatCurrency(total)}.`;
  const encodedMessage = encodeURIComponent(message);

  const emailAddress = "correo@frutyshop.com";
  const whatsappNumber = "595XXXXXXXXX";

  cartEmail.href = `mailto:${emailAddress}?subject=Pedido%20FrutyShop&body=${encodedMessage}`;
  cartWhatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
};

const setupButtons = () => {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.target.closest(".product-card");
      if (!card) {
        return;
      }

      const name = card.dataset.product;
      const price = Number(card.dataset.price);

      cart.push({ name, price });
      renderCart();
    });
  });
};

setupButtons();
renderCart();
