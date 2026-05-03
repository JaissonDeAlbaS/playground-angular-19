# 📦 Kanban Board IA

Aplicación moderna de gestión de tareas con metodología Kanban, diseñada para equipos de desarrollo que necesitan organizar su flujo de trabajo de manera visual e intuitiva.

Desarrollo: [tablero-kanban-ia](tablero-kanban-ia.netlify.app/)

---

## 📖 Descripción

Aplicación de tablero Kanban interactiva que permite gestionar tareas mediante un sistema de columnas con drag-and-drop:

* **Qué hace**: Gestión completa de tareas (crear, editar, eliminar, mover entre estados) con persistencia en localStorage
* **A quién está dirigido**: Desarrolladores y equipos que necesitan organizar tareas siguiendo metodologías ágiles
* **Qué valor aporta**: Interfaz moderna con design system propio, reactividad en tiempo real con Angular Signals, y arquitectura basada en Atomic Design

---

## ✨ Características

* ✅ **Drag & Drop**: Mueve tareas entre columnas (Por hacer, En progreso, Completado) de forma intuitiva
* ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar tareas con formularios validados
* ✅ **Vista Kanban y Backlog**: Alterna entre tablero visual y lista de tareas pendientes
* ✅ **Persistencia Local**: Las tareas se guardan automáticamente en localStorage
* ✅ **Design System**: Componentes reutilizables siguiendo Atomic Design (átomos, moléculas)
* ✅ **Fechas de vencimiento**: Seguimiento de tareas atrasadas y próximas a vencer
* ✅ **Responsive**: Interfaz adaptada con Tailwind CSS v3

---

## 🛠️ Tecnologías Utilizadas

* **Frontend**: Angular 19 (Standalone Components, Signals)
* **Estilos**: Tailwind CSS v3
* **Arquitectura**: Atomic Design (átomos, moléculas, organismos, templates, páginas)
* **Testing**: Karma + Jasmine
* **Almacenamiento**: localStorage (persistencia de tareas)
* **Gestor de paquetes**: npm

---

## 🚀 Instalación

Para ejecutar el proyecto en local:

1. Clonar el repositorio
   ```bash
   git clone [URL_REPOSITORIO]
   ```

2. Instalar dependencias
   ```bash
   npm install
   ```

3. Ejecutar el proyecto
   ```bash
   npm start
   ```

---

## 💻 Uso

* Acceder a `http://localhost:4200`
* Cambia entre vista **Kanban** y **Backlog** usando los botones superiores
* Haz clic en **"Nueva Tarea"** para crear una tarea
* Arrastra las tareas entre columnas para cambiar su estado
* Haz clic en los botones de editar/eliminar que aparecen al pasar el mouse sobre una tarea

---

## 📧 Contacto / Créditos

Desarrollador: Jaisson De Alba Santos

---

## 📚 Documentación Adicional

* [Código de Conducta](CODE_OF_CONDUCT.md)
* [Política de Seguridad](SECURITY.md)
* [Estándares de Desarrollo y Contribuciones](CONTRIBUTING.md)
* [Licencia](LICENSE)
