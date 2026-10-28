"use client";

import * as React from "react";
import {
  BookOpen,
  Compass,
  Loader2,
  MapPin,
  Newspaper,
  PawPrint,
  Search,
  Scroll,
  Shield,
  Skull,
  Swords,
  User,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Badge,
  EntityIcon,
  faDate,
  faNum,
  qualityClass,
  classificationColor,
  TYPE_FA,
  type EntityType,
} from "./shared";
import type { Nav } from "./views-list";

interface StatsResponse {
  counts: Record<string, number>;
  legendaries: Array<Record<string, unknown>>;
  bosses: Array<Record<string, unknown>>;
  latestNews: Array<Record<string, unknown>>;
}

const CATEGORY_CARDS: Array<{
  type: EntityType;
  label: string;
  desc: string;
  icon: React.ReactNode;
  countKey: string;
}> = [
  { type: "item", label: "آیتم‌ها", desc: "سلاح‌ها، زره‌ها و کالاهای آزراث", icon: <Shield size={22} />, countKey: "item" },
  { type: "npc", label: "موجودات", desc: "باس‌ها، هیولاها و شخصیت‌های مشهور", icon: <Skull size={22} />, countKey: "npc" },
  { type: "quest", label: "کوئست‌ها", desc: "ماموریت‌ها و داستان‌های نبرد", icon: <Scroll size={22} />, countKey: "quest" },
  { type: "zone", label: "مناطق", desc: "سرزمین‌ها، دانجون‌ها و ریدها", icon: <MapPin size={22} />, countKey: "zone" },
  { type: "spell", label: "اسپل‌ها", desc: "قابلیت‌ها و جادوهای کلاس‌ها", icon: <Swords size={22} />, countKey: "spell" },
  { type: "class", label: "کلاس‌ها", desc: "۱۲ کلاس قهرمانان آزراث", icon: <User size={22} />, countKey: "class" },
  { type: "race", label: "نژادها", desc: "نژادهای اتحادیه و هورد", icon: <PawPrint size={22} />, countKey: "race" },
  { type: "faction", label: "جناح‌ها", desc: "فرقه‌ها و پیمان‌های آزراث", icon: <Users size={22} />, countKey: "faction" },
  { type: "achievement", label: "دستاوردها", desc: "نشانه‌های افتخار و مهارت", icon: <BookOpen size={22} />, countKey: "achievement" },
  { type: "news", label: "اخبار", desc: "تازه‌ترین رویدادهای جامعه", icon: <Newspaper size={22} />, countKey: "news" },
];

