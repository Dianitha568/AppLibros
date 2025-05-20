const express = require("express");
const stripe = require("stripe")("Tsk_test_51RPpIqP887cZ0SYDoe9pyMwHMasqcuEnChm7fhW11GRLTTCFGn8SnaTCxStWQ617PqvIlvMnc65ZQEjMVMiWDIi300WHQMs3ZZ"); // Reemplaza con tu clave secreta de Stripe
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/crear-checkout", async (req, res) => {
  const items = req.body.items;

  const line_items = items.map(item => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.nombre
      },
      unit_amount: item.precio * 100 // en centavos
    },
    quantity: item.cantidad
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",

      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cart.html`,

      //success_url: "http://localhost:5500/success.html",
      //cancel_url: "http://localhost:5500/cart.html"
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log("Servidor backend Stripe corriendo en http://localhost:4242"));