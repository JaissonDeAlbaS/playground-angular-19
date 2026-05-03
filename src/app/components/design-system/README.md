# Design System - Angular 19 + Tailwind CSS v3

## Visión General
Sistema de diseño basado en Atomic Design con Angular 19 Standalone Components y Tailwind CSS v3.

## Estructura de Carpetas
```
src/app/components/design-system/
├── atoms/                    # Componentes básicos indivisibles
│   ├── button/              # ButtonComponent
│   ├── input/               # InputComponent
│   ├── badge/               # BadgeComponent
│   ├── card/                # CardComponent
│   └── modal-overlay/       # ModalOverlayComponent
├── molecules/               # Grupos funcionales de átomos
│   ├── form-field/          # FormFieldComponent
│   └── task-card/           # TaskCardComponent
├── organisms/               # Secciones complejas (vacío por ahora)
└── index.ts                 # Barrel file con todas las exportaciones
```

## Componentes Creados

### Átomos (Atoms)
1. **ButtonComponent** - `app-button`
   - Variantes: primary, secondary, ghost, danger
   - Tamaños: sm, md, lg
   - Manejo de disabled state

2. **BadgeComponent** - `app-badge`
   - Colores semánticos: slate, emerald, red, amber
   - Para mostrar estados de tareas

3. **InputComponent** - `app-input`
   - Inputs estándar con clases Tailwind
   - Eventos: valueChange, blur, focus

4. **CardComponent** - `app-card`
   - Contenedor con sombra y bordes
   - Opcionalmente hoverable

5. **ModalOverlayComponent** - `app-modal-overlay`
   - Overlay modal con backdrop blur
   - Manejo de tecla Escape

### Moléculas (Molecules)
1. **FormFieldComponent** - `app-form-field`
   - Envuelve inputs con label y error
   - Indicador de required

2. **TaskCardComponent** - `app-task-card`
   - Tarjeta de tarea completa
   - Manejo de fechas (overdue, due soon)
   - Botones de editar/eliminar

## Tailwind Config
Extensiones agregadas en `tailwind.config.js`:
- Colores: slate, emerald, red, amber, blue (escalas completas 50-900)
- Sombras: shadow-card, shadow-card-hover, shadow-modal
- Transiciones: transition-smooth (300ms)
- Espaciado: 128 (32rem), 144 (36rem)

## Testing
Todos los componentes incluyen pruebas Jasmine (.spec.ts):
- Verificación de creación
- Pruebas de inputs y outputs
- Pruebas de clases condicionales
- Pruebas de eventos del DOM

**Resultado:** 71 pruebas exitosas ✓

## Uso
```typescript
import { ButtonComponent, BadgeComponent } from '../../components/design-system';

@Component({
  imports: [ButtonComponent, BadgeComponent]
})
export class MyComponent {}
```

## Próximos Pasos
- Crear organismos cuando sea necesario
- Integrar componentes en kanban-board, task-form, backlog-list
- Documentar casos de uso específicos
