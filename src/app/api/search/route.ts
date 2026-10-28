import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const [items, npcs, quests, zones, spells] = await Promise.all([
      db.item.findMany({
        where: { OR: [{ name: { contains: q } }, { nameEn: { contains: q } }] },
        take: 8,
        select: { id: true, name: true, nameEn: true, quality: true, level: true, slot: true },
      }),
      db.npc.findMany({
        where: { OR: [{ name: { contains: q } }, { nameEn: { contains: q } }] },
        take: 8,
        select: { id: true, name: true, nameEn: true, type: true, classification: true, minLevel: true, maxLevel: true },
      }),
      db.quest.findMany({
        where: { OR: [{ title: { contains: q } }, { titleEn: { contains: q } }] },
        take: 8,
        select: { id: true, title: true, titleEn: true, requiredLevel: true, type: true },
      }),
      db.zone.findMany({
        where: { OR: [{ name: { contains: q } }, { nameEn: { contains: q } }] },
        take: 8,
        select: { id: true, name: true, nameEn: true, continent: true, type: true, minLevel: true, maxLevel: true },
      }),
      db.spell.findMany({
        where: { OR: [{ name: { contains: q } }, { nameEn: { contains: q } }] },
        take: 8,
        select: { id: true, name: true, nameEn: true, className: true, school: true },
      }),
    ]);

    return NextResponse.json({ results: { item: items, npc: npcs, quest: quests, zone: zones, spell: spells } });
  } catch (e) {
    console.error("search error:", e);
    return NextResponse.json({ error: "خطا در جستجو" }, { status: 500 });
  }
}
