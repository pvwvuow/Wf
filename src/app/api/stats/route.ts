import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [
      itemCount,
      npcCount,
      questCount,
      zoneCount,
      spellCount,
      classCount,
      achievementCount,
      newsCount,
      legendaries,
      bosses,
      latestNews,
    ] = await Promise.all([
      db.item.count(),
      db.npc.count(),
      db.quest.count(),
      db.zone.count(),
      db.spell.count(),
      db.wowClass.count(),
      db.achievement.count(),
      db.news.count(),
      db.item.findMany({ where: { quality: "legendary" }, take: 6 }),
      db.npc.findMany({ where: { classification: { in: ["boss", "world-boss"] } }, take: 6 }),
      db.news.findMany({ orderBy: [{ pinned: "desc" }, { createdAt: "desc" }], take: 4 }),
    ]);

    return NextResponse.json({
      counts: {
        item: itemCount,
        npc: npcCount,
        quest: questCount,
        zone: zoneCount,
        spell: spellCount,
        class: classCount,
        achievement: achievementCount,
        news: newsCount,
      },
      legendaries,
      bosses,
      latestNews,
    });
  } catch (e) {
    console.error("stats error:", e);
    return NextResponse.json({ error: "خطا در دریافت آمار" }, { status: 500 });
  }
}
