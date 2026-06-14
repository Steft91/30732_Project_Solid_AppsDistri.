# Proyecto SOLID - Refactorización Arquitectónica

Este proyecto corresponde al autónomo de refactorización de código desde la perspectiva arquitectónica y resiliencia transaccional. El objetivo fue partir de un sistema con violaciones a principios SOLID y aplicar mejoras para obtener un código más organizado, mantenible y extensible.

## Metodología de trabajo

Se trabajó con Aprendizaje Basado en Problemas (ABP), aplicando refactorización progresiva sobre un sistema con violaciones a principios SOLID.

Cada principio fue trabajado en una rama independiente:

- feature/01-srp
- feature/02-ocp
- feature/03-lsp
- feature/04-isp
- feature/05-dip
- feature/06-transactional-resilience

Los commits siguen el estándar Conventional Commits:

- refactor(srp): separar logica de productos y servicio de notificaciones
- refactor(ocp): implementar adaptador http para desacoplar axios
- refactor(lsp): usar abstraccion de vehiculos para permitir sustitucion
- refactor(isp): segregar interfaz bird en capacidades especificas
- refactor(dip): inyectar dependencia de base de datos mediante interfaz
- refactor(transactional): agregar outbox para notificaciones pendientes

## Principios aplicados

### 1. SRP - Principio de Responsabilidad Única

Inicialmente, `ProductBloc` tenía varias responsabilidades: cargar productos, guardar productos y enviar notificaciones por correo.
Se refactorizó separando estas responsabilidades en clases específicas:

* `ProductService`: encargado de la persistencia de productos.
* `Mailer`: encargado del envío de correos.
* `ProductBloc`: encargado de coordinar el flujo usando dependencias externas.

También se aplicó inyección de dependencias para reducir el acoplamiento entre clases.

### 2. OCP - Principio de Abierto/Cerrado

En `news-service.ts`, los servicios dependían directamente de `axios`, lo que obligaba a modificar el código si se quería cambiar el cliente HTTP.
Se creó la interfaz `HttpClient` y una implementación `FetchHttpClient`.

Con este cambio, `NewsService` y `PhotosService` pueden usar distintos clientes HTTP sin modificar su código interno.

### 3. LSP - Principio de Sustitución de Liskov

En `vehicle-manager.ts`, el código usaba `instanceof` para identificar marcas específicas de vehículos.
Se creó la interfaz `Vehicle` con el método `getDetails()`.

Ahora cada vehículo implementa su propio comportamiento y `VehicleManager` trabaja con `Vehicle[]`, permitiendo sustituir cualquier vehículo sin modificar el administrador.

### 4. ISP - Principio de Segregación de Interfaces

En `bird-catalog.ts`, existía una interfaz `Bird` que obligaba a todas las aves a implementar métodos como `eat`, `fly` y `swim`, aunque no todas podían hacerlo.
Se dividió la interfaz en capacidades específicas:

* `Eatable`
* `Flyable`
* `Swimmable`

De esta forma, cada ave implementa únicamente las capacidades que realmente posee.

### 5. DIP - Principio de Inversión de Dependencias

En `post-service.ts`, `PostService` dependía directamente de `LocalDatabaseService`.
Se creó la interfaz `PostRepository`, implementada por:

* `LocalDatabaseService`
* `JsonDatabaseService`

Ahora `PostService` recibe el repositorio por constructor, permitiendo cambiar la fuente de datos sin modificar su lógica interna.

## Resiliencia transaccional

Se agregó una mejora de resiliencia transaccional en el registro de productos.

El flujo aplicado fue:

1. Validar que el producto no exista.
2. Guardar primero el producto.
3. Enviar el correo solo después de confirmar el guardado.
4. Capturar por separado errores de persistencia y errores de notificación.
5. Mantener el producto guardado aunque falle el correo.
6. Registrar la notificación fallida como pendiente mediante `NotificationOutbox`.

Esta solución permite que una falla secundaria, como el envío de correo, no afecte la operación principal del sistema.

## Bitácora de reflexión

### SRP

Si mañana decidimos notificar por WhatsApp en lugar de Email, antes habría que modificar `ProductBloc`, porque ahí mismo estaba la lógica de notificación junto con la lógica de productos. Ahora sería más simple, porque solo tendría que agregar o cambiar el servicio de notificación, sin tocar `ProductService` ni la persistencia de productos.

### OCP

Si se detecta una vulnerabilidad en `axios` y toca migrar a `fetch`, con el diseño anterior habría que modificar directamente los servicios que usaban `axios`. Con el refactor, el cambio sería más rápido porque `NewsService` y `PhotosService` dependen de `HttpClient`, así que solo se cambia o agrega otra implementación como `FetchHttpClient`.

### LSP

Si la reserva adquiere un `Dron`, el manager sí podría procesarlo sin agregar nuevos `if` o `else`, siempre que `Dron` implemente la interfaz `Vehicle` y tenga su método `getDetails()`. Así `VehicleManager` no necesita saber qué tipo exacto de vehículo está usando.

### ISP

Este diseño evita que un `Pingüino` tenga un método `fly()` que lance errores porque ya no existe una interfaz grande que obligue a todas las aves a volar. El pingüino podría implementar solo las capacidades que sí tiene, por ejemplo `Eatable` y `Swimmable`.

### DIP

Ahora sería más fácil inyectar un `MockDatabase` para pruebas unitarias porque `PostService` ya no crea directamente un `LocalDatabaseService`. Solo necesita recibir algo que cumpla con la interfaz `PostRepository`, entonces puedo probar el servicio con una base simulada sin cambiar su código.


## Ejecución del proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Luego abrir el enlace local generado por Vite, normalmente:

```bash
http://localhost:5173
```

## Evidencia de refactorización

Los cambios fueron organizados en commits independientes para mostrar el proceso de mejora del código paso a paso, aplicando SRP, OCP, LSP, ISP, DIP y resiliencia transaccional.
