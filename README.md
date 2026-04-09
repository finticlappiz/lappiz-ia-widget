# Lappiz Chat Widget

Widget de chat conversacional como Web Component para integrarse en cualquier sitio con un snippet fijo y auto-actualización controlada.

## Integración para clientes

El cliente solo integra este snippet y no vuelve a cambiarlo:

    <script src="https://tu-dominio.com/widget/loader.js" defer></script>

Luego agrega el componente en su HTML:

    <lappiz-chat agent-key="tu-agent-key-aqui"></lappiz-chat>

## Arquitectura de auto-actualización segura

1. loader.js se sirve en una URL estable: /widget/loader.js.
2. loader.js consulta /widget/manifest.json con cache: no-store.
3. manifest.json define la versión estable actual y la previousStable.
4. loader.js intenta cargar stable y, si falla, hace fallback a previousStable.
5. rollback rápido: solo se cambia manifest.json; el snippet del cliente no se toca.

## Ejemplo de manifest.json

Archivo en [public/widget/manifest.json](public/widget/manifest.json):

    {
      "schemaVersion": 1,
      "updatedAt": "2026-04-09T00:00:00.000Z",
      "stable": {
        "version": "v1.0.0",
        "path": "./versions/v1.0.0/main.js",
        "integrity": "sha384-REEMPLAZAR_EN_RELEASE"
      },
      "previousStable": {
        "version": "v0.9.0",
        "path": "./versions/v0.9.0/main.js",
        "integrity": "sha384-REEMPLAZAR_SI_EXISTE"
      },
      "release": {
        "channel": "stable",
        "notes": "Editar stable/previousStable permite rollback sin tocar clientes"
      }
    }

Notas:

- path puede ser relativo o absoluto.
- También soporta rutas con formato versionado por tag o hash, por ejemplo: https://cdn.ejemplo.com/widget@v1.2.3/main.js o https://cdn.ejemplo.com/widget/main.8f31ac2d.js.

## Ejemplo de loader.js

Archivo real en [public/widget/loader.js](public/widget/loader.js). Comportamiento:

1. Resuelve su base URL desde la etiqueta script cargada.
2. Consulta manifest.json con no-store.
3. Inyecta stable en un script dinámico.
4. Si falla stable, intenta previousStable.
5. Emite eventos de estado:

- window event lappiz:widget-loader:loaded
- window event lappiz:widget-loader:fallback
- window event lappiz:widget-loader:error

## Pipeline de release

Script de preparación: [prepare-release.js](prepare-release.js)

Qué genera:

- bundle inmutable por versión: dist/browser/widget/versions/vX.Y.Z/main.js
- manifest candidato: dist/browser/widget/manifest.json
- manifest de rollback: dist/browser/widget/manifest.rollback.json
- manifest.next para promover: public/widget/manifest.next.json

Comando:

    npm run prepare-release

## Checklist de despliegue en producción

1. Ejecutar build y preparar release.
2. Publicar artefacto inmutable de la nueva versión en /widget/versions/vX.Y.Z/main.js.
3. Publicar manifest.json apuntando stable a la nueva versión y previousStable a la anterior.
4. Purgar CDN para /widget/manifest.json y /widget/loader.js.
5. Ejecutar smoke test funcional en navegador real:

- El snippet fijo carga el widget.
- Se renderiza lappiz-chat.
- No hay errores JS en consola.
- En caso de simular fallo de stable, carga previousStable.

6. Si hay incidente, rollback inmediato:

- Publicar manifest.rollback.json como manifest.json.
- Purgar CDN de manifest.json.

## Atributos del widget

| Atributo  | Tipo   | Requerido | Descripción                       |
| --------- | ------ | --------- | --------------------------------- |
| agent-key | string | Sí        | Clave de autenticación del agente |

## Licencia

Proyecto privado y propiedad de Lappiz.
