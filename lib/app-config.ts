import appConfig from "@/data/app-config.json";

export interface AppConfig {
  whatsapp: {
    number: string;
    displayNumber: string;
    fullNumber: string;
  };
  payment: {
    yape: {
      number: string;
      name: string;
    };
  };
}

/**
 * Obtiene la configuración de la aplicación
 */
export function getAppConfig(): AppConfig {
  return appConfig as AppConfig;
}

/**
 * Obtiene el número de WhatsApp completo (con código de país)
 */
export function getWhatsAppNumber(): string {
  const config = getAppConfig();
  // Priorizar variable de entorno si existe, sino usar configuración
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || config.whatsapp.fullNumber;
}

/**
 * Obtiene el número de WhatsApp para mostrar
 */
export function getWhatsAppDisplayNumber(): string {
  const config = getAppConfig();
  return config.whatsapp.displayNumber;
}

/**
 * Obtiene el número de Yape
 */
export function getYapeNumber(): string {
  const config = getAppConfig();
  return config.payment.yape.number;
}

/**
 * Obtiene el nombre para Yape
 */
export function getYapeName(): string {
  const config = getAppConfig();
  return config.payment.yape.name;
}

