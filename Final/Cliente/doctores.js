// Función para obtener y mostrar doctores en el HTML
function loadDoctors(containerSelector) {
    // Seleccionamos el contenedor donde se mostrarán los doctores
    const container = document.querySelector(containerSelector);

    // Verificamos si el contenedor existe
    if (!container) {
        console.error(`Contenedor no encontrado: ${containerSelector}`);
        return;
    }

    // Llamada al servidor para obtener los doctores
    fetch('/doctores')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los doctores");
            }
            return response.json();
        })
        .then(doctores => {
            // Limpiamos el contenedor antes de llenarlo
            container.innerHTML = '';

            // Iteramos sobre los doctores y generamos el HTML dinámico
            doctores.forEach(doctor => {
                const doctorElement = document.createElement("div");
                doctorElement.classList.add("doctor");

                // Estructura del contenido para cada doctor
                doctorElement.innerHTML = `
                    <img src="${doctor.imagen}" alt="${doctor.nombre}">
                    <h3>${doctor.nombre}</h3>
                `;

                // Añadimos el doctor al contenedor
                container.appendChild(doctorElement);
            });
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = `<p>Error al cargar los doctores.</p>`;
        });
}

// Llamamos a la función después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    loadDoctors(".doctores"); // Especifica el selector del contenedor
});
