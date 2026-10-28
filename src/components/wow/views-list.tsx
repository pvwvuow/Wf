"use client";

import * as React from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ACHIEVEMENT_CATEGORY_FA,
  Badge,
  CLASSIFICATION_FA,
  CLASS_COLORS,
  EntityIcon,
  EXPANSION_FA,
  faNum,
  ITEM_CLASS_FA,
  NPC_TYPE_FA,
  QUALITY_FA,
  QUEST_TYPE_FA,
  qualityClass,
  SCHOOL_FA,
  schoolColor,
  SIDE_FA,
  sideColor,
  SLOT_FA,
  TYPE_FA,
  TYPE_PLURAL_FA,
  ZONE_TYPE_FA,
  type EntityType,
} from "./shared";

export interface Nav {
  (view:
    | { kind: "home" }
    | { kind: "list"; type: EntityType }
    | { kind: "detail"; type: EntityType; id: number }
    | { kind: "search"; q: string }
  ): void;
}

// ============================ هوک‌ها ============================
function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ============================ فیلترها ============================
type FilterDef = { key: string; label: string; options: Array<{ value: string; label: string }> };

function filtersFor(type: EntityType): FilterDef[] {
  switch (type) {
    case "item":
      return [
        {
          key: "quality",
          label: "کیفیت",
          options: [
            { value: "legendary", label: QUALITY_FA.legendary },
            { value: "epic", label: QUALITY_FA.epic },
            { value: "rare", label: QUALITY_FA.rare },
            { value: "uncommon", label: QUALITY_FA.uncommon },
            { value: "common", label: QUALITY_FA.common },
            { value: "poor", label: QUALITY_FA.poor },
          ],
        },
        {
          key: "itemClass",
          label: "نوع",
          options: [
            { value: "weapon", label: ITEM_CLASS_FA.weapon },
            { value: "armor", label: ITEM_CLASS_FA.armor },
            { value: "consumable", label: ITEM_CLASS_FA.consumable },
            { value: "trade-goods", label: ITEM_CLASS_FA["trade-goods"] },
            { value: "misc", label: ITEM_CLASS_FA.misc },
          ],
        },
      ];
    case "npc":
      return [
        {
          key: "npcType",
          label: "نوع موجود",
          options: Object.entries(NPC_TYPE_FA).map(([value, label]) => ({ value, label })),
        },
        {
          key: "classification",
          label: "رده",
          options: [
            { value: "boss", label: CLASSIFICATION_FA.boss },
            { value: "world-boss", label: CLASSIFICATION_FA["world-boss"] },
            { value: "elite", label: CLASSIFICATION_FA.elite },
            { value: "rare", label: CLASSIFICATION_FA.rare },
            { value: "normal", label: CLASSIFICATION_FA.normal },
          ],
        },
      ];
    case "quest":
      return [
        {
          key: "questType",
          label: "نوع کوئست",
          options: Object.entries(QUEST_TYPE_FA).map(([value, label]) => ({ value, label })),
        },
        {
          key: "side",
          label: "جناح",
          options: [
            { value: "alliance", label: SIDE_FA.alliance },
            { value: "horde", label: SIDE_FA.horde },
          ],
        },
      ];
    case "zone":
      return [
        {
          key: "zoneType",
          label: "نوع منطقه",
          options: [
            { value: "zone", label: ZONE_TYPE_FA.zone },
            { value: "dungeon", label: ZONE_TYPE_FA.dungeon },
            { value: "raid", label: ZONE_TYPE_FA.raid },
          ],
        },
        {
          key: "continent",
          label: "قاره",
          options: [
            { value: "شرق‌سرزمین", label: "شرق‌سرزمین" },
            { value: "کالیمدور", label: "کالیمدور" },
          ],
        },
      ];
    case "spell":
      return [
        {
          key: "school",
          label: "مکتب جادو",
          options: Object.entries(SCHOOL_FA).map(([value, label]) => ({ value, label })),
        },
      ];
    case "achievement":
      return [
        {
          key: "category",
          label: "دسته",
          options: Object.entries(ACHIEVEMENT_CATEGORY_FA).map(([value, label]) => ({ value, label })),
        },
      ];
    case "race":
    case "faction":
      return [
        {
          key: "side",
          label: "جناح",
          options: [
            { value: "alliance", label: SIDE_FA.alliance },
            { value: "horde", label: SIDE_FA.horde },
          ],
        },
      ];
    default:
      return [];
  }
}

