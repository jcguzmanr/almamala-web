# PR2: Catálogo de Productos

## Nombre del PR
**Catálogo de Productos - Lectura de productos.json y Visualización Mobile-First**

## Objetivo del PR
Implementar la visualización del catálogo completo de productos Alma Mala, leyendo desde `productos.json` y mostrando todas las presentaciones disponibles de cada producto. Este PR habilita que los usuarios puedan ver el catálogo completo antes de agregar productos al carrito.

**Qué habilita:**
- Visualización del catálogo completo
- Base para agregar productos al carrito (PR3)
- Estructura de datos tipada para productos
- UI mobile-first para navegación del catálogo

## Qué se implementa

### Tipos TypeScript
1. **Tipos de Productos**
   - Tipo `Producto` basado en estructura de `productos.json`
   - Tipo `Presentacion` para items dentro de cada producto
   - Tipo `Categoria` para tipos de pisco (Italia, Quebranta, Mosto Verde, Damajuanas)
   - Tipo `ProductosData` para la estructura completa del JSON

2. **Estructura de Tipos**
   ```typescript
   // Ejemplo de estructura esperada
   type Presentacion = {
     volumen: string;
     precio: string;
     imagen: string;
   }
   
   type Producto = {
     categoria: string;
     tipoPisco: string;
     descripcion: string;
     disfrutaloEn: string;
     items: Presentacion[];
   }
   ```

### Lectura de Datos
1. **Función de Lectura**
   - Función para leer `productos.json` desde `/public` o importación directa
   - Validación básica de estructura de datos
   - Manejo de errores si el archivo no existe o está mal formado

2. **Servicio de Productos**
   - Función `getProductos()` que retorna productos tipados
   - Posible caché en memoria para evitar re-lecturas innecesarias

### Componentes UI
1. **Componente de Listado de Productos**
   - Componente `ProductosList` o `Catalogo` mobile-first
   - Grid o lista responsive que se adapta a móvil
   - Cada producto muestra:
     - Tipo de pisco (Italia, Quebranta, Mosto Verde, Damajuana)
     - Descripción corta
     - "Disfrútalo en" (sours, chilcanos, etc.)
     - Todas las presentaciones disponibles

2. **Componente de Tarjeta de Producto**
   - Componente `ProductoCard` reutilizable
   - Muestra información principal del producto
   - Lista todas las presentaciones (500ML, 750ML, 4L, etc.)
   - Muestra precios por presentación
   - Diseño mobile-first (stack vertical en móvil)

3. **Componente de Presentación**
   - Componente `PresentacionItem` para mostrar cada variante
   - Muestra volumen, precio e imagen
   - Preparado para futura interacción (agregar al carrito en PR3)

### Visualización de Imágenes
1. **Carga de Imágenes**
   - Uso de `next/image` para optimización
   - Mapeo correcto de nombres de imagen (`500ML`, `750ML`, `DAMAJUANA`) a archivos en `/public/images/`
   - Fallback si imagen no existe
   - Lazy loading para mejor performance

2. **Estructura de Imágenes**
   - Las imágenes se cargan desde `/public/images/`
   - Mapeo: `imagen: "500ML"` → `/images/500ML.png`
   - Soporte para diferentes formatos si existen

### Página del Catálogo
1. **Ruta Principal**
   - Página en `app/page.tsx` o `app/catalogo/page.tsx`
   - Muestra el listado completo de productos
   - Layout mobile-first con buen espaciado

2. **Estilos**
   - Uso de Tailwind CSS para diseño responsive
   - Colores según `colors.json` (opcional en este PR, puede ser básico)
   - Tipografía legible en móvil

## Qué NO se implementa

- Funcionalidad de agregar al carrito (PR3)
- Filtros o búsqueda de productos
- Detalle individual de producto (página separada)
- Persistencia de favoritos o historial
- Categorización avanzada o tags
- Sistema de stock o disponibilidad
- Precios dinámicos o descuentos
- Comparación de productos
- Carrito de compras
- Checkout o proceso de compra

## Archivos afectados / creados

### Tipos TypeScript
- `types/productos.ts` - Tipos para productos y presentaciones
- `types/index.ts` - Exportación de tipos (actualizado)

