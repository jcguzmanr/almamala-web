export const RECEIPT_MAX_BYTES = 8 * 1024 * 1024;

export const RECEIPT_ACCEPT =
  "image/jpeg,image/png,image/webp,image/heic,image/heif,image/jpg,application/pdf,.jpg,.jpeg,.png,.webp,.heic,.pdf";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif", "pdf"]);

export type ReceiptMetadata = {
  fileName: string;
  mimeType: string;
  size: number;
};

export type ReceiptValidation =
  | { ok: true }
  | { ok: false; error: string };

function extensionOf(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase() || "";
  if (fromName) return fromName;
  if (file.type === "application/pdf") return "pdf";
  if (file.type.includes("png")) return "png";
  if (file.type.includes("webp")) return "webp";
  if (file.type.includes("heic") || file.type.includes("heif")) return "heic";
  return "jpg";
}

export function isImageReceipt(file: File): boolean {
  return file.type.startsWith("image/") || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateReceiptFile(file: File | null | undefined): ReceiptValidation {
  if (!file) {
    return {
      ok: false,
      error: "Sube el comprobante de pago antes de enviar el pedido.",
    };
  }

  if (file.size <= 0) {
    return {
      ok: false,
      error: "No pudimos leer ese archivo. Prueba con otra captura.",
    };
  }

  if (file.size > RECEIPT_MAX_BYTES) {
    return {
      ok: false,
      error: "El archivo pesa más de 8 MB. Comprime la captura o sube otra.",
    };
  }

  const ext = extensionOf(file);
  const typeOk = ALLOWED_TYPES.has(file.type.toLowerCase());
  const extOk = ALLOWED_EXTENSIONS.has(ext);

  // Algunos móviles mandan type vacío; ahí validamos por extensión.
  if (!typeOk && !extOk) {
    return {
      ok: false,
      error: "Usa una imagen (JPG, PNG, WEBP) o un PDF.",
    };
  }

  return { ok: true };
}

export function receiptMetadata(file: File): ReceiptMetadata {
  return {
    fileName: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
  };
}

export function renameReceiptFile(file: File, orderId: string): File {
  const ext = extensionOf(file);
  const safeId = orderId.replace(/[^A-Za-z0-9-]/g, "");
  const name = `comprobante-${safeId}.${ext}`;
  return new File([file], name, {
    type: file.type || (ext === "pdf" ? "application/pdf" : "image/jpeg"),
    lastModified: file.lastModified,
  });
}

export function downloadReceiptFile(file: File): void {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyReceiptImageToClipboard(file: File): Promise<boolean> {
  if (!file.type.startsWith("image/") || !navigator.clipboard || !("ClipboardItem" in window)) {
    return false;
  }

  try {
    await navigator.clipboard.write([new ClipboardItem({ [file.type]: file })]);
    return true;
  } catch {
    return false;
  }
}