// ============================ سطرها ============================
function ItemRow({ r, nav }: { r: Record<string, unknown>; nav: Nav }) {
  return (
    <button
      onClick={() => nav({ kind: "detail", type: "item", id: r.id as number })}
      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 hover:bg-panel-2 transition-colors p-3 text-right"
    >
      <EntityIcon iconKey={r.icon as string} />
      <div className="flex-1 min-w-0">
        <div className={`font-bold text-sm truncate ${qualityClass(r.quality as string)}`}>
          {r.name as string}
        </div>
        <div className="text-xs text-muted-foreground truncate" dir="ltr">
          {r.nameEn as string}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {r.slot ? <Badge>{SLOT_FA[r.slot as string] ?? (r.slot as string)}</Badge> : null}
        <Badge>{ITEM_CLASS_FA[r.itemClass as string] ?? (r.itemClass as string)}</Badge>
        {r.level ? <Badge color="#f0b429">سطح آیتم {faNum(r.level as number)}</Badge> : null}
      </div>
      <ChevronLeft size={16} className="text-muted-foreground shrink-0" />
    </button>
  );
}

function NpcRow({ r, nav }: { r: Record<string, unknown>; nav: Nav }) {
  const cls = r.classification as string;
  return (
    <button
      onClick={() => nav({ kind: "detail", type: "npc", id: r.id as number })}
      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 hover:bg-panel-2 transition-colors p-3 text-right"
    >
      <EntityIcon iconKey={r.icon as string} />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">{r.name as string}</div>
        <div className="text-xs text-muted-foreground truncate" dir="ltr">
          {r.nameEn as string}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0">
        <Badge>{NPC_TYPE_FA[r.type as string] ?? (r.type as string)}</Badge>
        <Badge color={cls && cls !== "normal" ? "#ff5c5c" : undefined}>
          {CLASSIFICATION_FA[cls] ?? cls}
        </Badge>
        <Badge color="#f0b429">
          سطح {faNum(r.minLevel as number)}
          {r.minLevel !== r.maxLevel ? `-${faNum(r.maxLevel as number)}` : ""}
        </Badge>
      </div>
      <ChevronLeft size={16} className="text-muted-foreground shrink-0" />
    </button>
  );
}

function QuestRow({ r, nav }: { r: Record<string, unknown>; nav: Nav }) {
  return (
    <button
      onClick={() => nav({ kind: "detail", type: "quest", id: r.id as number })}
      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 hover:bg-panel-2 transition-colors p-3 text-right"
    >
      <EntityIcon iconKey="scroll" />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">{r.title as string}</div>
        <div className="text-xs text-muted-foreground truncate" dir="ltr">
          {r.titleEn as string}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0">
        <Badge>{QUEST_TYPE_FA[r.type as string] ?? (r.type as string)}</Badge>
        <Badge color={sideColor(r.side as string)}>{SIDE_FA[r.side as string] ?? (r.side as string)}</Badge>
        <Badge color="#f0b429">حداقل سطح {faNum(r.requiredLevel as number)}</Badge>
      </div>
      <ChevronLeft size={16} className="text-muted-foreground shrink-0" />
    </button>
  );
}

function ZoneRow({ r, nav }: { r: Record<string, unknown>; nav: Nav }) {
  const zt = r.type as string;
  return (
    <button
      onClick={() => nav({ kind: "detail", type: "zone", id: r.id as number })}
      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 hover:bg-panel-2 transition-colors p-3 text-right"
    >
      <EntityIcon iconKey={r.icon as string} />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">{r.name as string}</div>
        <div className="text-xs text-muted-foreground truncate" dir="ltr">
          {r.nameEn as string}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0">
        <Badge color={zt === "raid" ? "#ff5c5c" : zt === "dungeon" ? "#b569ff" : undefined}>
          {ZONE_TYPE_FA[zt] ?? zt}
        </Badge>
        <Badge>{r.continent as string}</Badge>
        <Badge color="#f0b429">
          سطح {faNum(r.minLevel as number)}-{faNum(r.maxLevel as number)}
        </Badge>
      </div>
      <ChevronLeft size={16} className="text-muted-foreground shrink-0" />
    </button>
  );
}

