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
      <td class="align-middle border">${producto.nombre}</td>
      <td class="align-middle border">$${producto.precio.toLocaleString()}</td>
      <td class="align-middle border">${producto.cantidad}</td>
      <td class="align-middle border">$${subtotal.toLocaleString()}</td>
      <td class="align-middle border">
        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Quitar</button>
      </td>
    `;

    contenedor.appendChild(fila);
  });

  totalContenedor.textContent = "$" + total.toLocaleString();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

renderizarCarrito();
