# 🚀 Lappiz Chat Widget

Widget de chat conversacional desarrollado como Web Component para integrarse fácilmente en cualquier sitio web.

## 📋 Características

- ✅ **Web Component estándar** - Compatible con cualquier framework o sitio HTML
- ✅ **Self-contained** - No requiere dependencias externas
- ✅ **Shadow DOM** - Estilos completamente aislados
- ✅ **TypeScript** - Código tipado y seguro
- ✅ **Responsive** - Adaptado para móviles y desktop
- ✅ **CDN Ready** - Distribuido vía jsDelivr

## 🎯 Uso

### 1. Incluir el script desde CDN (GitHub + jsDelivr)

**Versión específica (recomendado para producción):**

```html
<script src="https://cdn.jsdelivr.net/gh/tu-usuario/lappiz-chat-widget@v1.0.0/dist/main.js"></script>
```

**Última versión (auto-actualizable):**

```html
<script src="https://cdn.jsdelivr.net/gh/tu-usuario/lappiz-chat-widget@latest/dist/main.js"></script>
```

### 2. Agregar el elemento HTML

```html
<lappiz-chat agent-key="tu-agent-key-aqui"> </lappiz-chat>
```

### 3. ¡Listo! 🎉

El widget aparecerá como un botón flotante en la esquina inferior derecha.

## 🔧 Atributos del Widget

| Atributo    | Tipo   | Requerido | Descripción                       | Default |
| ----------- | ------ | --------- | --------------------------------- | ------- |
| `agent-key` | string | ✅ Sí     | Clave de autenticación del agente | -       |

## 📝 Ejemplo Completo de Integración

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Sitio Web</title>
  </head>
  <body>
    <h1>Mi Página</h1>

    <!-- Widget de Lappiz -->
    <lappiz-chat agent-key="<your-agent-key>" color="#ff0000"> </lappiz-chat>

    <!-- Cargar desde jsDelivr CDN -->
    <script
      src="https://cdn.jsdelivr.net/gh/TU-USUARIO/lappiz-chat-widget@latest/dist/main.js"
      type="module"
    ></script>
  </body>
</html>
```

## 🐛 Solución de Problemas

**"Error al conectar con el agente"**

- Verifica que el `agent-key` sea válido
- Revisa la consola del navegador para más detalles

## 📄 Licencia

Este proyecto es privado y propiedad de Lappiz.
