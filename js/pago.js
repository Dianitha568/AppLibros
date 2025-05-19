const stripe = Stripe("TU_CLAVE_PUBLICA");

document.querySelector("#btn-pagar")?.addEventListener("click", async () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  //const response = await fetch("https://tu-backend-ficticio.com/crear-checkout", {
  const response = await fetch("http://localhost:4242/crear-checkout", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: carrito })
  });

  const data = await response.json();
  stripe.redirectToCheckout({ sessionId: data.id });
});