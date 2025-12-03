import { NextRequest, NextResponse } from "next/server";

/**
 * Forzamos a Next a tratar esta ruta como dinámica.
 * Así no intenta prerenderla ni da warnings de "dynamic server usage".
 */
export const dynamic = "force-dynamic";

/**
 * Estado de moderación de cada ítem.
 */
type ModerationStatus = "pending" | "approved" | "rejected" | "flagged";

/**
 * Modelo base de cada ítem de moderación.
 */
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

/**
 * Dataset mock para simular 80 moderaciones.
 */
const MOCK_ITEMS: ModerationItem[] = (() => {
  const categories = ["Política", "Violencia", "Contenido adulto", "Spam", "Odio"];
  const riskLevels: Array<ModerationItem["riskLevel"]> = ["low", "medium", "high"];
  const statuses: ModerationStatus[] = ["pending", "approved", "rejected", "flagged"];

  const items: ModerationItem[] = [];

  for (let i = 1; i <= 80; i++) {
    const risk = riskLevels[i % riskLevels.length];
    const status = statuses[i % statuses.length];

    items.push({
      id: `item-${i}`,
      userName: `Usuario_${i}`,
      avatarUrl: undefined,
      content:
        i % 5 === 0
          ? "Este contenido parece potencialmente problemático y requiere revisión manual."
          : "Texto de ejemplo generado para pruebas de moderación automática en el panel Content Guardian.",
      category: categories[i % categories.length],
      riskLevel: risk,
      createdAt: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
      status,
    });
  }

  return items;
})();

/**
 * GET /api/moderations?page=1&pageSize=20
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const pageSize = Math.max(parseInt(searchParams.get("pageSize") || "20", 10), 1);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const slice = MOCK_ITEMS.slice(startIndex, endIndex);
    const hasMore = endIndex < MOCK_ITEMS.length;

    // Latencia simulada (opcional)
    await new Promise((res) => setTimeout(res, 250));

    return NextResponse.json(
      {
        items: slice,
        hasMore,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/moderations] Error:", error);
    return NextResponse.json(
      {
        message: "Error al obtener moderaciones",
      },
      { status: 500 }
    );
  }
}