function SpellRow({ r, nav }: { r: Record<string, unknown>; nav: Nav }) {
  return (
    <button
      onClick={() => nav({ kind: "detail", type: "spell", id: r.id as number })}
      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 hover:bg-panel-2 transition-colors p-3 text-right"
    >
      <EntityIcon iconKey={r.icon as string} />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">{r.name as string}</div>
        <div className="text-xs text-muted-foreground truncate" dir="ltr">
          {r.nameEn as string}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {r.className ? (
          <Badge color={CLASS_COLORS[r.className as string]}>{r.className as string}</Badge>
        ) : null}
        <Badge color={schoolColor(r.school as string)}>
          {SCHOOL_FA[r.school as string] ?? (r.school as string)}
        </Badge>
        <Badge color="#f0b429">سطح {faNum(r.requiredLevel as number)}</Badge>
      </div>
      <ChevronLeft size={16} className="text-muted-foreground shrink-0" />
    </button>
  );
}

function SimpleRow({
  r,
  type,
  colorField,
  extra,
  nav,
}: {
  r: Record<string, unknown>;
  type: EntityType;
  colorField?: string;
  extra?: React.ReactNode;
  nav: Nav;
}) {
  return (
    <button
      onClick={() => nav({ kind: "detail", type, id: r.id as number })}
      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 hover:bg-panel-2 transition-colors p-3 text-right"
    >
      <EntityIcon
        iconKey={r.icon as string}
        iconClassName={colorField ? undefined : "text-gold"}
      />
      <div className="flex-1 min-w-0">
        <div
          className="font-bold text-sm truncate"
          style={colorField ? { color: r[colorField] as string } : undefined}
        >
          {((r.name ?? r.title) as string)}
        </div>
        <div className="text-xs text-muted-foreground truncate" dir="ltr">
          {r.nameEn as string}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0">{extra}</div>
      <ChevronLeft size={16} className="text-muted-foreground shrink-0" />
    </button>
  );
}

function NewsRow({ r, nav }: { r: Record<string, unknown>; nav: Nav }) {
  return (
    <button
      onClick={() => nav({ kind: "detail", type: "news", id: r.id as number })}
      className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 hover:bg-panel-2 transition-colors p-3 text-right"
    >
      <EntityIcon iconKey="newspaper" />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm truncate">
          {r.pinned ? "📌 " : ""}
          {r.title as string}
        </div>
        <div className="text-xs text-muted-foreground truncate">{r.excerpt as string}</div>
      </div>
      <div className="hidden md:flex items-center gap-2 shrink-0">
        <Badge color="#f0b429">{r.category as string}</Badge>
        <Badge>{faNum(r.views as number)} بازدید</Badge>
      </div>
      <ChevronLeft size={16} className="text-muted-foreground shrink-0" />
    </button>
  );
}

