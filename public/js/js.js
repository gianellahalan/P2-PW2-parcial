// Al cargar la página, pedimos los productos
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/productos");
    const data = await res.json();

    const container = document.getElementById("productos-container");
    data.forEach(prod => {
      const div = document.createElement("div");
      div.innerHTML = `  
        <img src="${prod.imagen}" class="imgProductos"/>
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <p>Precio: $${prod.precio}</p>
        <button class="agregar-carrito" data-id="${prod._id}><img src="/img/carrito.png" class="carritodeCompras">Comprar</button>
      `;
      container.appendChild(div);
    });

    container.addEventListener("click", async (e) => {
      if (e.target.classList.contains("agregar-carrito")) {
        const productoId = e.target.dataset.id;
        try {
          const res = await fetch("/api/carrito/agregar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer TU_TOKEN"
            },
            body: JSON.stringify({
              productoId: productoId,
              cantidad: 1
            })
          });

          const result = await res.json();
          if (res.ok) {
            alert("✅ Producto agregado al carrito");
          } else {
            alert("❌ Error: " + result.mensaje);
          }
        } catch (error) {
          console.error("❌ Error al agregar al carrito:", error);
        }
      }
    });

  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
  }
});