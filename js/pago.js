// js/pago.js

// ⚠️ Reemplaza esto con tu clave pública de Stripe (pk_test_...)
const stripe = Stripe("pk_test_51RPpIqP887cZ0SYDXoa5yqbk9ei5TxoFpWlm7w3I9lHaMONiXETJ5mig5PAcQucEY4tNSMy0TsdrDaDAMw87so8B00E7cVtflm");

document.querySelector("#btn-pagar")?.addEventListener("click", async () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const response = await fetch("http://localhost:4242/crear-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: carrito })
  });

  const data = await response.json();
  if (data.id) {
    stripe.redirectToCheckout({ sessionId: data.id });
  } else {
    alert("Error al crear sesión de pago.");
  }
});
