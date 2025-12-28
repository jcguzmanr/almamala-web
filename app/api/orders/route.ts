import { NextResponse } from "next/server";
import type { OrderPayload } from "@/types/order";
import { validateOrderPayload } from "@/lib/order-validator";
import { generateOrderId } from "@/lib/order-id-generator";
import { sendOrderEmail } from "@/lib/email-service";

export async function POST(request: Request) {
  try {
    // Parsear body
    const body = await request.json();

    // Validar que no tenga orderId (se genera aquí)
    if (body.orderId) {
      return NextResponse.json(
        { ok: false, error: "orderId no debe ser enviado, se genera en el servidor" },
        { status: 400 }
      );
    }

    // Construir payload (sin orderId)
    const payload: Omit<OrderPayload, "orderId"> = {
      items: body.items,
      subtotal: body.subtotal,
      shipping: body.shipping,
      total: body.total,
      coupon: body.coupon,
      metadata: body.metadata,
    };

    // Validar payload
    const validation = validateOrderPayload(payload as OrderPayload);
    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, error: `Validación fallida: ${validation.errors.join(", ")}` },
        { status: 400 }
      );
    }

    // Generar orderId
    const orderId = generateOrderId();

    // Agregar orderId al payload
    const payloadWithId: OrderPayload = {
      ...payload,
      orderId,
    };

    // Enviar email/log
    try {
      await sendOrderEmail(orderId, payloadWithId);
    } catch (emailError) {
      // No fallar si el email falla, pero loguear
      console.error("Error al enviar email:", emailError);
    }

    // Retornar éxito
    return NextResponse.json({ ok: true, orderId }, { status: 200 });
  } catch (error) {
    console.error("Error en POST /api/orders:", error);

    // Manejar errores de parsing
    if (error instanceof SyntaxError || error instanceof TypeError) {
      return NextResponse.json(
        { ok: false, error: "Formato de datos inválido" },
        { status: 400 }
      );
    }

    // Error genérico del servidor
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Rechazar otros métodos
export async function GET() {
  return NextResponse.json({ ok: false, error: "Método no permitido" }, { status: 405 });
}

