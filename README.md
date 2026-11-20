# AstralSight

AstralSight es un atlas astronómico interactivo construido con React, Vite y Material UI. El scroll recorre el Sistema Solar desde el Sol hasta Neptuno, muestra la distancia orbital aproximada y continúa hacia la nebulosa de Orión. Cada objeto tiene una galería de fotografías con sus créditos.

## Ejecución local

Se requiere Node.js 24 y npm.

```sh
npm ci
npm run dev
```

Abre la dirección local que muestre Vite. Para revisar el código y compilar la versión de producción:

```sh
npm run lint
npm run build
npm run preview
```

GitHub Actions ejecuta la instalación reproducible, el análisis de código y la compilación en cada subida a `main` y en las solicitudes de cambio dirigidas a esa rama.

## Cuentas predeterminadas

| Rol | Correo | Contraseña | Panel |
| --- | --- | --- | --- |
| Usuario | `observador@atlas.test` | `atlas2026` | Mis fotos |
| Administrador | `admin@atlas.test` | `atlas2026` | Moderación |

Son cuentas de prueba de la aplicación frontend. El registro, la sesión y los aportes se guardan en memoria durante la sesión del navegador y se reinician al recargar. La recuperación de contraseña simula la solicitud.

## Funcionalidades

- **Explorador celeste**. El scroll, el arrastre y las flechas recorren el mismo panorama. La escala visual está comprimida y las fichas incluyen galerías con zoom.
- **Mis fotos**. Permite seleccionar una imagen, revisar la vista previa, aportar datos de la observación y consultar su estado.
- **Moderación**. Permite revisar, aprobar o rechazar aportes. Las fotografías aprobadas aparecen en la galería pública del objeto.
- **Acceso**. Incluye inicio de sesión, registro y recuperación de contraseña dentro de la misma aplicación de una sola página.

## Organización

```text
src/
  features/
    auth/
    explorer/
    moderation/
    observations/
  shared/
public/
  atlas/
  pwa/
```

Cada funcionalidad agrupa sus páginas, componentes, lógica y datos según corresponda. El tema y los componentes compartidos de Material UI definen todos los estilos de la interfaz.

## Datos y fotografías

Las distancias planetarias se basan en el semieje mayor de las órbitas publicado por [NASA/JPL](https://ssd.jpl.nasa.gov/planets/approx_pos.html). La distribución panorámica es ilustrada. Las fotografías del catálogo indican su fuente y autoría en la ficha correspondiente.

El [panorama de la Vía Láctea](https://www.eso.org/public/images/eso0932a/) es de ESO/S. Brunier y se presenta en una versión monocromática bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