// ============================ لیست اصلی ============================
export function ListView({
  type,
  initialQuery = "",
  nav,
}: {
  type: EntityType;
  initialQuery?: string;
  nav: Nav;
}) {
  const defs = filtersFor(type);
  const [rows, setRows] = React.useState<Array<Record<string, unknown>>>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [q, setQ] = React.useState(initialQuery);
  const debouncedQ = useDebounced(q);
  const [sel, setSel] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    setPage(1);
  }, [debouncedQ, sel]);

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(false);
      try {
        const sp = new URLSearchParams();
        sp.set("page", String(page));
        sp.set("pageSize", "20");
        if (debouncedQ.trim()) sp.set("q", debouncedQ.trim());
        for (const [k, v] of Object.entries(sel)) if (v) sp.set(k, v);
        const res = await fetch(`/api/db/${type}?${sp.toString()}`);
        if (!res.ok) throw new Error("خطا");
        const json = await res.json();
        if (cancelled) return;
        setRows(json.data ?? []);
        setTotal(json.total ?? 0);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [type, page, debouncedQ, sel]);

  const pages = Math.max(1, Math.ceil(total / 20));

  function renderRow(r: Record<string, unknown>) {
    switch (type) {
      case "item":
        return <ItemRow key={r.id as number} r={r} nav={nav} />;
      case "npc":
        return <NpcRow key={r.id as number} r={r} nav={nav} />;
      case "quest":
        return <QuestRow key={r.id as number} r={r} nav={nav} />;
      case "zone":
        return <ZoneRow key={r.id as number} r={r} nav={nav} />;
      case "spell":
        return <SpellRow key={r.id as number} r={r} nav={nav} />;
      case "news":
        return <NewsRow key={r.id as number} r={r} nav={nav} />;
      case "class":
        return (
          <SimpleRow
            key={r.id as number}
            r={r}
            type={type}
            colorField="color"
            nav={nav}
            extra={
              <>
                <Badge>{r.armorType as string}</Badge>
                <Badge color="#f0b429">{r.role as string}</Badge>
              </>
            }
          />
        );
      case "race":
        return (
          <SimpleRow
            key={r.id as number}
            r={r}
            type={type}
            nav={nav}
            extra={
              <>
                <Badge color={sideColor(r.side as string)}>
                  {SIDE_FA[r.side as string] ?? (r.side as string)}
                </Badge>
                {r.startZone ? <Badge>{r.startZone as string}</Badge> : null}
              </>
            }
          />
        );
      case "faction":
        return (
          <SimpleRow
            key={r.id as number}
            r={r}
            type={type}
            nav={nav}
            extra={
              <>
                <Badge color={sideColor(r.side as string)}>
                  {SIDE_FA[r.side as string] ?? (r.side as string)}
                </Badge>
                {r.zoneName ? <Badge>{r.zoneName as string}</Badge> : null}
              </>
            }
          />
        );
      case "achievement":
        return (
          <SimpleRow
            key={r.id as number}
            r={r}
            type={type}
            nav={nav}
            extra={
              <>
                <Badge>{ACHIEVEMENT_CATEGORY_FA[r.category as string] ?? (r.category as string)}</Badge>
                <Badge color="#f0b429">{faNum(r.points as number)} امتیاز</Badge>
              </>
            }
          />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h1 className="text-2xl font-extrabold text-gold gold-glow">{TYPE_PLURAL_FA[type]}</h1>
        <span className="text-sm text-muted-foreground">{faNum(total)} مورد یافت شد</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`جستجو در ${TYPE_PLURAL_FA[type]}...`}
            className="pr-9 bg-panel border-border"
          />
        </div>
        {defs.map((d) => (
          <select
            key={d.key}
            value={sel[d.key] ?? ""}
            onChange={(e) => setSel((s) => ({ ...s, [d.key]: e.target.value }))}
            className="rounded-md border border-border bg-panel px-3 py-2 text-sm text-foreground outline-none focus:border-gold/60"
            aria-label={d.label}
          >
            <option value="">{d.label}: همه</option>
            {d.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {error ? (
        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
          <AlertTriangle size={32} className="text-destructive" />
          <p>خطا در دریافت داده‌ها</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-gold" size={28} />
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-1">چیزی یافت نشد</p>
          <p className="text-sm">عبارت دیگری را امتحان کنید یا فیلترها را تغییر دهید</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => renderRow(r))}
        </div>
      )}

      {pages > 1 && !loading ? (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="flex items-center gap-1 rounded-md border border-border bg-panel px-3 py-1.5 text-sm disabled:opacity-40 hover:border-gold/50"
          >
            <ChevronRight size={14} />
            قبلی
          </button>
          <span className="text-sm text-muted-foreground">
            صفحه {faNum(page)} از {faNum(pages)}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page >= pages}
            className="flex items-center gap-1 rounded-md border border-border bg-panel px-3 py-1.5 text-sm disabled:opacity-40 hover:border-gold/50"
          >
            بعدی
            <ChevronLeft size={14} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export { TYPE_FA };
