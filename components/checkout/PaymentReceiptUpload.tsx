"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, FileText, ImagePlus, Trash2, Upload } from "lucide-react";
import { CART_TEXTS } from "@/constants/texts";
import {
  RECEIPT_ACCEPT,
  formatFileSize,
  isImageReceipt,
  validateReceiptFile,
} from "@/lib/receipt";

interface PaymentReceiptUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string | null;
  onErrorClear?: () => void;
}

export default function PaymentReceiptUpload({
  file,
  onFileChange,
  error,
  onErrorClear,
}: PaymentReceiptUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const copy = CART_TEXTS.checkout.receipt;
  const displayError = error || localError;
  const isEmpty = !file;

  useEffect(() => {
    if (!file || !isImageReceipt(file)) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const applyFile = (next: File | null) => {
    if (!next) {
      setLocalError(null);
      onFileChange(null);
      onErrorClear?.();
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const validation = validateReceiptFile(next);
    if (!validation.ok) {
      setLocalError(validation.error);
      onFileChange(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setLocalError(null);
    onErrorClear?.();
    onFileChange(next);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(event.target.files?.[0] ?? null);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragOver(false);
    applyFile(event.dataTransfer.files?.[0] ?? null);
  };

  return (
    <section
      className="p-6 bg-white/10 backdrop-blur-md rounded-md border border-alma-dorado-oscuro/20 shadow-lg space-y-4"
      style={{ backdropFilter: "blur(12px) saturate(150%)" }}
    >
      <div>
        <h2 className="text-xl font-bold text-alma-dorado-oscuro">{copy.title}</h2>
        <p className="text-sm text-alma-dorado-oscuro/80 mt-1">{copy.required}</p>
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={RECEIPT_ACCEPT}
        className="sr-only"
        onChange={handleInput}
      />

      {isEmpty ? (
        <label
          htmlFor={inputId}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-3 min-h-[180px] px-4 py-8 rounded-md border-2 border-dashed cursor-pointer transition-colors ${
            dragOver
              ? "border-alma-dorado-claro bg-alma-dorado-claro/15"
              : displayError
              ? "border-red-400/70 bg-red-50/10"
              : "border-alma-dorado-oscuro/40 bg-alma-verde-profundo/20 hover:border-alma-dorado-claro/70"
          }`}
        >
          <span className="w-12 h-12 rounded-full bg-alma-dorado-oscuro/15 flex items-center justify-center">
            <ImagePlus className="w-6 h-6 text-alma-dorado-claro" aria-hidden="true" />
          </span>
          <span className="text-alma-dorado-claro font-semibold text-center">{copy.emptyTitle}</span>
          <span className="text-sm text-alma-dorado-oscuro/80 text-center max-w-sm">
            {copy.emptyHint}
          </span>
          <span className="mt-1 px-4 py-2 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md font-semibold">
            {copy.button}
          </span>
        </label>
      ) : (
        <div className="rounded-md border border-alma-dorado-oscuro/30 bg-alma-verde-profundo/30 p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-md overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 border border-alma-dorado-oscuro/20">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Vista previa del comprobante"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FileText className="w-8 h-8 text-alma-dorado-claro" aria-hidden="true" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="flex items-center gap-2 text-alma-dorado-claro font-semibold">
                <Check className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {copy.success}
              </p>
              <p className="text-sm text-alma-dorado-oscuro truncate mt-1">{file.name}</p>
              <p className="text-xs text-alma-dorado-oscuro/70">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md font-semibold hover:bg-alma-dorado-claro transition-colors"
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              {copy.replace}
            </button>
            <button
              type="button"
              onClick={() => applyFile(null)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-alma-dorado-oscuro text-alma-dorado-claro rounded-md font-semibold hover:bg-alma-dorado-oscuro/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              {copy.remove}
            </button>
          </div>
        </div>
      )}

      {displayError && (
        <p className="text-sm text-red-200 bg-red-950/40 border border-red-400/40 rounded-md px-3 py-2" role="alert">
          {displayError}
        </p>
      )}
    </section>
  );
}
