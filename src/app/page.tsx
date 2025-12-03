"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ============================================================
   Tipos
   ============================================================ */

type Sentiment = "positive" | "negative" | "neutral";
type Status = "approved" | "flagged" | "pending" | "rejected";

type RecentItem = {
  id: number;
  user: string;
  content: string;
  sentiment: Sentiment;
  status: Status;
  timestamp: string;
};

type ActionType = "approve" | "reject" | "flag" | "review";

/* ============================================================
   Datos base (mock DB)
   ============================================================ */

const ALL_CONTENT: RecentItem[] = [
  {
    id: 1,
    user: "Lucía Martínez (@lucia_martinez)",
    content: "¡Excelente producto! Lo recomiendo ampliamente.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 2 minutos",
  },
  {
    id: 2,
    user: "Carlos Herrera (@carlosh_dev)",
    content: "Este es contenido spam con enlaces sospechosos...",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 5 minutos",
  },
  {
    id: 3,
    user: "María Gómez (@maria_g)",
    content: "Experiencia promedio, nada especial.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 8 minutos",
  },
  {
    id: 4,
    user: "Javier Ruiz (@ruizjavier)",
    content: "Excelente servicio al cliente y entrega rápida.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 12 minutos",
  },
  {
    id: 5,
    user: "Ana López (@ana_lopez)",
    content: "El contenido es útil, pero algunas políticas no son claras.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 16 minutos",
  },
  {
    id: 6,
    user: "Diego Torres (@dtorres)",
    content: "Se detectaron varios comentarios ofensivos en este hilo.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 21 minutos",
  },

  // -------------------------
  // NUEVOS 30 USUARIOS
  // -------------------------

  {
    id: 7,
    user: "Valentina Rivas (@valerivas)",
    content: "Muy buena atención por parte del soporte técnico.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 25 minutos",
  },
  {
    id: 8,
    user: "Sebastián Molina (@seba_molina)",
    content: "Este usuario está enviando enlaces repetitivos.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 28 minutos",
  },
  {
    id: 9,
    user: "Camila Ortiz (@camila_ortiz)",
    content:
      "El producto llegó en buen estado, pero tardó más de lo estimado.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 30 minutos",
  },
  {
    id: 10,
    user: "Luis Sánchez (@luissz)",
    content: "Todo perfecto, volveré a comprar.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 34 minutos",
  },
  {
    id: 11,
    user: "Fernanda Díaz (@fer_diaz)",
    content: "Detecté comentarios que parecen generados automáticamente.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 38 minutos",
  },
  {
    id: 12,
    user: "Matías Vega (@mvega_97)",
    content: "Buena experiencia general.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 42 minutos",
  },
  {
    id: 13,
    user: "Paola Castro (@paolacastro)",
    content: "Un servicio rápido y confiable.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 45 minutos",
  },
  {
    id: 14,
    user: "Héctor Jiménez (@hectorjim)",
    content: "El contenido enviado tiene insultos explícitos.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 48 minutos",
  },
  {
    id: 15,
    user: "Daniela Flores (@dani_flores)",
    content: "Considero que este comentario es inapropiado.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 52 minutos",
  },
  {
    id: 16,
    user: "Tomás Aguilar (@tom_aguilar)",
    content: "Todo excelente, gracias por la atención.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 55 minutos",
  },
  {
    id: 17,
    user: "Sofía Marín (@sofiamarin_)",
    content: "Comentarios repetitivos detectados, podrían ser spam.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 59 minutos",
  },
  {
    id: 18,
    user: "Bruno Castillo (@brunocast)",
    content: "La calidad es aceptable por el precio.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 1 hora",
  },
  {
    id: 19,
    user: "Elena Vargas (@elenavargas)",
    content: "Una de las mejores experiencias de compra.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 1 hora y 5 minutos",
  },
  {
    id: 20,
    user: "Gabriel Rojas (@g_rojass)",
    content: "El comentario incluye enlaces que parecen phishing.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 1 hora y 10 minutos",
  },
  {
    id: 21,
    user: "Adriana Campos (@adri_campos)",
    content: "El servicio podría ser más rápido, pero no está mal.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 1 hora y 13 minutos",
  },
  {
    id: 22,
    user: "Ricardo Peña (@ricardo_p)",
    content: "Muy satisfecho con el resultado.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 1 hora y 18 minutos",
  },
  {
    id: 23,
    user: "Julia Medina (@jmedina98)",
    content: "Comentario agresivo detectado.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 1 hora y 22 minutos",
  },
  {
    id: 24,
    user: "Andrés Navarro (@andresnavarro)",
    content: "La plataforma funciona bien, aunque faltan detalles.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 1 hora y 25 minutos",
  },
  {
    id: 25,
    user: "Bianca Herrera (@biancaherrera)",
    content: "Excelente soporte al cliente.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 1 hora y 30 minutos",
  },
  {
    id: 26,
    user: "Samuel Cortés (@samcortes)",
    content: "Contenido duplicado reportado.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 1 hora y 34 minutos",
  },
  {
    id: 27,
    user: "Nicole Zamora (@nic_zamora)",
    content: "No está mal, pero puede mejorar.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 1 hora y 38 minutos",
  },
  {
    id: 28,
    user: "Federico Lara (@felara)",
    content: "Un servicio excelente como siempre.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 1 hora y 42 minutos",
  },
  {
    id: 29,
    user: "Renata Silva (@renata_silva)",
    content: "Este comentario es malintencionado.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 1 hora y 45 minutos",
  },
  {
    id: 30,
    user: "Oscar Medina (@oscarmed)",
    content: "Experiencia neutral, nada fuera de lo común.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 1 hora y 48 minutos",
  },
  {
    id: 31,
    user: "Marisol Fuentes (@marisolf)",
    content: "Muy buena interacción.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 1 hora y 52 minutos",
  },
  {
    id: 32,
    user: "Ignacio León (@ignacioleon)",
    content: "Varias señales de comportamiento sospechoso.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 1 hora y 56 minutos",
  },
  {
    id: 33,
    user: "Ariana Ponce (@ariponce)",
    content: "El contenido es válido, pero requiere revisión adicional.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 2 horas",
  },
  {
    id: 34,
    user: "Rodrigo Campos (@rocampos)",
    content: "Más que satisfecho con el resultado.",
    sentiment: "positive",
    status: "approved",
    timestamp: "Hace 2 horas y 5 minutos",
  },
  {
    id: 35,
    user: "Carla Suárez (@carlasrzz)",
    content: "Envió insultos directos a otros usuarios.",
    sentiment: "negative",
    status: "flagged",
    timestamp: "Hace 2 horas y 10 minutos",
  },
  {
    id: 36,
    user: "Hugo Medina (@hmedina)",
    content: "Comentario aceptable, aunque simple.",
    sentiment: "neutral",
    status: "pending",
    timestamp: "Hace 2 horas y 15 minutos",
  },
];

