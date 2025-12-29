"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/error.tsx:11',message:'Error boundary triggered',data:{errorMessage:error.message,errorStack:error.stack,digest:error.digest},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-alma-dorado-claro mb-4">
        Algo salió mal
      </h2>
      <p className="text-alma-dorado-oscuro mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md hover:bg-alma-dorado-claro transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}

