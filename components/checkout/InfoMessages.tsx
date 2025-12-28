import { CART_TEXTS } from "@/constants/texts";

export default function InfoMessages() {
  return (
    <div className="space-y-6 p-6 bg-alma-dorado-claro/20 border border-alma-dorado-oscuro/30 rounded-lg">
      {/* Mensaje principal */}
      <div>
        <h3 className="font-semibold text-alma-dorado-oscuro mb-2">{CART_TEXTS.messages.whatsapp.title}</h3>
        <p className="text-sm text-alma-verde-profundo/90">{CART_TEXTS.messages.whatsapp.description}</p>
      </div>

      {/* Confirmación */}
      <div>
        <h3 className="font-semibold text-alma-dorado-oscuro mb-2">
          {CART_TEXTS.messages.confirmation.title}
        </h3>
        <p className="text-sm text-alma-verde-profundo/90">{CART_TEXTS.messages.confirmation.description}</p>
      </div>

      {/* Notas operativas */}
      <div className="pt-4 border-t border-alma-dorado-oscuro/30">
        <p className="text-sm text-alma-verde-profundo/90 mb-2">{CART_TEXTS.messages.operational.note1}</p>
        <p className="text-sm text-alma-verde-profundo/90">{CART_TEXTS.messages.operational.note2}</p>
      </div>
    </div>
  );
}

