import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

// نوع‌های مجاز و فیلدهای قابل جستجو
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

function buildWhere(type: AllowedType, sp: URLSearchParams): Prisma.WhereInput | undefined {
  const q = sp.get("q")?.trim();
  const or = (fields: string[]) =>
    q
      ? {
          OR: fields.map((f) => ({
            [f]: { contains: q },
          })),
        }
      : undefined;

  const and: Prisma.WhereInput[] = [];

  switch (type) {
    case "item": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      const quality = sp.get("quality");
      if (quality) and.push({ quality });
      const itemClass = sp.get("itemClass");
      if (itemClass) and.push({ itemClass });
      const slot = sp.get("slot");
      if (slot) and.push({ slot });
      break;
    }
    case "npc": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      const t = sp.get("npcType");
      if (t) and.push({ type: t });
      const cls = sp.get("classification");
      if (cls) and.push({ classification: cls });
      const zoneId = sp.get("zoneId");
      if (zoneId) and.push({ zoneId: Number(zoneId) });
      break;
    }
    case "quest": {
      const w = or(["title", "titleEn"]);
      if (w) and.push(w);
      const t = sp.get("questType");
      if (t) and.push({ type: t });
      const side = sp.get("side");
      if (side) and.push({ side: { in: [side, "both"] } });
      const zoneId = sp.get("zoneId");
      if (zoneId) and.push({ zoneId: Number(zoneId) });
      break;
    }
    case "zone": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      const continent = sp.get("continent");
      if (continent) and.push({ continent });
      const t = sp.get("zoneType");
      if (t) and.push({ type: t });
      break;
    }
    case "spell": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      const cn = sp.get("className");
      if (cn) and.push({ className: cn });
      const school = sp.get("school");
      if (school) and.push({ school });
      break;
    }
    case "class": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      break;
    }
    case "race": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      const side = sp.get("side");
      if (side) and.push({ side: { in: [side, "both"] } });
      break;
    }
    case "faction": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      const side = sp.get("side");
      if (side) and.push({ side: { in: [side, "both"] } });
      break;
    }
    case "achievement": {
      const w = or(["name", "nameEn"]);
      if (w) and.push(w);
      const cat = sp.get("category");
      if (cat) and.push({ category: cat });
      break;
    }
    case "news": {
      const w = or(["title", "excerpt"]);
      if (w) and.push(w);
      const cat = sp.get("category");
      if (cat) and.push({ category: cat });
      break;
    }
  }

  return and.length ? { AND: and } : undefined;
}

function modelFor(type: AllowedType) {
  switch (type) {
    case "item":
      return db.item;
    case "npc":
      return db.npc;
    case "quest":
      return db.quest;
    case "zone":
      return db.zone;
    case "spell":
      return db.spell;
    case "class":
      return db.wowClass;
    case "race":
      return db.race;
    case "faction":
      return db.faction;
    case "achievement":
      return db.achievement;
    case "news":
      return db.news;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const model = modelFor(type as AllowedType);
  if (!model) {
    return NextResponse.json({ error: "نوع نامعتبر است" }, { status: 400 });
  }
  const sp = request.nextUrl.searchParams;
  const page = Math.max(1, Number(sp.get("page") || 1));
  const pageSize = Math.min(50, Math.max(1, Number(sp.get("pageSize") || 20)));
  const where = buildWhere(type as AllowedType, sp);

  try {
    const [data, total] = await Promise.all([
      model.findMany({
        where,
        orderBy: { id: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      model.count({ where }),
    ]);
    return NextResponse.json({ data, total, page, pageSize });
  } catch (e) {
    console.error("db list error:", e);
    return NextResponse.json({ error: "خطا در دریافت داده‌ها" }, { status: 500 });
  }
}
