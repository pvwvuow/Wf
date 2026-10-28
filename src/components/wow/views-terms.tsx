"use client";

import * as React from "react";
import { BookOpen, Languages, MapPin, Swords } from "lucide-react";
import { Badge, CLASS_COLORS } from "./shared";

// محتوای این صفحه از docs/TRANSLATION-GUIDE.md می‌آید
const PRINCIPLES: Array<{ title: string; good: string; bad: string }> = [
  {
    title: "نام‌های خاص فقط آوانگاری می‌شوند",
    good: "فراست‌مورن، استورم‌ویند، اورگیمار، ایلیدان",
    bad: "«مرگ یخ»، «باد طوفانی» — ترجمه تحت‌اللفظی ممنوع!",
  },
  {
    title: "اصطلاحات گیم‌پلی انگلیسی می‌مانند",
    good: "heal، tank، DPS، loot، drop، crit، aggro",
    bad: "«شفا بخشیدن»، «مخزن»، «آسیب در ثانیه»",
  },
  {
    title: "معروف‌ها همان معروف‌ها می‌مانند",
    good: "کویست، لول، دانجن، رید، باس، مانت، پت",
    bad: "«مأموریت»، «سطح»، «زیرزمین»، «رئیس»",
  },
  {
    title: "برچسب‌های دیتابیس فارسی روان می‌شوند",
    good: "منطقه، جناح، دستاورد، کیفیت، لول موردنیاز",
    bad: "zone، faction، achievement — در برچسب‌ها نه!",
  },
];

const JARGON: Array<{ en: string; fa: string; note: string }> = [
  { en: "tank / DPS / heal", fa: "همان انگلیسی", note: "نقش‌ها هیچ‌وقت ترجمه نمی‌شوند" },
  { en: "quest", fa: "کویست", note: "نه «مأموریت»" },
  { en: "level", fa: "لول", note: "در جدول‌ها: «لول موردنیاز»" },
  { en: "dungeon / raid", fa: "دانجن / رید", note: "نه «سیاهچال» و «گشت»" },
  { en: "boss / mob", fa: "باس / مب", note: "در برچسب رسمی: «موجود»" },
  { en: "epic / legendary / rare", fa: "ایپیک / لجندری / ریر", note: "در برچسب رسمی: حماسی، افسانه‌ای، کمیاب" },
  { en: "loot / drop", fa: "همان انگلیسی", note: "«درصد drop» در جدول لوت" },
  { en: "BoP / BoE", fa: "بای‌پی‌یو / بای‌ای", note: "رسمی: «با برداشتن متصل می‌شود»" },
  { en: "mount / pet", fa: "مانت / پت", note: "نه «سواره» و «حیوان خانگی»" },
  { en: "grind / farm", fa: "گریند / فارم", note: "فارن‌گویی روزمره گیمرها" },
];

const CLASSES: Array<{ fa: string; en: string }> = [
  { fa: "واریور", en: "Warrior" },
  { fa: "پالادین", en: "Paladin" },
  { fa: "هانتر", en: "Hunter" },
  { fa: "روگ", en: "Rogue" },
  { fa: "پریست", en: "Priest" },
  { fa: "شمن", en: "Shaman" },
  { fa: "مج", en: "Mage" },
  { fa: "وارلاک", en: "Warlock" },
  { fa: "دروید", en: "Druid" },
  { fa: "دث‌نایت", en: "Death Knight" },
  { fa: "مونک", en: "Monk" },
  { fa: "دی‌اچ", en: "Demon Hunter" },
];

const RACES: Array<{ fa: string; en: string; side: string }> = [
  { fa: "انسان", en: "Human", side: "alliance" },
  { fa: "دورف", en: "Dwarf", side: "alliance" },
  { fa: "نایت‌الف", en: "Night Elf", side: "alliance" },
  { fa: "گنوم", en: "Gnome", side: "alliance" },
  { fa: "درانئی", en: "Draenei", side: "alliance" },
  { fa: "اورک", en: "Orc", side: "horde" },
  { fa: "آندید", en: "Undead", side: "horde" },
  { fa: "تائورن", en: "Tauren", side: "horde" },
  { fa: "ترول", en: "Troll", side: "horde" },
  { fa: "بلادالف", en: "Blood Elf", side: "horde" },
];

