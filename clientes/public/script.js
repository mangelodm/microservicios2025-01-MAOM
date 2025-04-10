const API_URL = "http://localhost:3000/Clientes"; 

document.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
});

//  Función para cargar los Clientes en la tabla
function cargarClientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("ClientesTabla");
            tabla.innerHTML = ""; // Limpiar la tabla antes de recargar
            
            data.forEach(cliente => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.ci}</td>
                    <td>${cliente.nombres}</td>
                    <td>${cliente.apellidos}</td>
                    <td>${cliente.sexo}</td>
                    <td>
                        <button onclick="editarcliente('${cliente.id}', '${cliente.ci}', '${cliente.nombres}', '${cliente.apellidos}', '${cliente.sexo}')">✏️ Editar</button>
                        <button onclick="eliminarcliente(${cliente.id})"> Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => console.error("Error al cargar Clientes:", error));
}

//  Función para agregar un nuevo cliente
document.getElementById("formCliente").addEventListener("submit", function(e) {
    e.preventDefault();
    const ci = document.getElementById("ci").value;
    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const sexo = document.getElementById("sexo").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ci: ci, nombres: nombres, apellidos: apellidos, sexo: sexo })
    })
    .then(response => response.json())
    .then(() => {
        cargarClientes(); // Recargar la tabla
        this.reset(); // Limpiar formulario
    })
    .catch(error => console.error("Error al agregar cliente:", error));
});

//  Función para eliminar un cliente
function eliminarcliente(id) {
    if (confirm("¿Seguro que deseas eliminar este cliente?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => cargarClientes()) // Recargar la tabla
        .catch(error => console.error("Error al eliminar cliente:", error));
    }
}

//  Función para abrir el modal y editar un cliente
function editarcliente(id, ci, nombres, apellidos, sexo) {
    document.getElementById("editId").value = id;
    document.getElementById("editCI").value = ci;
    document.getElementById("editNombres").value = nombres;
    document.getElementById("editApellidos").value = apellidos;
    document.getElementById("editSexo").value = sexo;
    
    document.getElementById("modal").style.display = "flex";
}

//  Función para actualizar un cliente
document.getElementById("btnActualizar").addEventListener("click", function() {
    const id = document.getElementById("editId").value;
    const ci = document.getElementById("editCI").value;
    const nombres = document.getElementById("editNombres").value;
    const apellidos = document.getElementById("editApellidos").value;
    const sexo = document.getElementById("editSexo").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ci: ci, nombres: nombres, apellidos: apellidos, sexo: sexo })
    })
    .then(response => response.json())
    .then(() => {
        cargarClientes(); // Recargar la tabla
        document.getElementById("modal").style.display = "none"; // Cerrar el modal
    })
    .catch(error => console.error("Error al actualizar cliente:", error));
});

//  Cerrar el modal cuando se haga clic en la "X"
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});
