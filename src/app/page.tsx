"use client";

import * as React from "react";
import { BookMarked, Menu, Search as SearchIcon, Swords, X } from "lucide-react";
import {
  SLUG_TO_TYPE,
  TYPE_PLURAL_FA,
  TYPE_TO_SLUG,
  type EntityType,
} from "@/components/wow/shared";
import type { Nav } from "@/components/wow/views-list";
import { ListView } from "@/components/wow/views-list";
import { DetailView } from "@/components/wow/views-detail";
import { HomeView, SearchView } from "@/components/wow/views-home";
import { TermsView } from "@/components/wow/views-terms";

type View =
  | { kind: "home" }
  | { kind: "list"; type: EntityType }
  | { kind: "detail"; type: EntityType; id: number }
  | { kind: "search"; q: string }
  | { kind: "terms" };

function parseHash(): View {
  if (typeof window === "undefined") return { kind: "home" };
  const h = window.location.hash.replace(/^#\/?/, "");
  const [path, query] = h.split("?");
  const seg = path.split("/").filter(Boolean);
  const sp = new URLSearchParams(query ?? "");
  if (seg.length === 0) return { kind: "home" };
  if (seg[0] === "search") return { kind: "search", q: sp.get("q") ?? "" };
  if (seg[0] === "terms") return { kind: "terms" };
  const t = SLUG_TO_TYPE[seg[0]];
  if (t) {
    if (seg[1] && Number.isFinite(Number(seg[1]))) {
      return { kind: "detail", type: t, id: Number(seg[1]) };
    }
    return { kind: "list", type: t };
  }
  return { kind: "home" };
}

function toHash(v: View): string {
  switch (v.kind) {
    case "home":
      return "#/";
    case "list":
      return `#/${TYPE_TO_SLUG[v.type]}`;
    case "detail":
      return `#/${TYPE_TO_SLUG[v.type]}/${v.id}`;
    case "search":
      return `#/search?q=${encodeURIComponent(v.q)}`;
    case "terms":
      return "#/terms";
  }
}

const NAV_ITEMS: Array<{ type: EntityType; label: string }> = [
  { type: "item", label: TYPE_PLURAL_FA.item },
  { type: "npc", label: TYPE_PLURAL_FA.npc },
  { type: "quest", label: TYPE_PLURAL_FA.quest },
  { type: "zone", label: TYPE_PLURAL_FA.zone },
  { type: "spell", label: TYPE_PLURAL_FA.spell },
  { type: "class", label: TYPE_PLURAL_FA.class },
  { type: "race", label: TYPE_PLURAL_FA.race },
  { type: "faction", label: TYPE_PLURAL_FA.faction },
  { type: "achievement", label: TYPE_PLURAL_FA.achievement },
  { type: "news", label: TYPE_PLURAL_FA.news },
];

export default function Page() {
  const [view, setView] = React.useState<View>({ kind: "home" });
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onHash = () => {
      setView(parseHash());
      setMenuOpen(false);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav: Nav = React.useCallback((v) => {
    window.location.hash = toHash(v);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const activeType = view.kind === "list" || view.kind === "detail" ? view.type : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* هدر */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 h-14">
            <button
              onClick={() => nav({ kind: "home" })}
              className="flex items-center gap-2 shrink-0"
              aria-label="ووهِد فارسی — خانه"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gold/15 border border-gold/40">
                <Swords size={17} className="text-gold" />
              </span>
              <span className="font-black text-gold text-lg leading-none hidden sm:block">
                ووهِد فارسی
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto" aria-label="ناوبری اصلی">
              {NAV_ITEMS.map((n) => (
                <button
                  key={n.type}
                  onClick={() => nav({ kind: "list", type: n.type })}
                  className={`px-2.5 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap transition-colors ${
                    activeType === n.type
                      ? "text-gold bg-gold/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-panel-2"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 mr-auto">
              <button
                onClick={() => nav({ kind: "terms" })}
                className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-panel text-[12px] font-medium text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors"
                aria-label="راهنمای واژگان"
              >
                <BookMarked size={14} />
                راهنمای واژگان
              </button>
              <button
                onClick={() => nav({ kind: "search", q: "" })}
                className="flex items-center justify-center w-9 h-9 rounded-md border border-border bg-panel text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors"
                aria-label="جستجو"
              >
                <SearchIcon size={16} />
              </button>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md border border-border bg-panel text-muted-foreground hover:text-gold transition-colors"
                aria-label="منو"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <nav className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-1.5 pb-3 pt-1" aria-label="ناوبری موبایل">
              {NAV_ITEMS.map((n) => (
                <button
                  key={n.type}
                  onClick={() => nav({ kind: "list", type: n.type })}
                  className={`px-3 py-2 rounded-md text-[13px] font-medium text-right border transition-colors ${
                    activeType === n.type
                      ? "text-gold border-gold/40 bg-gold/10"
                      : "text-muted-foreground border-border bg-panel hover:text-foreground"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>
          ) : null}
        </div>
      </header>

      {/* محتوای اصلی */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {view.kind === "home" ? <HomeView nav={nav} /> : null}
        {view.kind === "list" ? <ListView type={view.type} nav={nav} /> : null}
        {view.kind === "detail" ? <DetailView type={view.type} id={view.id} nav={nav} /> : null}
        {view.kind === "search" ? <SearchView q={view.q} nav={nav} /> : null}
        {view.kind === "terms" ? <TermsView /> : null}
      </main>

      {/* فوتر */}
      <footer className="mt-auto border-t border-border bg-panel/60">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <Swords size={16} className="text-gold" />
                <span className="font-bold text-gold">ووهِد فارسی</span>
              </div>
              <p className="text-xs text-muted-foreground leading-6">
                پروژه‌ای داوطلبانه برای جامعه فارسی‌زبان بازیکنان World of Warcraft.
                همه اطلاعات دیتابیس با ترجمه آزاد و برای مقاصد آموزشی ارائه شده است.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <button
                onClick={() => nav({ kind: "terms" })}
                className="text-xs text-gold hover:text-foreground transition-colors"
              >
                راهنمای واژگان
              </button>
              {NAV_ITEMS.slice(0, 6).map((n) => (
                <button
                  key={n.type}
                  onClick={() => nav({ kind: "list", type: n.type })}
                  className="text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-muted-foreground">
              © {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} ووهِد فارسی — برای آزراث!
            </p>
            <p className="text-[11px] text-muted-foreground" dir="ltr">
              World of Warcraft™ is a trademark of Blizzard Entertainment™
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
