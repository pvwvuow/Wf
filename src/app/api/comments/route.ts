import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const VALID_TYPES = ["item", "npc", "quest", "zone", "spell", "news", "class", "race", "faction", "achievement"];

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const type = sp.get("type") ?? "";
  const id = Number(sp.get("id"));
  if (!VALID_TYPES.includes(type) || !Number.isFinite(id)) {
    return NextResponse.json({ error: "پارامترهای نامعتبر" }, { status: 400 });
  }
  try {
    const comments = await db.comment.findMany({
      where: { entityType: type, entityId: id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ comments });
  } catch (e) {
    console.error("comments get error:", e);
    return NextResponse.json({ error: "خطا در دریافت نظرات" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = String(body?.type ?? "");
    const id = Number(body?.id);
    const author = String(body?.author ?? "").trim() || "مهمان";
    const text = String(body?.body ?? "").trim();
    const rating = Math.min(5, Math.max(0, Number(body?.rating ?? 0)));

    if (!VALID_TYPES.includes(type) || !Number.isFinite(id)) {
      return NextResponse.json({ error: "نوع یا شناسه نامعتبر است" }, { status: 400 });
    }
    if (text.length < 3) {
      return NextResponse.json({ error: "متن نظر باید حداقل ۳ نویسه باشد" }, { status: 400 });
    }
    if (text.length > 2000) {
      return NextResponse.json({ error: "متن نظر بیش از حد طولانی است" }, { status: 400 });
    }
    if (author.length > 50) {
      return NextResponse.json({ error: "نام نویسنده بیش از حد طولانی است" }, { status: 400 });
    }

    const comment = await db.comment.create({
      data: { entityType: type, entityId: id, author, body: text, rating },
    });
    return NextResponse.json({ comment }, { status: 201 });
  } catch (e) {
    console.error("comments post error:", e);
    return NextResponse.json({ error: "خطا در ثبت نظر" }, { status: 500 });
  }
}
