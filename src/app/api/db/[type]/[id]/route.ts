import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type AllowedType =
  | "item"
  | "npc"
  | "quest"
  | "zone"
  | "spell"
  | "class"
  | "race"
  | "faction"
  | "achievement"
  | "news";

const commentTypes: Record<AllowedType, string> = {
  item: "item",
  npc: "npc",
  quest: "quest",
  zone: "zone",
  spell: "spell",
  class: "class",
  race: "race",
  faction: "faction",
  achievement: "achievement",
  news: "news",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
  }

  try {
    let data: unknown = null;
    const related: Record<string, unknown> = {};

    switch (type as AllowedType) {
      case "item": {
        const item = await db.item.findUnique({ where: { id: numId } });
        if (!item) break;
        data = item;
        if (item.zoneId) {
          related.zone = await db.zone.findUnique({
            where: { id: item.zoneId },
            select: { id: true, name: true, nameEn: true, continent: true },
          });
        }
        // در کدام لوت‌ها می‌افتد
        const drops = await db.npcDrop.findMany({ where: { itemId: numId } });
        if (drops.length) {
          const npcs = await db.npc.findMany({
            where: { id: { in: drops.map((d) => d.npcId) } },
            select: { id: true, name: true, nameEn: true, classification: true, minLevel: true, maxLevel: true },
          });
          const npcMap = new Map(npcs.map((n) => [n.id, n]));
          related.droppedBy = drops
            .map((d) => ({ chance: d.chance, npc: npcMap.get(d.npcId) }))
            .filter((x) => x.npc);
        }
        break;
      }
      case "npc": {
        const npc = await db.npc.findUnique({ where: { id: numId } });
        if (!npc) break;
        data = npc;
        if (npc.zoneId) {
          related.zone = await db.zone.findUnique({
            where: { id: npc.zoneId },
            select: { id: true, name: true, nameEn: true, continent: true, type: true },
          });
        }
        const drops = await db.npcDrop.findMany({ where: { npcId: numId } });
        if (drops.length) {
          const items = await db.item.findMany({
            where: { id: { in: drops.map((d) => d.itemId) } },
          });
          const itemMap = new Map(items.map((i) => [i.id, i]));
          related.drops = drops
            .map((d) => ({ chance: d.chance, item: itemMap.get(d.itemId) }))
            .filter((x) => x.item);
        }
        // کوئست‌های مرتبط با این NPC
        related.quests = await db.quest.findMany({
          where: { giverNpcId: numId },
          take: 10,
        });
        break;
      }
      case "quest": {
        const quest = await db.quest.findUnique({ where: { id: numId } });
        if (!quest) break;
        data = quest;
        if (quest.zoneId) {
          related.zone = await db.zone.findUnique({
            where: { id: quest.zoneId },
            select: { id: true, name: true, nameEn: true, continent: true, type: true },
          });
        }
        break;
      }
      case "zone": {
        const zone = await db.zone.findUnique({ where: { id: numId } });
        if (!zone) break;
        data = zone;
        related.npcs = await db.npc.findMany({ where: { zoneId: numId }, take: 12 });
        related.quests = await db.quest.findMany({ where: { zoneId: numId }, take: 12 });
        break;
      }
      case "spell": {
        data = await db.spell.findUnique({ where: { id: numId } });
        break;
      }
      case "class": {
        data = await db.wowClass.findUnique({ where: { id: numId } });
        if (data) {
          const cls = data as { name: string };
          related.spells = await db.spell.findMany({
            where: { className: cls.name },
            take: 12,
          });
        }
        break;
      }
      case "race": {
        data = await db.race.findUnique({ where: { id: numId } });
        break;
      }
      case "faction": {
        data = await db.faction.findUnique({ where: { id: numId } });
        break;
      }
      case "achievement": {
        data = await db.achievement.findUnique({ where: { id: numId } });
        break;
      }
      case "news": {
        const news = await db.news.findUnique({ where: { id: numId } });
        if (!news) break;
        data = news;
        await db.news.update({ where: { id: numId }, data: { views: { increment: 1 } } });
        related.latest = await db.news.findMany({
          where: { id: { not: numId } },
          orderBy: { createdAt: "desc" },
          take: 4,
          select: { id: true, title: true, excerpt: true, category: true, createdAt: true },
        });
        break;
      }
      default:
        return NextResponse.json({ error: "نوع نامعتبر است" }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: "یافت نشد" }, { status: 404 });
    }

    const comments = await db.comment.findMany({
      where: {
        entityType: commentTypes[type as AllowedType],
        entityId: numId,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ data, comments, related });
  } catch (e) {
    console.error("db detail error:", e);
    return NextResponse.json({ error: "خطا در دریافت داده" }, { status: 500 });
  }
}
