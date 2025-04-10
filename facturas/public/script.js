const API_URL = "http://localhost:3000/facturas"; 

document.addEventListener("DOMContentLoaded", () => {
    cargarfacturas();
});

//  Función para cargar los facturas en la tabla
function cargarfacturas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("FacturasTabla");
            tabla.innerHTML = ""; // Limpiar la tabla antes de recargar
            
            data.forEach(factura => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${factura.id}</td>
                    <td>${factura.fecha}</td>
                    <td>${factura.cliente_id}</td>
                    <td>
                        <button onclick="editarfactura('${factura.id}', '${factura.fecha}', '${factura.cliente_id}')">✏️ Editar</button>
                        <button onclick="eliminarfactura(${factura.id})"> Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar facturas:", error));
}


//  Función para agregar un nuevo factura
document.getElementById("formFactura").addEventListener("submit", function(e) {
    e.preventDefault();
    const fecha = document.getElementById("fecha").value;
    const cliente_id = document.getElementById("cliente_id").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha: fecha, cliente_id: cliente_id })
    })
    .then(response => response.json())
    .then(() => {
        cargarfacturas(); // Recargar la tabla
        this.reset(); // Limpiar formulario
    })
    .catch(error => console.error("Error al agregar factura:", error));
});
// funcion buscar cliente
fetch('/clientes')
      .then(response => response.json()) // Convertir la respuesta en JSON
      .then(data => {
        // Obtener el elemento select
        const select = document.getElementById('cliente_id');
        
        // Limpiar el select
        select.innerHTML = '';
  
        // Agregar una opción predeterminada
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona un cliente';
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
        console.error('Error al obtener los datos de los clientes:', error);
      });
//  Función para eliminar un factura
function eliminarfactura(id) {
    if (confirm("¿Seguro que deseas eliminar este factura?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => cargarfacturas()) // Recargar la tabla
        .catch(error => console.error("Error al eliminar factura:", error));
    }
}

//  Función para abrir el modal y editar un factura
function editarfactura(id, fecha, cliente_id) {
    document.getElementById("editId").value = id;
    document.getElementById("editfecha").value = fecha;
    document.getElementById("editcliente_id").value = cliente_id;
    
    document.getElementById("modal").style.display = "flex";
}

//  Función para actualizar un factura
document.getElementById("btnActualizar").addEventListener("click", function() {
    const id = document.getElementById("editId").value;
    const fecha = document.getElementById("editfecha").value;
    const cliente_id = document.getElementById("editcliente_id").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha: fecha, cliente_id: cliente_id })
    })
    .then(response => response.json())
    .then(() => {
        cargarfacturas(); // Recargar la tabla
        document.getElementById("modal").style.display = "none"; // Cerrar el modal
    })
    .catch(error => console.error("Error al actualizar factura:", error));
});

//  Cerrar el modal cuando se haga clic en la "X"
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});
