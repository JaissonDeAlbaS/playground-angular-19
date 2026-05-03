# 🤝 Contribuciones y Estándares de Desarrollo

## 🛠️ Estándares de Desarrollo

### 1. Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

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
