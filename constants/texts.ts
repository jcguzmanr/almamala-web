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
      title: "Retiro en oficina",
      description:
        "Recoge tu pedido directamente en nuestra oficina una vez confirmado el pago. El retiro estará disponible en un plazo máximo de 48 horas después de la verificación del depósito. Recibirás un mensaje de confirmación por WhatsApp antes de acercarte.",
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
    button: "Finalizar pedido en WhatsApp",
    continueInfo: {
      title: "Al continuar:",
      points: [
        "Tu pedido será enviado automáticamente a nuestro WhatsApp con el detalle completo.",
        "El proceso de pago se completará por WhatsApp.",
        "El depósito deberá enviarse por WhatsApp para validar y confirmar el pedido.",
      ],
    },
  },
  messages: {
    whatsapp: {
      title: "Tu pedido será atendido por WhatsApp",
      description:
        "Una vez enviado el pedido, coordinaremos contigo el pago y la entrega directamente por WhatsApp.",
    },
    confirmation: {
      title: "Confirmación del pedido",
      description:
        "Tu pedido será confirmado una vez que recibamos el comprobante de depósito por WhatsApp.",
    },
    operational: {
      note1: "Los pedidos se procesan una vez confirmado el depósito.",
      note2: "Los tiempos de entrega comienzan a contarse desde la confirmación del pago.",
    },
  },
} as const;

