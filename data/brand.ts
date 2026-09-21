/**
 * Copy and structure for the brand presentation (/marca).
 * Grounded in repo product data + public geography of Valle de Mala.
 * No awards, hectares, or sustainability claims beyond what checkout already offers.
 */

export const brand = {
  legalName: "Alma Mala S.A.C.",
  name: "Alma Mala",
  originShort: "Valle de Mala",
  originRegion: "Cañete, costa sur de Lima",
  markets: "Lima y la diáspora en Países Bajos",
  whatsappIntro:
    "Hola, quiero conocer más sobre Alma Mala (no es un pedido todavía).",
} as const;

export const marcaHero = {
  eyebrow: "Pisco craft · Valle de Mala, Perú",
  title: "Un destilado para la mesa de ahora",
  lead: "Alma Mala es pisco joven y preciso: uva de valle, copa contemporánea. Sin folklore de postal. Lo servimos en Lima — y viaja con quienes se lo llevan a Países Bajos.",
  primaryCta: "Comprar",
  secondaryCta: "WhatsApp",
  skip: "Saltar al contenido",
} as const;

export const marcaOrigin = {
  kicker: "Origen",
  title: "Mala no es un adjetivo",
  body: "El valle está en Cañete, a poca distancia de Lima: costa, río y uva. Ahí maduran Italia y Quebranta — las mismas que destilamos. El nombre sostiene esa tensión: alma, y el lugar que la produce. Prueba de sitio, no documental de museo.",
  proofs: [
    {
      label: "Lugar",
      value: "Valle de Mala, Cañete",
      detail: "Costa sur de Lima — otro valle, no Ica.",
    },
    {
      label: "Uva",
      value: "Italia · Quebranta",
      detail: "Aromática y no aromática, en el mismo origen.",
    },
    {
      label: "Mesa",
      value: "Lima + diáspora",
      detail: "De una cocina en Barranco a otra en Rotterdam.",
    },
  ],
} as const;

export type BrandPillar = {
  id: string;
  name: string;
  weight: number;
  kicker: string;
  body: string;
  emphasis: "primary" | "secondary" | "quiet";
};

export const marcaPillars: BrandPillar[] = [
  {
    id: "momentos",
    name: "Momentos",
    weight: 30,
    kicker: "La copa entra cuando hay gente",
    body: "Sour, chilcano, o la damajuana de 4 L cuando la reunión no cabe en una botella. El pisco es de mesa, no de vitrina.",
    emphasis: "primary",
  },
  {
    id: "educacion",
    name: "Educación",
    weight: 25,
    kicker: "Cada uva cambia el vaso",
    body: "Italia aromática para cóctel; Quebranta con columna; Mosto Verde para beber despacio. Sabes qué pides antes de pedir.",
    emphasis: "secondary",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    weight: 20,
    kicker: "Contemporáneo, no costumbrista",
    body: "La misma botella en un departamento limeño y en una cena de quienes viven afuera. Perú de ahora: preciso, no de souvenir.",
    emphasis: "secondary",
  },
  {
    id: "origen",
    name: "Origen",
    weight: 20,
    kicker: "Geografía, no mito",
    body: "Valle de Mala es costa y uva. Lo nombramos porque se puede señalar en un mapa — no porque suene a leyenda.",
    emphasis: "secondary",
  },
  {
    id: "sostenibilidad",
    name: "Sostenibilidad",
    weight: 5,
    kicker: "Solo lo verificable",
    body: "Descuento por botellas que vuelven al depósito. Es el único compromiso que publicamos aquí: está en el checkout, no en un manifiesto.",
    emphasis: "quiet",
  },
];

export const marcaCraft = {
  kicker: "El destilado",
  title: "Cuatro maneras de servir el valle",
  lead: "No es un catálogo de precios. Es la uva, el formato y la ocasión. Si quieres llevar una botella, la tienda está a un gesto.",
  shopLabel: "Ver en la tienda",
  occasions: {
    Italia: "La copa floral de la noche — sour, chilcano, comida.",
    Quebranta: "Columna del cóctel y de la mesa. Carácter, no perfume.",
    "Mosto Verde": "Más denso, para beber despacio o en un sour más serio.",
    "Damajuanas 4L": "Formato de reunión. El alma de la mesa, en 4 litros.",
  } as Record<string, string>,
} as const;

export const marcaCta = {
  kicker: "Lima · Países Bajos",
  title: "De la web al WhatsApp",
  body: "El pedido se arma aquí y se confirma por WhatsApp. La marca cuenta el valle; la tienda entrega la botella.",
  primary: "Ir a comprar",
  secondary: "Escribir por WhatsApp",
  ageNote: "Para mayores de 18 años.",
} as const;
