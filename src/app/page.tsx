"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  TIPOS: DEBEN COINCIDIR CON /api/moderations                       */
/* ------------------------------------------------------------------ */

type ModerationStatus = "pending" | "approved" | "rejected" | "flagged";

export interface ModerationItem {
  id: string;
  userName: string;
  avatarUrl?: string;
  content: string;
  category: string;
  riskLevel: "low" | "medium" | "high";
  createdAt: string;
  status: ModerationStatus;
}

interface ModerationApiResponse {
  items: ModerationItem[];
  hasMore: boolean;
}

const PAGE_SIZE = 20;

/* ------------------------------------------------------------------ */
/*  PÁGINA PRINCIPAL                                                  */
/* ------------------------------------------------------------------ */

const ContentGuardianPage: React.FC = () => {
  // Lista de moderaciones ya cargadas
  const [items, setItems] = useState<ModerationItem[]>([]);

  // Paginación por número de página
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Estados de carga / error
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref para evitar múltiples peticiones simultáneas
  const loadingRef = useRef(false);

  // Ref al sentinel para IntersectionObserver
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  /* ------------------------------------------------------------------ */
  /*  FUNCIÓN DE PETICIÓN A LA API                                      */
  /* ------------------------------------------------------------------ */

  const fetchPage = useCallback(async (pageToLoad: number) => {
    const res = await fetch(
      `/api/moderations?page=${pageToLoad}&pageSize=${PAGE_SIZE}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Error al cargar los datos de moderación");
    }

    const data: ModerationApiResponse = await res.json();
    return data;
  }, []);

  /* ------------------------------------------------------------------ */
  /*  LÓGICA DE CARGA (INICIAL + INFINITE SCROLL)                       */
  /* ------------------------------------------------------------------ */

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setIsLoadingMore(true);
    setError(null);

    try {
      const nextPage = page;
      const data = await fetchPage(nextPage);

      // CLAVE: nunca vaciar la lista, siempre hacer append
      setItems((prev) => [...prev, ...data.items]);
      setHasMore(data.hasMore);

      if (data.items.length > 0) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error desconocido al cargar más datos"
      );
    } finally {
      setIsInitialLoading(false);
      setIsLoadingMore(false);
      loadingRef.current = false;
    }
  }, [fetchPage, hasMore, page]);

  // Carga inicial
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Configuración del IntersectionObserver
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loadingRef.current) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "400px 0px 0px 0px", // carga anticipada
        threshold: 0.1,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  const isEmpty = useMemo(
    () => !isInitialLoading && items.length === 0,
    [isInitialLoading, items.length]
  );

  /* ------------------------------------------------------------------ */
  /*  UI PRINCIPAL                                                      */
  /* ------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Content Guardian
            </h1>
            <p className="text-sm text-slate-400">
              Enterprise-grade content moderation dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
            >
              Generar contenido IA
            </button>
            <div className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-300">Sistema estable</span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        {/* KPIs rápidos */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <KpiCard
            label="Pendientes"
            value={items.filter((i) => i.status === "pending").length}
          />
          <KpiCard
            label="Aprobados"
            value={items.filter((i) => i.status === "approved").length}
          />
          <KpiCard
            label="Rechazados"
            value={items.filter((i) => i.status === "rejected").length}
          />
        </div>

        {/* GRID PRINCIPAL */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,2.2fr),minmax(0,1fr)]">
          {/* COLUMNA IZQUIERDA: COLA DE MODERACIÓN */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl shadow-slate-950/40">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Cola de moderación
                </h2>
                <p className="text-xs text-slate-500">
                  Desplázate hacia abajo para cargar más contenido
                  automáticamente.
                </p>
              </div>
            </div>

            {/* ESTADO INICIAL: CARGANDO */}
            {isInitialLoading && (
              <div className="space-y-3">
                <ListSkeleton rows={6} />
              </div>
            )}

            {/* ESTADO VACÍO */}
            {isEmpty && (
              <div className="py-10 text-center text-sm text-slate-400">
                No hay contenido pendiente de moderación en este momento.
              </div>
            )}

            {/* LISTA + INFINITE SCROLL */}
            {!isInitialLoading && items.length > 0 && (
              <div className="space-y-3">
                {items.map((item) => (
                  <ModerationCard key={item.id} item={item} />
                ))}

                {/* Skeleton mientras se cargan más elementos */}
                {isLoadingMore && (
                  <div className="pt-2">
                    <ListSkeleton rows={3} />
                  </div>
                )}

                {/* Sentinel para IntersectionObserver (invisible) */}
                <div ref={sentinelRef} className="h-6 w-full" />

                {/* Mensaje de fin de lista */}
                {!hasMore && (
                  <p className="py-4 text-center text-xs text-slate-500">
                    Has llegado al final de la lista.
                  </p>
                )}

                {/* Error si algo falla */}
                {error && (
                  <div className="mt-4 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-100">
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: RESUMEN / INFO EXTRA */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Resumen de riesgo
              </h3>
              <p className="mb-3 text-xs text-slate-400">
                Distribución rápida por nivel de riesgo dentro de la cola
                actual.
              </p>
              <RiskSummary items={items} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Notas del sistema
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-400">
                <li>No se vacía la lista mientras se cargan más datos.</li>
                <li>
                  El scroll infinito se dispara de forma anticipada gracias a{" "}
                  <code>rootMargin</code>.
                </li>
                <li>
                  Se usan skeletons para evitar pantallas en blanco durante la
                  carga.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ContentGuardianPage;

/* ------------------------------------------------------------------ */
/*  COMPONENTES DE APOYO                                              */
/* ------------------------------------------------------------------ */

const KpiCard: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-xl font-semibold text-slate-50">{value}</p>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-[10px] text-slate-400">
        KPI
      </div>
    </div>
  );
};

const ModerationCard: React.FC<{ item: ModerationItem }> = ({ item }) => {
  const statusBadge = useMemo(() => {
    switch (item.status) {
      case "approved":
        return {
          label: "Aprobado",
          className:
            "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40",
        };
      case "rejected":
        return {
          label: "Rechazado",
          className: "bg-red-500/10 text-red-300 border border-red-500/40",
        };
      case "flagged":
        return {
          label: "Marcado",
          className:
            "bg-amber-500/10 text-amber-300 border border-amber-500/40",
        };
      default:
        return {
          label: "Pendiente",
          className:
            "bg-sky-500/10 text-sky-300 border border-sky-500/40 animate-pulse",
        };
    }
  }, [item.status]);

  const riskLabel = useMemo(() => {
    switch (item.riskLevel) {
      case "high":
        return "Riesgo alto";
      case "medium":
        return "Riesgo medio";
      default:
        return "Riesgo bajo";
    }
  }, [item.riskLevel]);

  return (
    <article className="group rounded-xl border border-slate-800/80 bg-slate-950/80 px-3 py-3 text-sm shadow-sm shadow-black/40 transition-transform duration-150 hover:-translate-y-[1px] hover:border-slate-600/80">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-slate-800">
            {item.avatarUrl ? (
              <Image
                src={item.avatarUrl}
                alt={item.userName}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-300">
                {item.userName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-100">
              {item.userName}
            </p>
            <p className="text-[11px] text-slate-500">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusBadge.className}`}
          >
            {statusBadge.label}
          </span>
          <span className="rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-400">
            {riskLabel}
          </span>
        </div>
      </div>

      <p className="line-clamp-3 text-xs text-slate-200">{item.content}</p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-400">
            {item.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="rounded-full bg-slate-900/80 px-2 py-1 text-[11px] text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-200"
          >
            Aprobar
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-900/80 px-2 py-1 text-[11px] text-slate-200 hover:bg-red-500/10 hover:text-red-200"
          >
            Rechazar
          </button>
          <button
            type="button"
            className="rounded-full bg-slate-900/80 px-2 py-1 text-[11px] text-slate-300 hover:bg-amber-500/10 hover:text-amber-200"
          >
            Marcar
          </button>
        </div>
      </div>
    </article>
  );
};

const ListSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="h-20 rounded-xl bg-slate-900/70 ring-1 ring-slate-800/80 animate-pulse"
        />
      ))}
    </div>
  );
};

const RiskSummary: React.FC<{ items: ModerationItem[] }> = ({ items }) => {
  const totals = useMemo(() => {
    const base = { low: 0, medium: 0, high: 0 };
    for (const item of items) {
      base[item.riskLevel] = base[item.riskLevel] + 1;
    }
    return base;
  }, [items]);

  const total = totals.low + totals.medium + totals.high || 1;

  const pct = {
    low: Math.round((totals.low / total) * 100),
    medium: Math.round((totals.medium / total) * 100),
    high: Math.round((totals.high / total) * 100),
  };

  return (
    <div className="space-y-3 text-xs">
      <RiskBar label="Bajo" value={pct.low} />
      <RiskBar label="Medio" value={pct.medium} />
      <RiskBar label="Alto" value={pct.high} />
    </div>
  );
};

const RiskBar: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] text-slate-300">
        <span>{label}</span>
        <span className="text-slate-400">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-900">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400/80 via-sky-400/80 to-slate-300/80"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
