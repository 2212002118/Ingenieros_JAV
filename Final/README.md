# Sistema de Gestión de Citas Médicas

Este proyecto es un sistema completo para la gestión de citas médicas. Incluye un cliente desarrollado en HTML, CSS y JavaScript, y un servidor backend construido con Node.js y Express. El objetivo es proporcionar una plataforma sencilla pero funcional para la administración de usuarios, doctores, especialidades médicas y citas.

---

## Tabla de Contenidos

1. [📖 Descripción del Proyecto](#descripción-del-proyecto)
2. [✨ Características Principales](#características-principales)
3. [⚙️ Requisitos Previos](#requisitos-previos)
4. [📂 Estructura del Proyecto](#estructura-del-proyecto)
5. [🚀 Guía de Instalación y Uso](#guía-de-instalación-y-uso)
6. [🛠️ Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [📜 Licencia](#licencia)

---

## 📖 Descripción del Proyecto

Este sistema permite:

- 🧑‍💻 Gestionar usuarios mediante login y registro.
- 🩺 Listar doctores con imágenes y especialidades.
- 📅 Consultar y administrar citas médicas.
- 🗺️ Integración con herramientas externas como MapLibre para mapas y EmailJS para envío de correos.

Es ideal para pequeñas clínicas o centros médicos que deseen gestionar sus operaciones de manera eficiente.

---

## ✨ Características Principales

### Cliente
- 🎨 **Interfaz intuitiva**: HTML, CSS y JavaScript con diseño responsivo.
- 🔐 **Gestión de usuarios**: Formulario de inicio de sesión y registro.
- 👩‍⚕️ **Visualización interactiva**: Listado dinámico de doctores y especialidades.
- 🌍 **Mapas interactivos**: Implementación con MapLibre.
- ✉️ **Envío de correos**: Configurado con EmailJS para contacto directo.

### Servidor
- 🖥️ **Backend robusto**: Construido con Node.js y Express.
- 🌐 **Endpoints REST**: Para usuarios, doctores y citas.
- 🔑 **Autenticación básica**: Login y registro de usuarios.
- 📂 **Gestión de datos**: Archivos JSON como base de datos local.

---

## ⚙️ Requisitos Previos

- 🟢 **Node.js** (versión 14 o superior).
- 📦 **npm** (gestor de paquetes de Node.js).
- 🌐 Navegador web actualizado.

---

## 📂 Estructura del Proyecto

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

## 🚀 Guía de Instalación y Uso

### Backend

1. **Configura el servidor**:
   ```bash
   cd Servidor
   npm install
   ```

3. **Inicia el servidor**:
   ```bash
   npm start
   ```

### Cliente

1. Abre los archivos HTML directamente en el navegador o utiliza un servidor estático como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

### Navegación

1. Accede al cliente en la raíz del proyecto (`inicio.html`).
2. El servidor estará disponible en `http://127.0.0.1:3000` por defecto.

---

## 🛠️ Tecnologías Utilizadas

### Cliente
- 🌐 **HTML/CSS/JavaScript**: Estructura, diseño y funcionalidad.
- 🗺️ **MapLibre**: Integración de mapas interactivos.
- ✉️ **EmailJS**: Gestión de correos electrónicos.
- 🎨 **Font Awesome**: Iconos visuales.

### Servidor
- 🟢 **Node.js**: Entorno de ejecución.
- ⚙️ **Express**: Framework para desarrollo web.
- 📂 **JSON**: Almacenamiento de datos.
- 🔒 **dotenv**: Gestión de variables de entorno.
- 🌐 **CORS**: Configuración de acceso entre dominios.

---

## 📜 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE). Siéntete libre de usarlo y modificarlo según tus necesidades.