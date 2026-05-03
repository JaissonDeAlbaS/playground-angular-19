# AGENTS.md

## CORE PRINCIPLES

1. DEPENDENCY FIRST: Antes de sugerir o instalar cualquier librería externa, consulta SIEMPRE el package.json. Utiliza lo que ya está disponible. No instales paquetes nuevos a menos que sea estrictamente necesario y solicitado explícitamente.

2. TAILWIND-CENTRIC: Todo el estilo debe realizarse exclusivamente con Tailwind CSS v3. No utilices CSS puro ni preprocesadores a menos que Tailwind no pueda resolver la necesidad técnica.

3. DESIGN SYSTEM FIRST: Al recibir un requerimiento general (ej. "Crea un Todo List" o un sistema completo), NO escribas lógica de inmediato. Primero, define un SISTEMA DE DISEÑO (paleta de colores, tipografía, escalas de espaciado, estados) y luego construye los componentes basados en ese sistema.

4. ATOMIC DESIGN: La arquitectura de componentes debe seguir estrictamente la metodología de Atomic Design.

---

## TECH STACK & ENVIRONMENT

- Framework: Angular 19 (Standalone Components).
- Styling: Tailwind CSS v3 (CRÍTICO: No usar v4, ya que no escanea correctamente templates inline en archivos .ts).
- Testing: Karma + Jasmine (ng test).
- Build: Angular CLI.
- Config: Strict mode habilitado, moduleResolution: "bundler".

---

## COMPONENT ARCHITECTURE (ATOMIC DESIGN)

Todos los componentes deben residir en `src/app/components/` bajo la siguiente estructura jerárquica:

1. ATOMS: Componentes básicos e indivisibles (botones, inputs, labels, iconos).
2. MOLECULES: Grupos de átomos que funcionan como una unidad funcional (un campo de búsqueda con su botón, un item de una lista).
3. ORGANISMS: Secciones complejas de la interfaz compuestas por moléculas y/o átomos (Header, Sidebar, Cards dinámicas, Formularios complejos).
4. TEMPLATES: Estructuras de página (Layouts) que organizan los organismos sin lógica de datos real.
5. PAGES: Instancias específicas de los templates conectadas a servicios y lógica de negocio.

---

## WORKFLOW: FROM SYSTEM TO CODE

Cuando se solicite un sistema o funcionalidad nueva:

1. DEFINIR TOKENS: Especificar clases de Tailwind para colores primarios, secundarios, estados (error, success, warning) y escalas.
2. CONSTRUIR ÁTOMOS: Crear los elementos base asegurando que sean 100% reutilizables y parametrizados.
3. ENSAMBLAR: Subir en la escala atómica (moléculas -> organismos) hasta completar la funcionalidad.

---

## CRITICAL NOTES & TROUBLESHOOTING

