const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido a la canasta");
}

document.querySelectorAll(".btn-add-cart").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const producto = {
      id: btn.dataset.id,
      nombre: btn.dataset.nombre,
      precio: parseFloat(btn.dataset.precio),
      cantidad: 1
    };
    agregarAlCarrito(producto);
  });
});