const PAGE_SIZE = 8;

const statusConfig: Record<Status, { label: string; className: string }> = {
  approved: {
    label: "aprobado",
    className: "bg-green-500/20 text-green-400 border border-green-500/30",
  },
  flagged: {
    label: "marcado",
    className: "bg-red-500/20 text-red-400 border border-red-500/30",
  },
  pending: {
    label: "pendiente",
    className:
      "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  },
  rejected: {
    label: "rechazado",
    className: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  },
};

const sentimentConfig: Record<Sentiment, { label: string; className: string }> =
  {
    positive: {
      label: "positivo",
      className: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    },
    negative: {
      label: "negativo",
      className: "bg-red-500/20 text-red-400 border border-red-500/30",
    },
    neutral: {
      label: "neutral",
      className: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
    },
  };

/* ============================================================
   Mock API local (simula una API paginada)
   ============================================================ */

function mockFetchReviews(
  page: number,
  pageSize: number
): Promise<{ items: RecentItem[]; hasMore: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const slice = ALL_CONTENT.slice(start, end);
      resolve({
        items: slice,
        hasMore: end < ALL_CONTENT.length,
      });
    }, 400); // simula latencia de red
  });
}

/* ============================================================
   Plantillas para el botón "Generar contenido IA"
   ============================================================ */

const AI_TEMPLATES: Array<
  Pick<RecentItem, "user" | "content" | "sentiment" | "status">
> = [
  {
    user: "IA Moderador (@ai_guardian)",
    content:
      "Se detectó un lenguaje ambiguo, se recomienda revisión manual.",
    sentiment: "neutral",
    status: "pending",
  },
  {
    user: "IA Insights (@ai_insights)",
    content:
      "Alta probabilidad de ser contenido seguro según el modelo.",
    sentiment: "positive",
    status: "approved",
  },
  {
    user: "IA Detector (@ai_detector)",
    content:
      "Se encontraron patrones similares a campañas de spam conocidas.",
    sentiment: "negative",
    status: "flagged",
  },
];