- INLINE TEMPLATES: El proyecto utiliza `template: `` dentro de los archivos .ts. La configuración de Tailwind v3 debe escanear estos archivos ("./src/**/*.{html,ts}").
- PROJECT MISMATCH: El nombre en package.json es "playground-angular-21", pero el directorio físico es "playground-angular-19". El output del build es "dist/playground-angular-21".
- TESTING: Los archivos *.spec.ts deben actualizarse junto con el componente. Si se modifica un componente, se debe asegurar que sus pruebas pasen.

---

## COMMON COMMANDS

- ng serve: Servidor de desarrollo.
- ng build --watch --configuration development: Build en modo observación.
- ng test: Ejecutar suite de pruebas con Karma.
- ng generate component components/atoms/[nombre]: Crear un nuevo átomo.

---

## DESIGN SYSTEM DOCUMENTATION

### Tailwind Config (tailwind.config.js)

El Design System utiliza las siguientes extensiones de Tailwind v3:

**Colores:**
- `slate`: Escala completa (50-900) - Para superficies, texto secundario
- `emerald`: Escala completa (50-900) - Color primario, acciones positivas
- `red`: Escala completa (50-900) - Errores, acciones destructivas
- `amber`: Escala completa (50-900) - Advertencias, estados pendientes
- `blue`: Escala completa (50-900) - Información, enlaces

**Sombras Personalizadas:**
- `shadow-card`: Sombra sutil para tarjetas (`0 1px 3px 0 rgba(0, 0, 0, 0.1)`)
- `shadow-card-hover`: Sombra elevada al hover (`0 10px 15px -3px rgba(0, 0, 0, 0.1)`)
- `shadow-modal`: Sombra para modales (`0 20px 25px -5px rgba(0, 0, 0, 0.1)`)

**Transiciones:**
- `transition-smooth`: Duración de 300ms con easing `cubic-bezier(0.4, 0, 0.2, 1)`

**Espaciado adicional:**
- `spacing.128`: 32rem
- `spacing.144`: 36rem

### Estructura de Componentes (Atomic Design)

#### Átomos (Atoms)
Componentes básicos e indivisibles ubicados en `src/app/components/design-system/atoms/`:

1. **ButtonComponent** (`atoms/button/`)
   - Selector: `app-button`
   - Inputs:
     - `variant`: 'primary' | 'secondary' | 'ghost' | 'danger' (default: 'primary')
     - `size`: 'sm' | 'md' | 'lg' (default: 'md')
     - `disabled`: boolean (default: false)
     - `type`: string (default: 'button')
   - Outputs: `click`
   - Clases Tailwind: `bg-emerald-600`, `bg-slate-700`, `bg-red-600`, hover states

2. **BadgeComponent** (`atoms/badge/`)
   - Selector: `app-badge`
   - Inputs:
     - `color`: 'slate' | 'emerald' | 'red' | 'amber' (default: 'slate')
     - `text`: string
   - Usado para mostrar estados de tareas con colores semánticos

3. **InputComponent** (`atoms/input/`)
   - Selector: `app-input`
   - Inputs:
     - `type`, `placeholder`, `value`, `disabled`, `required`, `id`
   - Outputs: `valueChange`, `blur`, `focus`
   - Clases: `bg-slate-800`, `border-slate-600`, `text-slate-100`, `focus:ring-emerald-500`

4. **CardComponent** (`atoms/card/`)
   - Selector: `app-card`
   - Inputs:
     - `hoverable`: boolean (default: false)
     - `padding`: boolean (default: true)
   - Clases: `bg-slate-800`, `border-slate-700`, `shadow-card`

5. **ModalOverlayComponent** (`atoms/modal-overlay/`)
   - Selector: `app-modal-overlay`
   - Inputs:
     - `visible`: boolean (default: false)
     - `title`: string
   - Outputs: `close`
   - Clases: `bg-slate-900/80`, `backdrop-blur-sm`, `shadow-modal`

#### Moléculas (Molecules)
Grupos de átomos que funcionan como una unidad funcional en `src/app/components/design-system/molecules/`:

1. **FormFieldComponent** (`molecules/form-field/`)
   - Selector: `app-form-field`
   - Inputs:
     - `label`: string
     - `error`: string
     - `required`: boolean (default: false)
     - `for`: string
   - Outputs: `labelClick`
   - Envuelve inputs con etiqueta y mensaje de error
   - Proyecta contenido (ng-content) para el input

2. **TaskCardComponent** (`molecules/task-card/`)
   - Selector: `app-task-card`
   - Inputs:
     - `task`: Task (requerido)
     - `statusColor`: string
   - Outputs: `edit`, `delete`
   - Utiliza: `app-card`, `app-badge`
   - Maneja fechas de vencimiento (overdue, due soon)
   - Botones de editar/eliminar visibles al hover

#### Organismos (Organisms)
Secciones complejas de la interfaz (vacío por ahora).

### Barrel File
Todos los componentes se exportan en `src/app/components/design-system/index.ts`:
```typescript
export { ButtonComponent, type ButtonVariant, type ButtonSize } from './atoms/button/button.component';
export { BadgeComponent, type BadgeColor } from './atoms/badge/badge.component';
export { InputComponent } from './atoms/input/input.component';
export { CardComponent } from './atoms/card/card.component';
export { ModalOverlayComponent } from './atoms/modal-overlay/modal-overlay.component';
export { FormFieldComponent } from './molecules/form-field/form-field.component';
export { TaskCardComponent } from './molecules/task-card/task-card.component';
```

### Uso en otros componentes:
```typescript
import { ButtonComponent, BadgeComponent } from '../../components/design-system';

@Component({
  imports: [ButtonComponent, BadgeComponent]
})
export class MyComponent {}
```

### Testing
Cada componente incluye su archivo `.spec.ts` con pruebas Jasmine:
- Verificación de creación
- Pruebas de inputs y outputs
- Pruebas de clases condicionales
- Pruebas de eventos del DOM