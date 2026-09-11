"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import { CART_TEXTS } from "@/constants/texts";
import { getWhatsAppDisplayNumber } from "@/lib/app-config";
import type { WhatsAppHandoffMethod } from "@/lib/whatsapp-message";
import { sendOrderWithReceipt } from "@/lib/whatsapp-message";

interface OrderSentProps {
  orderId: string;
  method: WhatsAppHandoffMethod;
  fileIncluded: boolean;
  message: string;
  receipt: File;
  whatsappNumber: string;
}

export default function OrderSent({
  orderId,
  method,
  fileIncluded,
  message,
  receipt,
  whatsappNumber,
}: OrderSentProps) {
  const copy = CART_TEXTS.checkout.success;

  const handleReopen = async () => {
    await sendOrderWithReceipt(whatsappNumber, message, receipt);
  };

  return (
    <div
      className="p-6 md:p-8 bg-white/10 backdrop-blur-md rounded-md border border-alma-dorado-oscuro/20 shadow-lg space-y-5"
      style={{ backdropFilter: "blur(12px) saturate(150%)" }}
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-8 h-8 text-alma-dorado-claro" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-alma-dorado-claro">{copy.title}</h2>
      </div>

      <p className="text-alma-dorado-oscuro">
        {copy.order} <span className="font-semibold text-alma-dorado-claro">{orderId}</span>
      </p>

      <p className="text-alma-dorado-oscuro leading-relaxed">
        {fileIncluded ? copy.withFile : copy.withoutFile}
      </p>

      {method === "link" && (
        <p className="text-sm text-alma-dorado-oscuro/80">
          Chat: +51 {getWhatsAppDisplayNumber()}. Si el archivo no se adjuntó solo, pégalo o súbelo en ese hilo.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={handleReopen}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md font-semibold hover:bg-alma-dorado-claro transition-colors"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          {copy.again}
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-alma-dorado-oscuro text-alma-dorado-claro rounded-md font-semibold hover:bg-alma-dorado-oscuro/20 transition-colors"
        >
          {copy.catalog}
        </a>
      </div>
    </div>
  );
}