### Servicios / Utilidades
- `lib/productos.ts` - Función `getProductos()` para leer productos.json
- O alternativamente: importación directa en componentes si es más simple

### Componentes
- `components/productos/ProductosList.tsx` - Listado principal de productos
- `components/productos/ProductoCard.tsx` - Tarjeta individual de producto
- `components/productos/PresentacionItem.tsx` - Item de presentación (opcional, puede estar dentro de ProductoCard)

### Páginas
- `app/page.tsx` - Página principal con catálogo (actualizada)
- O `app/catalogo/page.tsx` - Si se prefiere ruta separada

### Estilos
- Posibles clases Tailwind adicionales en componentes
- No se crean archivos CSS separados (todo con Tailwind)

## Checklist de verificación manual

### Lectura de Datos
- [ ] Verificar que `productos.json` se lee correctamente
- [ ] Confirmar que todos los productos se cargan (Italia, Quebranta, Mosto Verde, Damajuanas)
- [ ] Verificar que no hay errores en consola al cargar productos
- [ ] Confirmar que la estructura de datos coincide con los tipos TypeScript

### Visualización en Móvil
- [ ] Abrir la página en un dispositivo móvil o modo responsive del navegador
- [ ] Verificar que todos los productos se muestran correctamente
- [ ] Confirmar que el diseño es legible y usable en móvil
- [ ] Verificar que no hay overflow horizontal (scroll horizontal no deseado)
- [ ] Confirmar que el espaciado es adecuado para touch

### Visualización en Desktop
- [ ] Verificar que el diseño se adapta bien a pantallas grandes
- [ ] Confirmar que el grid/listado se ve organizado
- [ ] Verificar que no hay elementos demasiado anchos o estrechos

### Información de Productos
- [ ] Verificar que cada producto muestra:
  - [ ] Tipo de pisco (Italia, Quebranta, etc.)
  - [ ] Descripción
  - [ ] "Disfrútalo en"
  - [ ] Todas las presentaciones disponibles
- [ ] Confirmar que los precios se muestran correctamente (formato "S/ XX")
- [ ] Verificar que los volúmenes se muestran correctamente (500 ML, 750 ML, etc.)

### Imágenes
- [ ] Verificar que las imágenes se cargan correctamente
- [ ] Confirmar que `500ML.png` se muestra para presentaciones de 500 ML
- [ ] Confirmar que `750ML.png` se muestra para presentaciones de 750 ML
- [ ] Confirmar que `DAMAJUANA.png` se muestra para damajuanas
- [ ] Verificar que hay fallback si una imagen no existe
- [ ] Confirmar que las imágenes usan `next/image` para optimización
- [ ] Verificar que las imágenes tienen alt text apropiado

### TypeScript
- [ ] Verificar que no hay errores de TypeScript (`npm run build`)
- [ ] Confirmar que los tipos están correctamente definidos
- [ ] Verificar que no hay `any` implícitos
- [ ] Confirmar que el autocompletado funciona en IDE

### Performance
- [ ] Verificar que la página carga rápidamente
- [ ] Confirmar que las imágenes usan lazy loading
- [ ] Verificar que no hay re-renders innecesarios
- [ ] Confirmar que el bundle size es razonable

### Casos Edge
- [ ] Probar si `productos.json` está vacío o mal formado (debe manejar error gracefully)
- [ ] Verificar comportamiento si falta una imagen
- [ ] Confirmar que productos sin presentaciones se manejan correctamente

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ Todos los productos de `productos.json` se muestran correctamente en la UI
2. ✅ Cada producto muestra todas sus presentaciones con precios correctos
3. ✅ Las imágenes se cargan correctamente desde `/public/images/`
4. ✅ El diseño es mobile-first y responsive (funciona bien en móvil y desktop)
5. ✅ Los tipos TypeScript están correctamente definidos y no hay errores
6. ✅ La lectura de `productos.json` funciona sin errores
7. ✅ No hay errores en consola del navegador
8. ✅ La página es accesible y legible

**Criterio de éxito:** Un usuario puede abrir la web en su móvil y ver claramente todos los productos Alma Mala disponibles con sus presentaciones y precios, sin errores y con buen diseño visual.


