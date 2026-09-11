// Textos exactos del carrito según textocarrito.md

export const CART_TEXTS = {
  totals: {
    title: "Totales del carrito",
    subtotal: {
      label: "Subtotal",
      description: "Monto total de los productos seleccionados.",
    },
    shipping: {
      label: "Envío",
      description: "Selecciona una opción de entrega para tu pedido.",
    },
    total: {
      label: "Total",
      description: "Monto final del pedido.",
    },
  },
  shipping: {
    regular: {
      title: "Envío regular (3–7 días hábiles)",
      description: "Entrega estándar dentro del plazo indicado. Disponible de lunes a viernes.",
    },
    gratuito: {
      title: "Envío gratuito (3–7 días hábiles)",
      description: "Entrega sin costo adicional dentro del plazo indicado. Disponible de lunes a viernes.",
    },
    retiro: {
      title: "Retiro en Depósito",
      description:
        "Recoge tu pedido directamente en nuestro depósito una vez confirmado el pago. El retiro estará disponible en un plazo máximo de 48 horas después de la verificación del depósito.",
    },
  },
  coupon: {
    title: "Código de cupón",
    label: "Código de cupón",
    description: "Campo opcional para aplicar descuentos promocionales.",
    button: "Aplicar cupón",
    note: "(Opción disponible para futuras promociones.)",
  },
  checkout: {
    button: "Enviar pedido y comprobante por WhatsApp",
    continueInfo: {
      title: "Al continuar:",
      points: [
        "Vas a enviar el pedido y el comprobante de pago por WhatsApp.",
        "Confirmamos el pedido cuando validemos el depósito.",
        "Los tiempos de entrega se cuentan desde esa confirmación.",
      ],
    },
    receipt: {
      title: "Comprobante de pago",
      required: "Paga por Yape, Plin o transferencia y sube aquí el comprobante. Sin esa prueba no se envía el pedido.",
      emptyTitle: "Aún no hay comprobante",
      emptyHint: "JPG, PNG, WEBP o PDF. Máximo 8 MB. Puedes arrastrar el archivo o elegirlo del teléfono.",
      button: "Subir comprobante",
      replace: "Cambiar archivo",
      remove: "Quitar",
      success: "Comprobante listo para enviar",
    },
    success: {
      title: "Pedido listo",
      order: "Número de pedido",
      withFile: "Se abrió el menú para compartir. Elige WhatsApp: van el detalle del pedido y el comprobante.",
      withoutFile: "Se abrió el chat de Alma Mala y se descargó el comprobante. Adjúntalo en ese hilo si no aparece solo.",
      again: "Reabrir WhatsApp",
      catalog: "Volver al catálogo",
    },
  },
  messages: {
    whatsapp: {
      title: "Tu pedido se confirma por WhatsApp",
      description:
        "El chat lleva el detalle del pedido y el comprobante de pago. Coordinamos la entrega cuando validemos el depósito.",
    },
    confirmation: {
      title: "Confirmación del pedido",
      description:
        "Tu pedido se confirma cuando recibamos y validemos el comprobante de pago por WhatsApp.",
    },
    operational: {
      note1: "Los pedidos se procesan una vez confirmado el depósito.",
      note2: "Los tiempos de entrega comienzan a contarse desde la confirmación del pago.",
    },
  },
} as const;

