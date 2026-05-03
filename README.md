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

## 🛠️ Estándares de Desarrollo

### 1. Convención de Commits

Seguimos Conventional Commits:

* `feat`: Nueva funcionalidad
* `fix`: Corrección de errores
* `perf`: Mejora de rendimiento
* `build`: Cambios de build/deploy
* `ci`: Integración continua
* `docs`: Documentación
* `refactor`: Refactorización
* `style`: Formato (no lógica)
* `test`: Pruebas

### 2. Convención de Ramas

Formato: `tipo/descripcion-breve`

Ejemplos:

* `feat/task-form`
* `fix/kanban-drag-drop`
* `style/design-system`

### 3. Flujo de Trabajo

```bash
git checkout -b feat/nueva-feature
git commit -m "feat: descripción clara"
git push origin feat/nueva-feature
```

Proceso:

1. Crear rama desde `main` o `develop`
2. Subir cambios
3. Crear Pull Request
4. Review
5. Merge a `develop`
6. Luego a `main` (producción)

---

## 🤝 Contribuciones

Proyecto privado / uso personal. Para contribuciones:

* Crear rama siguiendo las convenciones
* PR con descripción clara de los cambios
* Pasar pruebas (`ng test`)
* Review de código requerido

---

## ⚖️ Licencia

Privado - Uso interno / Personal

---

## 📧 Contacto / Créditos

Desarrollador: Jaisson De Alba Santos
