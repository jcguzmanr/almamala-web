# PR1: Setup Base del Proyecto

## Nombre del PR
**Setup Base del Proyecto - Next.js + TypeScript + Tailwind CSS + shadcn/ui**

## Objetivo del PR
Establecer la base técnica del proyecto Alma Mala PMV con todas las herramientas y configuraciones necesarias para comenzar el desarrollo. Este PR habilita el entorno de desarrollo y configura el stack tecnológico definido en el brief.

**Qué habilita:**
- Desarrollo local funcional con hot-reload
- Sistema de estilos con Tailwind CSS
- Componentes base reutilizables con shadcn/ui
- TypeScript con tipado estricto
- Preparación para deploy en Vercel

## Qué se implementa

### Configuración del Proyecto
1. **Next.js 14+ con App Router**
   - Inicialización del proyecto con `create-next-app`
   - Configuración de App Router (carpeta `app/`)
   - Página inicial básica (`app/page.tsx`)

2. **TypeScript**
   - Configuración de `tsconfig.json` con modo estricto
   - Tipos base definidos en `types/`
   - Sin `any` implícitos

3. **Tailwind CSS**
   - Instalación y configuración de Tailwind CSS v3+
   - Archivo `tailwind.config.ts` configurado
   - Importación de estilos base en `app/globals.css`
   - Configuración mobile-first

4. **shadcn/ui**
   - Instalación de shadcn/ui
   - Configuración de `components.json`
   - Setup de `lib/utils.ts` con función `cn()`
   - Estructura de carpeta `components/ui/` preparada

5. **Estructura de Carpetas**
   ```
   AlmaMalaWeb/
   ├── app/
   │   ├── layout.tsx
   │   ├── page.tsx
   │   └── globals.css
   ├── components/
   │   └── ui/          (preparado para componentes shadcn)
   ├── lib/
   │   └── utils.ts     (utilidades, función cn)
   ├── types/
   │   └── index.ts     (tipos base)
   ├── public/
   │   └── images/      (assets existentes)
   └── [archivos de configuración]
   ```

6. **Configuración para Vercel**
   - Archivo `vercel.json` básico (si necesario)
   - Configuración de variables de entorno en `.env.local.example`
   - `.gitignore` actualizado

7. **Dependencias Base**
   - `next`, `react`, `react-dom`
   - `typescript`, `@types/node`, `@types/react`, `@types/react-dom`
   - `tailwindcss`, `postcss`, `autoprefixer`
   - `class-variance-authority`, `clsx`, `tailwind-merge` (para shadcn)
   - `lucide-react` (iconos para shadcn)

## Qué NO se implementa

- Componentes de UI específicos del negocio (productos, carrito, etc.)
- Lógica de negocio o estado de aplicación
- Integraciones con APIs externas
- Sistema de routing avanzado
- Autenticación o usuarios
- Base de datos
- Funcionalidades de e-commerce

## Archivos afectados / creados

### Archivos de Configuración
- `package.json` - Dependencias del proyecto
- `tsconfig.json` - Configuración TypeScript estricta
- `next.config.js` / `next.config.mjs` - Configuración Next.js
- `tailwind.config.ts` - Configuración Tailwind CSS
- `postcss.config.js` - Configuración PostCSS
- `components.json` - Configuración shadcn/ui
- `.env.local.example` - Ejemplo de variables de entorno
- `.gitignore` - Archivos a ignorar en git
- `vercel.json` - Configuración Vercel (opcional)

### Archivos de Código Base
- `app/layout.tsx` - Layout raíz con metadata básica
- `app/page.tsx` - Página inicial simple (placeholder)
- `app/globals.css` - Estilos globales y Tailwind directives
- `lib/utils.ts` - Utilidades (función `cn` para clases)
- `types/index.ts` - Tipos base (vacío por ahora)

### Estructura de Carpetas
- `app/` - App Router de Next.js
- `components/` - Componentes React
- `components/ui/` - Componentes shadcn/ui
- `lib/` - Utilidades y helpers
- `types/` - Definiciones de tipos TypeScript
- `public/` - Assets estáticos (ya existe con `images/`)

## Checklist de verificación manual

### Instalación y Configuración
- [ ] Ejecutar `npm install` o `yarn install` sin errores
- [ ] Verificar que todas las dependencias se instalaron correctamente
- [ ] Confirmar que `node_modules/` contiene todas las dependencias necesarias

### Desarrollo Local
- [ ] Ejecutar `npm run dev` o `yarn dev`
- [ ] Verificar que el servidor inicia en `http://localhost:3000`
- [ ] Confirmar que la página inicial se muestra sin errores
- [ ] Verificar hot-reload: cambiar algo en `app/page.tsx` y ver reflejado automáticamente

### TypeScript
- [ ] Verificar que no hay errores de TypeScript (`npm run build` o `tsc --noEmit`)
- [ ] Confirmar que el modo estricto está activo (verificar `tsconfig.json`)
- [ ] Intentar usar `any` implícito y verificar que TypeScript lo rechaza

### Tailwind CSS
- [ ] Verificar que los estilos de Tailwind se aplican correctamente
- [ ] Agregar una clase Tailwind en `app/page.tsx` (ej: `className="text-blue-500"`)
- [ ] Confirmar que el estilo se aplica visualmente
- [ ] Verificar que `tailwind.config.ts` existe y está configurado

### shadcn/ui
- [ ] Verificar que `components.json` existe y tiene configuración correcta
- [ ] Verificar que `lib/utils.ts` existe con función `cn()`
- [ ] Intentar agregar un componente shadcn (ej: `npx shadcn-ui@latest add button`)
- [ ] Confirmar que el componente se crea en `components/ui/` correctamente

### Estructura de Carpetas
- [ ] Verificar que todas las carpetas base existen (`app/`, `components/`, `lib/`, `types/`)
- [ ] Confirmar que `public/images/` contiene los assets existentes
- [ ] Verificar que la estructura sigue las convenciones de Next.js App Router

### Build y Producción
- [ ] Ejecutar `npm run build` sin errores
- [ ] Verificar que se genera la carpeta `.next/`
- [ ] Ejecutar `npm start` y verificar que la build funciona correctamente
- [ ] Verificar que no hay warnings críticos en la build

### Git y Vercel
- [ ] Verificar que `.gitignore` incluye `.next/`, `node_modules/`, `.env.local`
- [ ] Confirmar que `.env.local.example` existe (sin valores sensibles)
- [ ] Verificar que `vercel.json` existe si es necesario para configuración específica

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ El proyecto se ejecuta localmente sin errores (`npm run dev`)
2. ✅ La build de producción funciona correctamente (`npm run build` && `npm start`)
3. ✅ Tailwind CSS está configurado y funcionando (verificable con clases de prueba)
4. ✅ shadcn/ui está instalado y se pueden agregar componentes base
5. ✅ TypeScript está en modo estricto y no hay errores de tipo
6. ✅ La estructura de carpetas sigue las convenciones de Next.js App Router
7. ✅ Todos los archivos de configuración están presentes y correctamente configurados
8. ✅ No hay dependencias faltantes o conflictos en `package.json`

**Criterio de éxito:** Un desarrollador puede clonar el repo, ejecutar `npm install` y `npm run dev`, y ver una página Next.js funcionando con Tailwind CSS y shadcn/ui listos para usar.