export function TermsView() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold/15 border border-gold/40">
          <Languages size={20} className="text-gold" />
        </span>
        <h1 className="text-2xl font-black text-gold gold-glow">راهنمای واژگان ووهِد فارسی</h1>
      </div>
      <p className="text-muted-foreground leading-7 mb-8">
        قانون طلایی ما ساده است: <b className="text-foreground">همه‌چیز را ترجمه نکن</b>. اصطلاحات را
        همان‌طوری به کار ببر که گیمرهای ایرانی در گیلد و گروه تلگرامی حرف می‌زنند. اگر متن این سایت
        بلند خوانده شود، باید دقیقاً مثل زبان جامعه گیمری ایران باشد — نه یک ترجمه رسمی عجیب و
        گیج‌کننده.
      </p>

      {/* اصول */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gold mb-4">
          <BookOpen size={18} />
          اصول چهارگانه
        </h2>
        <div className="grid gap-3">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="rounded-xl border border-border bg-panel p-4">
              <div className="font-bold text-sm mb-2">
                {faNum(i + 1)}. {p.title}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 text-xs leading-6">
                <div className="flex-1 rounded-lg border border-[#3fdc3f]/30 bg-[#3fdc3f]/5 p-2.5">
                  <span className="text-[#3fdc3f] font-bold">درست: </span>
                  <span dir="auto">{p.good}</span>
                </div>
                <div className="flex-1 rounded-lg border border-destructive/30 bg-destructive/5 p-2.5">
                  <span className="text-destructive font-bold">غلط: </span>
                  <span dir="auto">{p.bad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* کلاس‌ها */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gold mb-4">
          <Swords size={18} />
          نام کلاس‌ها — لحن جامعه گیمری ایران
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CLASSES.map((c) => (
            <div
              key={c.en}
              className="flex items-center justify-between rounded-lg border border-border bg-panel px-3 py-2.5"
            >
              <span className="font-bold text-sm" style={{ color: CLASS_COLORS[c.fa] }}>
                {c.fa}
              </span>
              <span className="text-[11px] text-muted-foreground" dir="ltr">
                {c.en}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* نژادها */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gold mb-4">نام نژادها</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {RACES.map((r) => (
            <div
              key={r.en}
              className="flex items-center justify-between rounded-lg border border-border bg-panel px-3 py-2.5"
            >
              <span className="font-bold text-sm">{r.fa}</span>
              <span className="text-[11px] text-muted-foreground" dir="ltr">
                {r.en}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-6">
          پایتخت‌ها همیشه آوانگاری می‌شوند: استورم‌ویند، اورگیمار، آندرسیتی، تاندر بلاف، آیرون‌فورج، دالاران.
        </p>
      </section>

      {/* واژه‌نامه */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gold mb-4">واژه‌نامه گیمری</h2>
        <div className="rounded-xl border border-border bg-panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-panel-2 text-muted-foreground text-xs">
                <th className="text-right p-3 font-medium">اصطلاح اصلی</th>
                <th className="text-right p-3 font-medium">در ووهِد فارسی</th>
                <th className="text-right p-3 font-medium hidden sm:table-cell">یادداشت</th>
              </tr>
            </thead>
            <tbody>
              {JARGON.map((j) => (
                <tr key={j.en} className="border-t border-border">
                  <td className="p-3 text-muted-foreground" dir="ltr">
                    {j.en}
                  </td>
                  <td className="p-3 font-bold">{j.fa}</td>
                  <td className="p-3 text-xs text-muted-foreground hidden sm:table-cell">{j.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* قاعده نام مکان */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gold mb-4">
          <MapPin size={18} />
          قاعده نام مکان‌ها
        </h2>
        <div className="rounded-xl border border-border bg-panel p-5 mb-3">
          <p className="text-center text-sm font-bold tracking-wide" dir="ltr">
            [نوع جغرافیایی ترجمه‌شده] + [نام خاص آوانگاری]
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {[
            ["Elwynn Forest", "جنگل الون"],
            ["Arathi Highlands", "دشت‌های آراسی"],
            ["Burning Steppes", "دشت‌های سوزان"],
            ["Un'Goro Crater", "دهانه اون‌گورو"],
            ["Eastern Plaguelands", "اراضی طاعون‌زده شرقی"],
            ["Stranglethorn Vale", "دره استرنگل‌تورن"],
          ].map(([en, fa]) => (
            <div
              key={en}
              className="flex items-center justify-between rounded-lg border border-border bg-panel px-3 py-2"
            >
              <span className="font-bold">{fa}</span>
              <span className="text-[11px] text-muted-foreground" dir="ltr">
                {en}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-6">
          «شرق‌سرزمین» برای Eastern Kingdoms و «کالیمدور» (آوانگاری) برای Kalimdor به کار می‌رود.
        </p>
      </section>

      <div className="rounded-xl border border-gold/30 bg-gold/5 p-5 text-sm leading-7">
        <Badge color="#f0b429">یادآوری</Badge>
        <p className="mt-2 text-muted-foreground">
          هر موجود دیتابیس علاوه بر نام فارسی، فیلد <span dir="ltr">nameEn</span> دارد که در صفحه
          جزئیات نمایش داده می‌شود — تا بتوانی همان را در ویکی‌ها و گوگل هم جستجو کنی. پیشنهاد اصطلاح
          جدید داری؟ در نظرات همان صفحه بنویس!
        </p>
      </div>
    </div>
  );
}

function faNum(n: number): string {
  return n.toLocaleString("fa-IR");
}
