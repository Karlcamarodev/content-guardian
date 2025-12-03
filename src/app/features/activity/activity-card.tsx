"use client";

export type ActivityStatus = "aprobado" | "pendiente" | "marcado";
export type Sentiment = "positivo" | "negativo" | "neutral";

export interface ActivityItem {
  id: number;
  name: string;
  username: string;
  minutesAgo: number;
  status: ActivityStatus;
  sentiment: Sentiment;
  message: string;
}

const statusColor: Record<ActivityStatus, string> = {
  aprobado: "bg-emerald-500/15 text-emerald-300",
  pendiente: "bg-amber-500/15 text-amber-200",
  marcado: "bg-rose-500/15 text-rose-200",
};

const sentimentColor: Record<Sentiment, string> = {
  positivo: "bg-sky-500/15 text-sky-300",
  negativo: "bg-rose-500/15 text-rose-200",
  neutral: "bg-slate-500/20 text-slate-300",
};

export function ActivityCard({ item }: { item: ActivityItem }) {
  return (
    <article className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      {/* HEADER */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-sm font-semibold text-white">
            {item.id}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-50">
              {item.name}
            </p>
            <p className="text-xs text-slate-400">
              {item.username} · Hace {item.minutesAgo} min
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 text-xs">
          <span
            className={`rounded-full px-2 py-1 capitalize ${statusColor[item.status]}`}
          >
            {item.status}
          </span>
          <span
            className={`rounded-full px-2 py-1 capitalize ${sentimentColor[item.sentiment]}`}
          >
            {item.sentiment}
          </span>
        </div>
      </header>

      {/* MENSAJE */}
      <p className="mt-4 text-sm text-slate-100">{item.message}</p>

      {/* ACCIONES – FIX MOBILE: 2x2 en móvil, 4 en desktop */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button className="h-10 rounded-xl bg-emerald-500/15 text-xs font-medium text-emerald-300 hover:bg-emerald-500/25">
          ✓ Aprobar
        </button>
        <button className="h-10 rounded-xl bg-rose-500/15 text-xs font-medium text-rose-300 hover:bg-rose-500/25">
          ✕ Rechazar
        </button>
        <button className="h-10 rounded-xl bg-amber-500/15 text-xs font-medium text-amber-300 hover:bg-amber-500/25">
          ⚑ Bandera
        </button>
        <button className="h-10 rounded-xl bg-violet-500/15 text-xs font-medium text-violet-300 hover:bg-violet-500/25">
          ⓘ Reseña
        </button>
      </div>
    </article>
  );
}