export function HomeView({ nav }: { nav: Nav }) {
  const [data, setData] = React.useState<StatsResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        /* خالی رها می‌شود */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim().length >= 2) nav({ kind: "search", q: q.trim() });
  }

  return (
    <div>
      {/* قهرمان */}
      <section className="hero-pattern rounded-xl border border-border bg-panel/60 px-6 py-12 text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-gold gold-glow mb-3">
          ووهِد فارسی
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-8 mb-7">
          بزرگ‌ترین دیتابیس فارسی World of Warcraft — هر آیتم، موجود، کوئست و منطقه‌ای
          که در جستجویش هستید، به زبان فارسی و در یک جا.
        </p>
        <form onSubmit={submitSearch} className="max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو در دیتابیس... مثلاً فراست‌مورن"
              className="pr-10 bg-panel border-border h-11"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-gold px-5 text-sm font-bold text-primary-foreground hover:bg-gold/90 transition-colors"
          >
            جستجو
          </button>
        </form>
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["فراست‌مورن", "راگناروس", "مطلوب: هوگر!", "دگردیسی", "جنگل الون"].map((s) => (
            <button
              key={s}
              onClick={() => nav({ kind: "search", q: s })}
              className="text-xs rounded-full border border-border bg-panel px-3 py-1 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-gold" size={28} />
        </div>
      ) : data ? (
        <>
          {/* دسته‌بندی‌ها */}
          <section className="mb-12" aria-label="دسته‌بندی دیتابیس">
            <h2 className="text-xl font-bold text-gold mb-5 flex items-center gap-2">
              <Compass size={20} />
              دیتابیس
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {CATEGORY_CARDS.map((c) => (
                <button
                  key={c.type}
                  onClick={() => nav({ kind: "list", type: c.type })}
                  className="group rounded-xl border border-border bg-panel p-4 text-right hover:border-gold/60 hover:bg-panel-2 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold group-hover:scale-110 transition-transform">
                      {c.icon}
                    </span>
                    <span className="text-[11px] text-muted-foreground bg-panel-2 rounded px-2 py-0.5 border border-border">
                      {faNum(data.counts[c.countKey] ?? 0)}
                    </span>
                  </div>
                  <div className="font-bold text-sm mb-1">{c.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-5">{c.desc}</div>
                </button>
              ))}
            </div>
          </section>

          {/* آیتم‌های افسانه‌ای */}
          {data.legendaries.length ? (
            <section className="mb-12" aria-label="آیتم‌های افسانه‌ای">
              <h2 className="text-xl font-bold text-gold mb-5">افسانه‌های آزراث</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.legendaries.map((it) => (
                  <button
                    key={it.id as number}
                    onClick={() => nav({ kind: "detail", type: "item", id: it.id as number })}
                    className="flex items-start gap-3 rounded-xl border border-[#ff9c3f]/30 bg-gradient-to-l from-[#ff9c3f]/10 to-transparent p-4 text-right hover:border-[#ff9c3f]/60 transition-colors"
                  >
                    <EntityIcon iconKey={it.icon as string} iconClassName="q-legendary" size={24} />
                    <div className="min-w-0">
                      <div className="font-bold text-sm q-legendary truncate">{it.name as string}</div>
                      <div className="text-[11px] text-muted-foreground mt-1" dir="ltr">
                        {it.nameEn as string}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {/* باس‌های مشهور */}
          {data.bosses.length ? (
            <section className="mb-12" aria-label="باس‌های مشهور">
              <h2 className="text-xl font-bold text-gold mb-5">باس‌های مشهور</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.bosses.map((n) => (
                  <button
                    key={n.id as number}
                    onClick={() => nav({ kind: "detail", type: "npc", id: n.id as number })}
                    className="flex items-start gap-3 rounded-xl border border-border bg-panel p-4 text-right hover:border-gold/50 transition-colors"
                  >
                    <EntityIcon iconKey={n.icon as string} iconClassName="text-destructive" size={24} />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm truncate">{n.name as string}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge color={classificationColor(n.classification as string)}>
                          {n.classification === "world-boss" ? "باس جهانی" : "باس"}
                        </Badge>
                        <Badge>سطح {faNum(n.minLevel as number)}</Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {/* اخبار */}
          {data.latestNews.length ? (
            <section aria-label="آخرین اخبار">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gold">آخرین اخبار</h2>
                <button
                  onClick={() => nav({ kind: "list", type: "news" })}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  همه اخبار
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {data.latestNews.map((nw) => (
                  <button
                    key={nw.id as number}
                    onClick={() => nav({ kind: "detail", type: "news", id: nw.id as number })}
                    className="rounded-xl border border-border bg-panel p-4 text-right hover:border-gold/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge color="#f0b429">{nw.category as string}</Badge>
                      <span className="text-[11px] text-muted-foreground">{faDate(nw.createdAt as string)}</span>
                    </div>
                    <div className="font-bold text-sm mb-1.5">
                      {nw.pinned ? "📌 " : ""}
                      {nw.title as string}
                    </div>
                    <p className="text-xs text-muted-foreground leading-6 line-clamp-2">
                      {nw.excerpt as string}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <p className="text-center text-muted-foreground py-10">خطا در بارگذاری آمار</p>
      )}
    </div>
  );
}

// ============================ جستجوی سراسری ============================
const SEARCH_GROUPS: Array<{ key: string; type: EntityType; label: string }> = [
  { key: "item", type: "item", label: "آیتم‌ها" },
  { key: "npc", type: "npc", label: "موجودات" },
  { key: "quest", type: "quest", label: "کوئست‌ها" },
  { key: "zone", type: "zone", label: "مناطق" },
  { key: "spell", type: "spell", label: "اسپل‌ها" },
];

export function SearchView({ q, nav }: { q: string; nav: Nav }) {
  const [input, setInput] = React.useState(q);
  const [results, setResults] = React.useState<Record<string, Array<Record<string, unknown>>> | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setInput(q);
  }, [q]);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        if (!cancelled) setResults(json.results ?? {});
      } catch {
        if (!cancelled) setResults({});
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q]);

  const total = results
    ? Object.values(results).reduce((acc, arr) => acc + (arr?.length ?? 0), 0)
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gold gold-glow mb-5">نتایج جستجو</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim().length >= 2) nav({ kind: "search", q: input.trim() });
        }}
        className="relative mb-8"
      >
        <Search size={17} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="جستجو در دیتابیس..."
          className="pr-10 bg-panel border-border h-11"
          autoFocus
        />
      </form>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-gold" size={26} />
        </div>
      ) : q.length < 2 ? (
        <p className="text-center text-muted-foreground py-10">حداقل ۲ نویسه وارد کنید</p>
      ) : total === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-1">نتیجه‌ای برای «{q}» یافت نشد</p>
          <p className="text-sm">املای عبارت را بررسی کنید یا واژه‌ای کوتاه‌تر امتحان کنید</p>
        </div>
      ) : (
        <div className="space-y-8">
          {SEARCH_GROUPS.map((g) => {
            const rows = results?.[g.key] ?? [];
            if (!rows.length) return null;
            return (
              <section key={g.key}>
                <h2 className="text-base font-bold text-gold mb-3">
                  {g.label} <span className="text-muted-foreground text-xs">({faNum(rows.length)})</span>
                </h2>
                <div className="space-y-2">
                  {rows.map((r) => (
                    <button
                      key={r.id as number}
                      onClick={() => nav({ kind: "detail", type: g.type, id: r.id as number })}
                      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 transition-colors p-3 text-right"
                    >
                      <EntityIcon
                        iconKey={r.icon as string}
                        iconClassName={
                          g.type === "item" ? qualityClass(r.quality as string) : undefined
                        }
                        size={16}
                      />
                      <span className="flex-1 min-w-0">
                        <span
                          className={`block text-sm font-bold truncate ${
                            g.type === "item" ? qualityClass(r.quality as string) : ""
                          }`}
                        >
                          {(r.name ?? r.title) as string}
                        </span>
                        <span className="block text-[11px] text-muted-foreground truncate" dir="ltr">
                          {r.nameEn as string}
                        </span>
                      </span>
                      <Badge>{TYPE_FA[g.type]}</Badge>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
