const API_URL = "http://localhost:3000/gesfacturas"; 

document.addEventListener("DOMContentLoaded", () => {
    cargargesfacturas();
});

//  Función para cargar los gesfacturas en la tabla
function cargargesfacturas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("gesfacturasTabla");
            tabla.innerHTML = ""; // Limpiar la tabla antes de recargar
            
            data.forEach(gesfactura => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${gesfactura.id}</td>
                    <td>${gesfactura.productos_id}</td>
                    <td>${gesfactura.cantidades}</td>
                    <td>${gesfactura.precios}</td>
                    <td>${gesfactura.factura_id}</td>
                    <td>
                        <button onclick="editargesfactura('${gesfactura.id}', '${gesfactura.productos_id}', '${gesfactura.cantidades}', '${gesfactura.precios}', '${gesfactura.factura_id}')">✏️ Editar</button>
                        <button onclick="eliminargesfactura(${gesfactura.id})"> Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar detalle de factura:", error));
}


//  Función para agregar un nuevo gesfactura
document.getElementById("formgesfactura").addEventListener("submit", function(e) {
    e.preventDefault();
    const productos_id = document.getElementById("productos_id").value;
    const cantidades = document.getElementById("cantidades").value;
    const precios = document.getElementById("precios").value;
    const factura_id = document.getElementById("factura_id").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productos_id: productos_id, cantidades: cantidades, precios: precios, factura_id: factura_id })
    })
    .then(response => response.json())
    .then(() => {
        cargargesfacturas(); // Recargar la tabla
        this.reset(); // Limpiar formulario
    })
    .catch(error => console.error("Error al agregar gesfactura:", error));
});
// funcion buscar factura
fetch('/facturas')
      .then(response => response.json()) // Convertir la respuesta en JSON
      .then(data => {
        // Obtener el elemento select
        const select = document.getElementById('factura_id');
        
        // Limpiar el select
        select.innerHTML = '';
  
        // Agregar una opción predeterminada
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccionar ID factura';
        select.appendChild(defaultOption);
  
        // Agregar las opciones dinámicas basadas en los resultados
        data.forEach(client => {
          const option = document.createElement('option');
          option.value = client.id;
          option.textContent = client.id;
          select.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos de los facturas:', error);
      });
// funcion buscar productos
fetch('/productos')
      .then(response => response.json()) // Convertir la respuesta en JSON
      .then(data => {
        // Obtener el elemento select
        const select = document.getElementById('productos_id');
        
        // Limpiar el select
        select.innerHTML = '';
  
        // Agregar una opción predeterminada
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona un producto';
        select.appendChild(defaultOption);
  
        // Agregar las opciones dinámicas basadas en los resultados
        data.forEach(product => {
          const option = document.createElement('option');
          option.value = product.id;
          option.textContent = product.id;
          select.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos de los productos:', error);
      });
//  Función para eliminar un gesfactura
function eliminargesfactura(id) {
    if (confirm("¿Seguro que deseas eliminar este detalle de factura?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => cargargesfacturas()) // Recargar la tabla
        .catch(error => console.error("Error al eliminar gesfactura:", error));
    }
}

//  Función para abrir el modal y editar un gesfactura
function editargesfactura(id, productos_id, cantidades, precios, factura_id) {
    document.getElementById("editId").value = id;
    document.getElementById("editproductos_id").value = productos_id;
    document.getElementById("editcantidades").value = cantidades;
    document.getElementById("editprecios").value = precios;
    document.getElementById("editfactura_id").value = factura_id;
    
    document.getElementById("modal").style.display = "flex";
}

//  Función para actualizar un gesfactura
document.getElementById("btnActualizar").addEventListener("click", function() {
    const id = document.getElementById("editId").value;
    const productos_id = document.getElementById("editproductos_id").value;
    const cantidades = document.getElementById("editcantidades").value;
    const precios = document.getElementById("editprecios").value;
    const factura_id = document.getElementById("editfactura_id").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productos_id: productos_id, cantidades: cantidades, precios: precios, factura_id: factura_id })
    })
    .then(response => response.json())
    .then(() => {
        cargargesfacturas(); // Recargar la tabla
        document.getElementById("modal").style.display = "none"; // Cerrar el modal
    })
    .catch(error => console.error("Error al actualizar gesfactura:", error));
});

//  Cerrar el modal cuando se haga clic en la "X"
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});
