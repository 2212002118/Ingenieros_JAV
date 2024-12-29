# Proyecto: Sistema de Gestión de Citas Médicas

Este repositorio contiene un sistema básico de gestión de citas médicas. Incluye un cliente con HTML, CSS y JavaScript, y un servidor backend desarrollado con Node.js y Express. El sistema permite gestionar usuarios, doctores, especialidades médicas y citas.

---

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Dependencias y Configuración](#dependencias-y-configuración)
   - [Backend](#backend)
   - [Cliente](#cliente)
4. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
5. [Contribuciones](#contribuciones)
6. [Licencia](#licencia)

---

## Requisitos Previos

- **Node.js** y **npm** deben estar instalados en tu sistema.
- Asegúrate de tener la estructura de carpetas como se describe más abajo.
- Instala las dependencias necesarias para el backend y el cliente.

---

## Estructura del Proyecto

```
Proyecto/
├── Cliente/
│   ├── contactanos.css
│   ├── doctores.css
│   ├── inicio.css
│   ├── login.css
│   ├── contactanos.js
│   ├── doctores.js
│   ├── inicio.js
│   ├── login.js
│   ├── contactanos.html
│   ├── doctores.html
│   ├── inicio.html
│   ├── login.html
├── Servidor/
│   ├── server.js
│   ├── package.json
│   ├── citas.json
│   ├── doctores.json
│   ├── especialidades.json
│   ├── users.json
```

---

## Dependencias y Configuración

### Backend

1. **Instalar dependencias del servidor**:
   ```bash
   cd Servidor
   npm install express cors dotenv nodemailer axios
   ```

2. **Archivo `.env`**:
   Crea un archivo `.env` en la carpeta `Servidor` con las siguientes variables (opcional):
   ```
   HOST=127.0.0.1
   PORT=3000
   ```

3. **Iniciar el servidor**:
   ```bash
   npm start
   ```

---

### Cliente

El cliente utiliza las siguientes bibliotecas externas:

1. **MapLibre** para mapas:
   - Añade el siguiente enlace al archivo HTML:
     ```html
     <link href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css" rel="stylesheet">
     <script src="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js"></script>
     <script src="mapkick.js"></script>
     ```

2. **EmailJS** para envío de correos:
   - Añade los siguientes scripts en los archivos HTML que requieran enviar correos:
     ```html
     <script src="https://smtpjs.com/v3/smtp.js"></script>
     <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
     ```
   - Inicializa EmailJS en tu JavaScript:
     ```javascript
     emailjs.init('tu_ID_de_usuario'); // Reemplazar con tu ID de usuario
     ```

3. **Font Awesome** para iconos:
   - Añade el siguiente enlace en los archivos HTML para usar iconos:
     ```html
     <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
     ```

---

## Cómo Ejecutar el Proyecto

1. **Backend**:
   - Navega a la carpeta del servidor:
     ```bash
     cd Servidor
     ```
   - Instala las dependencias:
     ```bash
     npm install
     ```
   - Inicia el servidor:
     ```bash
     npm start
     ```

2. **Frontend**:
   - Abre los archivos HTML directamente en un navegador o sirve el cliente mediante un servidor estático.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un **issue** o un **pull request** con tus sugerencias.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.
```