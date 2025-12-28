# Alma Mala Web - PMV

Web de venta para Alma Mala - Producto Mínimo Viable

## Stack Tecnológico

- **Next.js 14+** (App Router)
- **TypeScript** (modo estricto)
- **Tailwind CSS** (mobile-first)
- **shadcn/ui** (componentes base)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (opcional):
```bash
cp .env.local.example .env.local
# Editar .env.local con tus valores
```

3. Ejecutar en desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm start` - Inicia servidor de producción
- `npm run lint` - Ejecuta ESLint

## Estructura del Proyecto

```
AlmaMalaWeb/
├── app/              # App Router de Next.js
├── components/       # Componentes React
│   └── ui/          # Componentes shadcn/ui
├── lib/              # Utilidades y helpers
├── types/            # Definiciones de tipos TypeScript
├── public/           # Assets estáticos
│   └── images/       # Imágenes de productos
└── [config files]    # Archivos de configuración
```

## Desarrollo por PRs

Este proyecto se desarrolla siguiendo PRs incrementales documentados:
- PR1: Setup base ✅
- PR2: Catálogo de productos
- PR3: Carrito de compras
- PR4: Textos del carrito
- PR5: Construcción del pedido
- PR6: Registro del pedido
- PR7: Checkout por WhatsApp
- PR8: Estados y feedback

Ver archivos `PR*.md` para detalles de cada PR.