/* ============================================================
   Componente principal
   ============================================================ */

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "moderation" | "analytics"
  >("overview");

  const [items, setItems] = useState<RecentItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false); // evita peticiones simultáneas

  // Mock de métricas globales
  const stats = {
    totalReviews: 1247,
    flaggedContent: 89,
    approvedContent: 1158,
    avgResponseTime: "2.3m",
    accuracyRate: 94.5,
    activeUsers: 156,
  };

  /* -------------------------
     Carga paginada (API mock)
     ------------------------- */

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const { items: newItems, hasMore: more } = await mockFetchReviews(
        page,
        PAGE_SIZE
      );

      // nunca vaciamos, solo agregamos al final
      setItems((prev) => [...prev, ...newItems]);
      setHasMore(more);
      setPage((prev) => prev + 1);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page, hasMore]);

  useEffect(() => {
    // primera carga
    loadMore();
  }, [loadMore]);

  /* -------------------------
     Scroll infinito optimizado
     ------------------------- */

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        if (hasMore && !loadingRef.current) {
          loadMore();
        }
      },
      {
        root: null,
        // dispara antes de llegar al final para evitar “pantalla vacía”
        rootMargin: "300px 0px 0px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  /* -------------------------
     Acciones sobre un ítem
     ------------------------- */

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  const handleAction = (id: number, action: ActionType) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        let newStatus: Status = item.status;

        if (action === "approve") newStatus = "approved";
        if (action === "reject") newStatus = "rejected";
        if (action === "flag") newStatus = "flagged";
        if (action === "review") newStatus = "pending";

        return {
          ...item,
          status: newStatus,
          timestamp: "Actualizado hace un momento",
        };
      })
    );

    const label =
      action === "approve"
        ? "Aprobado"
        : action === "reject"
        ? "Rechazado"
        : action === "flag"
        ? "Marcado con bandera"
        : "Enviado a revisión";

    showToast(`${label} correctamente.`);
  };

  /* -------------------------
     Generar contenido IA (mock local)
     ------------------------- */

  const handleGenerateAI = () => {
    const template =
      AI_TEMPLATES[Math.floor(Math.random() * AI_TEMPLATES.length)];

    const maxId = items.length
      ? Math.max(...items.map((i) => i.id))
      : ALL_CONTENT.length;

    const aiItem: RecentItem = {
      id: maxId + 1,
      user: template.user,
      content: template.content,
      sentiment: template.sentiment,
      status: template.status,
      timestamp: "Generado por IA · ahora",
    };

    setItems((prev) => [aiItem, ...prev]);
    showToast("Contenido generado por IA (mock local).");
  };

  const currentPage = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const totalPages = Math.max(1, Math.ceil(ALL_CONTENT.length / PAGE_SIZE));

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Toast simple */}
      {toast && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs sm:text-sm text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-white">
                  Content Guardian
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-300">
                  AI-Powered Content Moderation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="hidden sm:block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                Settings
              </button>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm text-gray-300">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Reviews */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs text-green-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                +12%
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-1">
              {stats.totalReviews.toLocaleString()}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">Total Reviews</p>
          </div>

          {/* Flagged Content */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-red-500/20 rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs text-red-400">
                {stats.flaggedContent}
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-1">
              {stats.flaggedContent}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">Flagged Content</p>
          </div>

          {/* Accuracy Rate */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-[10px] sm:text-xs text-green-400">
                High
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-1">
              {stats.accuracyRate}%
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">Accuracy Rate</p>
          </div>

          {/* Active Users */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-1">
              {stats.activeUsers}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">Active Users</p>
          </div>

          {/* Response Time */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-yellow-500/20 rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-1">
              {stats.avgResponseTime}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Avg Response Time
            </p>
          </div>

          {/* Activity Status */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-indigo-500/20 rounded-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-1">
              Live
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">System Status</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 min-w-[100px] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Descripción general
          </button>
          <button
            onClick={() => setActiveTab("moderation")}
            className={`flex-1 min-w-[100px] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "moderation"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Cola de moderación
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 min-w-[100px] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Analítica
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6">
          {activeTab === "overview" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Actividad reciente
                </h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs sm:text-sm">
                    Buscar
                  </button>
                  <button className="flex-1 sm:flex-none px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs sm:text-sm">
                    Filtrar
                  </button>
                  <button
                    onClick={handleGenerateAI}
                    className="hidden sm:inline-flex px-3 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    Generar IA
                  </button>
                </div>
              </div>

              {/* Botón IA visible en mobile abajo */}
              <button
                onClick={handleGenerateAI}
                className="sm:hidden w-full mb-4 px-3 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg transition-colors text-xs"
              >
                Generar contenido IA
              </button>

              {/* Lista de reviews */}
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-all"
                  >
                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            {String(item.id).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium text-sm sm:text-base truncate">
                            {item.user}
                          </p>
                          <p className="text-gray-400 text-[10px] sm:text-xs">
                            {item.timestamp}
                          </p>
                        </div>
                      </div>

                      {/* BADGES */}
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            statusConfig[item.status].className
                          }`}
                        >
                          {statusConfig[item.status].label}
                        </span>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            sentimentConfig[item.sentiment].className
                          }`}
                        >
                          {sentimentConfig[item.sentiment].label}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT TEXT */}
                    <p className="text-gray-200 text-sm sm:text-base mb-4 leading-relaxed break-words">
                      {item.content}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-4 gap-2 w-full">
                      <button
                        onClick={() => handleAction(item.id, "approve")}
                        className="flex flex-col items-center justify-center gap-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg p-2 sm:p-3 transition-all min-h-[60px] sm:min-h-[70px]"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium text-center">
                          Aprobar
                        </span>
                      </button>

                      <button
                        onClick={() => handleAction(item.id, "reject")}
                        className="flex flex-col items-center justify-center gap-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg p-2 sm:p-3 transition-all min-h-[60px] sm:min-h-[70px]"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium text-center">
                          Rechazar
                        </span>
                      </button>

                      <button
                        onClick={() => handleAction(item.id, "flag")}
                        className="flex flex-col items-center justify-center gap-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 rounded-lg p-2 sm:p-3 transition-all min-h-[60px] sm:min-h-[70px]"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                          />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium text-center">
                          Bandera
                        </span>
                      </button>

                      <button
                        onClick={() => handleAction(item.id, "review")}
                        className="flex flex-col items-center justify-center gap-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-lg p-2 sm:p-3 transition-all min-h-[60px] sm:min-h-[70px]"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium text-center">
                          Reseña
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sentinel para scroll infinito */}
              <div ref={sentinelRef} className="h-6 w-full" />

              {/* Estado de paginación */}
              <div className="mt-4 flex flex-col items-center gap-2 text-xs text-gray-300">
                <div>
                  Página {currentPage} de {totalPages}
                  {!hasMore && " · Fin de la lista"}
                </div>
                {loading && (
                  <div className="text-[11px] text-gray-300">
                    Cargando más contenido...
                  </div>
                )}
                {!loading && hasMore && (
                  <button
                    onClick={loadMore}
                    className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-[11px]"
                  >
                    Cargar más
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === "moderation" && (
            <div className="text-center py-8 sm:py-12">
              <div className="p-3 sm:p-4 bg-purple-500/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Cola de Moderación
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 px-4">
                Herramientas avanzadas de moderación y gestión de flujo de
                trabajo.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto px-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                  <div className="text-3xl sm:text-4xl mb-2">⏳</div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    12 Pendientes
                  </p>
                  <p className="text-gray-400 text-xs">En revisión actual</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                  <div className="text-3xl sm:text-4xl mb-2">✓</div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    {stats.approvedContent} Aprobados
                  </p>
                  <p className="text-gray-400 text-xs">Total aprobados</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="text-center py-8 sm:py-12">
              <div className="p-3 sm:p-4 bg-blue-500/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Dashboard de Analítica
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 px-4">
                Información completa y métricas de rendimiento para tu sistema
                de moderación.
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                  <div className="text-3xl sm:text-4xl mb-2">📈</div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    +24%
                  </p>
                  <p className="text-gray-400 text-xs">Crecimiento</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                  <div className="text-3xl sm:text-4xl mb-2">🎯</div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    {stats.accuracyRate}%
                  </p>
                  <p className="text-gray-400 text-xs">Precisión</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                  <div className="text-3xl sm:text-4xl mb-2">⏱️</div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    {stats.avgResponseTime}
                  </p>
                  <p className="text-gray-400 text-xs">Respuesta</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-gray-400 text-[11px] sm:text-xs">
            Content Guardian v1.0.0 · Plataforma de moderación de contenido con
            IA · Desarrollado con Next.js 14 y TypeScript · © 2024 Karl H.
            Camaro Porta
          </p>
        </div>
      </div>
    </main>
  );
}
