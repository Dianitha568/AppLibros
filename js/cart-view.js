// js/cart-view.js
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.querySelector("#lista-carrito");
const totalContenedor = document.querySelector("#total-pagar");

function renderizarCarrito() {
  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>${producto.cantidad}</td>
      <td>$${subtotal.toLocaleString()}</td>
    `;
    contenedor.appendChild(fila);
  });

  totalContenedor.textContent = "$" + total.toLocaleString();
}

renderizarCarrito();
