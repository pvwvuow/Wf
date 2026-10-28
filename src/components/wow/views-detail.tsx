"use client";

import * as React from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Coins,
  Eye,
  Flag,
  Loader2,
  MapPin,
  Scroll,
  Star,
  Swords,
} from "lucide-react";
import {
  ACHIEVEMENT_CATEGORY_FA,
  Badge,
  CLASSIFICATION_FA,
  CLASS_COLORS,
  copperToGoldText,
  EntityIcon,
  EXPANSION_FA,
  faDate,
  faNum,
  ITEM_CLASS_FA,
  NPC_TYPE_FA,
  parseJsonSafe,
  qualityClass,
  QUALITY_FA,
  QUEST_TYPE_FA,
  schoolColor,
  SCHOOL_FA,
  SIDE_FA,
  sideColor,
  SLOT_FA,
  TYPE_FA,
  TYPE_PLURAL_FA,
  ZONE_TYPE_FA,
  type EntityType,
} from "./shared";
import { CommentsSection } from "./comments";
import type { Nav } from "./views-list";

interface DetailResponse {
  data: Record<string, unknown> | null;
  comments: Array<{ id: number; author: string; body: string; rating: number; createdAt: string }>;
  related: Record<string, unknown>;
}

function InfoGrid({ items }: { items: Array<{ label: string; value: React.ReactNode }> }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border border-border bg-panel-2 p-3">
          <div className="text-[11px] text-muted-foreground mb-1">{it.label}</div>
          <div className="text-sm font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

function LinkList({
  title,
  rows,
  nav,
  type,
  nameKey,
  qualityKey,
}: {
  title: string;
  rows: Array<Record<string, unknown>> | undefined;
  nav: Nav;
  type: EntityType;
  nameKey?: string;
  qualityKey?: string;
}) {
  if (!rows || rows.length === 0) return null;
  return (
    <section className="mt-8">
      <h3 className="text-base font-bold text-gold mb-3">{title}</h3>
      <div className="space-y-2">
        {rows.map((r) => (
          <button
            key={r.id as number}
            onClick={() => nav({ kind: "detail", type, id: r.id as number })}
            className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 transition-colors p-3 text-right"
          >
            <EntityIcon iconKey={r.icon as string} size={16} />
            <span className={`flex-1 text-sm font-semibold ${qualityKey ? qualityClass(r[qualityKey] as string) : ""}`}>
              {(nameKey ? r[nameKey] : r.name ?? r.title) as string}
            </span>
            <ArrowRight size={14} className="text-muted-foreground" />
          </button>
        ))}
      </div>
    </section>
  );
}

function ChanceBar({ chance }: { chance: number }) {
  const pct = Math.round(chance * 100);
  return (
    <div className="flex items-center gap-2 shrink-0 w-28">
      <div className="h-1.5 flex-1 rounded bg-panel-2 overflow-hidden">
        <div className="h-full bg-gold/70 rounded" style={{ width: `${Math.min(100, pct)}%` }} />
      </div>
      <span className="text-[11px] text-muted-foreground w-9">{faNum(pct)}٪</span>
    </div>
  );
}

export function DetailView({ type, id, nav }: { type: EntityType; id: number; nav: Nav }) {
  const [resp, setResp] = React.useState<DetailResponse | null>(null);
  const [state, setState] = React.useState<"loading" | "error" | "ready">("loading");

  React.useEffect(() => {
    let cancelled = false;
    setState("loading");
    setResp(null);
    (async () => {
      try {
        const res = await fetch(`/api/db/${type}/${id}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (cancelled) return;
        setResp(json);
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [type, id]);

  if (state === "loading") {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-gold" size={30} />
      </div>
    );
  }
  if (state === "error" || !resp || !resp.data) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
        <AlertTriangle size={34} className="text-destructive" />
        <p>این مورد یافت نشد یا خطایی رخ داده است</p>
        <button
          onClick={() => nav({ kind: "list", type })}
          className="text-gold text-sm hover:underline"
        >
          بازگشت به {TYPE_PLURAL_FA[type]}
        </button>
      </div>
    );
  }

  const d = resp.data;
  const related = resp.related ?? {};

  // ============ هدر مشترک ============
  function header(
    name: string,
    nameEn: string | null,
    iconKey: string | null,
    badges: React.ReactNode,
    colorOverride?: string
  ) {
    return (
      <div className="flex items-start gap-4 mb-6">
        <EntityIcon iconKey={iconKey} size={34} className="w-16 h-16" />
        <div className="min-w-0">
          <h1
            className={`text-2xl font-extrabold ${type === "item" ? qualityClass(d.quality as string) : ""}`}
            style={colorOverride ? { color: colorOverride } : undefined}
          >
            {name}
          </h1>
          {nameEn ? (
            <div className="text-sm text-muted-foreground mt-1" dir="ltr">
              {nameEn}
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-2 mt-3">{badges}</div>
        </div>
      </div>
    );
  }

  function backLink() {
    return (
      <button
        onClick={() => nav({ kind: "list", type })}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors mb-5"
      >
        <ArrowRight size={15} />
        بازگشت به {TYPE_PLURAL_FA[type]}
      </button>
    );
  }

  function description(desc: unknown) {
    if (!desc) return null;
    return (
      <p className="text-sm leading-8 text-foreground/85 border-r-2 border-gold/40 pr-4 bg-panel/40 rounded-l-lg p-4 my-5">
        {desc as string}
      </p>
    );
  }

  // ============ رندر بر اساس نوع ============
  let body: React.ReactNode = null;

  if (type === "item") {
    const stats = parseJsonSafe<Record<string, string | number>>(d.stats as string);
    const zone = related.zone as Record<string, unknown> | undefined;
    const droppedBy = (related.droppedBy ?? []) as Array<{
      chance: number;
      npc?: Record<string, unknown>;
    }>;
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            <Badge color="#f0b429">{QUALITY_FA[d.quality as string] ?? (d.quality as string)}</Badge>
            <Badge>{ITEM_CLASS_FA[d.itemClass as string] ?? (d.itemClass as string)}</Badge>
            {d.slot ? <Badge>{SLOT_FA[d.slot as string] ?? (d.slot as string)}</Badge> : null}
            {d.level ? <Badge>سطح آیتم {faNum(d.level as number)}</Badge> : null}
            {d.requiredLevel ? <Badge>نیاز به سطح {faNum(d.requiredLevel as number)}</Badge> : null}
            {d.bindsOn === "pickup" ? <Badge>هنگام برداشتن به شما متصل می‌شود</Badge> : null}
            {d.bindsOn === "equip" ? <Badge>هنگام تجهیز متصل می‌شود</Badge> : null}
          </>
        ))}
        {description(d.description)}
        {stats ? (
          <div className="rounded-lg border border-border bg-panel p-4 mb-5 space-y-2">
            {Object.entries(stats).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span className="text-gold font-semibold">{k}</span>
                <span dir={typeof v === "string" ? "auto" : "ltr"}>{typeof v === "number" ? faNum(v) : (v as string)}</span>
              </div>
            ))}
          </div>
        ) : null}
        <InfoGrid
          items={[
            { label: "قیمت فروش", value: copperToGoldText(d.sellPrice as number) },
            { label: "انباشتنی", value: d.stackable ? "بله" : "خیر" },
            ...(zone
              ? [{ label: "منطقه یافتن", value: (
                  <button onClick={() => nav({ kind: "detail", type: "zone", id: zone.id as number })} className="text-gold hover:underline">
                    {zone.name as string}
                  </button>
                ) }]
              : []),
          ]}
        />
        {droppedBy.length ? (
          <section className="mt-8">
            <h3 className="text-base font-bold text-gold mb-3">از این موجودات می‌افتد</h3>
            <div className="space-y-2">
              {droppedBy.map((x, i) =>
                x.npc ? (
                  <button
                    key={i}
                    onClick={() => nav({ kind: "detail", type: "npc", id: x.npc!.id as number })}
                    className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 transition-colors p-3 text-right"
                  >
                    <EntityIcon iconKey={x.npc.icon as string} size={16} />
                    <span className="flex-1 text-sm font-semibold">{x.npc.name as string}</span>
                    <Badge color="#ff5c5c">{CLASSIFICATION_FA[x.npc.classification as string]}</Badge>
                    <ChanceBar chance={x.chance} />
                  </button>
                ) : null
              )}
            </div>
          </section>
        ) : null}
      </>
    );
  } else if (type === "npc") {
    const zone = related.zone as Record<string, unknown> | undefined;
    const drops = (related.drops ?? []) as Array<{ chance: number; item?: Record<string, unknown> }>;
    const quests = (related.quests ?? []) as Array<Record<string, unknown>>;
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            <Badge>{NPC_TYPE_FA[d.type as string] ?? (d.type as string)}</Badge>
            <Badge color={d.classification !== "normal" ? "#ff5c5c" : undefined}>
              {CLASSIFICATION_FA[d.classification as string] ?? (d.classification as string)}
            </Badge>
            <Badge color="#f0b429">
              سطح {faNum(d.minLevel as number)}
              {d.minLevel !== d.maxLevel ? `-${faNum(d.maxLevel as number)}` : ""}
            </Badge>
            <Badge color={sideColor(d.faction as string)}>
              {SIDE_FA[d.faction as string] ?? (d.faction === "hostile" ? "خزنده" : (d.faction as string))}
            </Badge>
          </>
        ))}
        {description(d.description)}
        <InfoGrid
          items={[
            { label: "سلامتی", value: faNum(d.health as number) },
            { label: "واکنش", value: d.reaction === "hostile" ? "دشمن" : d.reaction === "friendly" ? "دوست" : "خنثی" },
            ...(zone
              ? [{ label: "منطقه", value: (
                  <button onClick={() => nav({ kind: "detail", type: "zone", id: zone.id as number })} className="text-gold hover:underline inline-flex items-center gap-1">
                    <MapPin size={13} />
                    {zone.name as string}
                  </button>
                ) }]
              : []),
            ...(d.location ? [{ label: "مکان دقیق", value: d.location as string }] : []),
          ]}
        />
        {drops.length ? (
          <section className="mt-8">
            <h3 className="text-base font-bold text-gold mb-3">جدول لوت</h3>
            <div className="space-y-2">
              {drops.map((x, i) =>
                x.item ? (
                  <button
                    key={i}
                    onClick={() => nav({ kind: "detail", type: "item", id: x.item!.id as number })}
                    className="w-full flex items-center gap-3 rounded-lg border border-border bg-panel hover:border-gold/50 transition-colors p-3 text-right"
                  >
                    <EntityIcon iconKey={x.item.icon as string} size={16} />
                    <span className={`flex-1 text-sm font-semibold ${qualityClass(x.item.quality as string)}`}>
                      {x.item.name as string}
                    </span>
                    <Badge color="#f0b429">{QUALITY_FA[x.item.quality as string]}</Badge>
                    <ChanceBar chance={x.chance} />
                  </button>
                ) : null
              )}
            </div>
          </section>
        ) : null}
        <LinkList title="کوئست‌های این موجود" rows={quests} nav={nav} type="quest" nameKey="title" />
      </>
    );
  } else if (type === "quest") {
    const zone = related.zone as Record<string, unknown> | undefined;
    const objectives = parseJsonSafe<Array<{ text: string; count: number }>>(d.objectives as string);
    const rewards = parseJsonSafe<{ items?: string[] }>(d.rewards as string);
    body = (
      <>
        {header(d.title as string, d.titleEn as string, null, (
          <>
            <Badge>{QUEST_TYPE_FA[d.type as string] ?? (d.type as string)}</Badge>
            <Badge color={sideColor(d.side as string)}>{SIDE_FA[d.side as string] ?? (d.side as string)}</Badge>
            <Badge color="#f0b429">حداقل سطح {faNum(d.requiredLevel as number)}</Badge>
            {d.questLevel ? <Badge>سطح کوئست {faNum(d.questLevel as number)}</Badge> : null}
            {d.difficulty ? (
              <Badge color={d.difficulty === "hard" ? "#ff5c5c" : d.difficulty === "easy" ? "#5fd068" : "#f0b429"}>
                {d.difficulty === "hard" ? "دشوار" : d.difficulty === "easy" ? "آسان" : "معمولی"}
              </Badge>
            ) : null}
          </>
        ))}
        {description(d.description)}
        {objectives?.length ? (
          <section className="rounded-lg border border-border bg-panel p-4 mb-5">
            <h3 className="text-sm font-bold text-gold mb-3 flex items-center gap-2">
              <Swords size={16} />
              اهداف
            </h3>
            <ul className="space-y-2">
              {objectives.map((o, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check size={15} className="text-gold shrink-0" />
                  <span>{o.text}{o.count > 1 ? ` (${faNum(o.count)})` : ""}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <InfoGrid
          items={[
            ...(d.giverName ? [{ label: "دهنده کوئست", value: d.giverName as string }] : []),
            { label: "تجربه", value: `${faNum(d.experience as number)} XP` },
            { label: "پاداش طلا", value: copperToGoldText(d.goldReward as number) },
            ...(zone
              ? [{ label: "منطقه", value: (
                  <button onClick={() => nav({ kind: "detail", type: "zone", id: zone.id as number })} className="text-gold hover:underline">
                    {zone.name as string}
                  </button>
                ) }]
              : []),
          ]}
        />
        {rewards?.items?.length ? (
          <section className="mt-6 rounded-lg border border-gold/30 bg-gold/5 p-4">
            <h3 className="text-sm font-bold text-gold mb-2 flex items-center gap-2">
              <Coins size={16} />
              پاداش آیتمی
            </h3>
            <ul className="flex flex-wrap gap-2">
              {rewards.items.map((name, i) => (
                <li key={i} className="text-sm rounded-md bg-panel border border-border px-3 py-1.5">
                  {name}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </>
    );
  } else if (type === "zone") {
    const npcs = (related.npcs ?? []) as Array<Record<string, unknown>>;
    const quests = (related.quests ?? []) as Array<Record<string, unknown>>;
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            <Badge color={d.type === "raid" ? "#ff5c5c" : d.type === "dungeon" ? "#b569ff" : undefined}>
              {ZONE_TYPE_FA[d.type as string] ?? (d.type as string)}
            </Badge>
            <Badge>{d.continent as string}</Badge>
            <Badge color="#f0b429">
              سطح {faNum(d.minLevel as number)}-{faNum(d.maxLevel as number)}
            </Badge>
            <Badge>{EXPANSION_FA[d.expansion as string] ?? (d.expansion as string)}</Badge>
            <Badge color={sideColor(d.faction as string)}>{SIDE_FA[d.faction as string] ?? (d.faction as string)}</Badge>
          </>
        ))}
        {description(d.description)}
        <LinkList title="موجودات این منطقه" rows={npcs} nav={nav} type="npc" />
        <LinkList title="کوئست‌های این منطقه" rows={quests} nav={nav} type="quest" nameKey="title" />
      </>
    );
  } else if (type === "spell") {
    const clsColor = CLASS_COLORS[d.className as string];
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            {d.className ? <Badge color={clsColor}>{d.className as string}</Badge> : null}
            <Badge color={schoolColor(d.school as string)}>
              {SCHOOL_FA[d.school as string] ?? (d.school as string)}
            </Badge>
            <Badge color="#f0b429">سطح {faNum(d.requiredLevel as number)}</Badge>
          </>
        ))}
        {description(d.description)}
        <InfoGrid
          items={[
            { label: "زمان احضار", value: d.castTime as string ?? "—" },
            { label: "بازیابی", value: d.cooldown as string ?? "—" },
            { label: "برد", value: d.range as string ?? "—" },
            { label: "هزینه", value: d.cost as string ?? "—" },
          ]}
        />
      </>
    );
  } else if (type === "class") {
    const spells = (related.spells ?? []) as Array<Record<string, unknown>>;
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            <Badge color="#f0b429">{d.role as string}</Badge>
            <Badge>{d.armorType as string}</Badge>
            {d.powerSource ? <Badge>منبع قدرت: {d.powerSource as string}</Badge> : null}
          </>
        ), d.color as string)}
        {description(d.description)}
        <LinkList title="اسپل‌های شاخص این کلاس" rows={spells} nav={nav} type="spell" />
      </>
    );
  } else if (type === "race") {
    const bonuses = parseJsonSafe<Record<string, string>>(d.racialBonus as string);
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            <Badge color={sideColor(d.side as string)}>{SIDE_FA[d.side as string] ?? (d.side as string)}</Badge>
            {d.startZone ? <Badge>منطقه شروع: {d.startZone as string}</Badge> : null}
          </>
        ))}
        {description(d.description)}
        {bonuses ? (
          <div className="rounded-lg border border-border bg-panel p-4 mb-5 space-y-2">
            <h3 className="text-sm font-bold text-gold mb-2 flex items-center gap-2">
              <Star size={15} />
              امتیازهای نژادی
            </h3>
            {Object.entries(bonuses).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span className="text-gold font-semibold">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        ) : null}
      </>
    );
  } else if (type === "faction") {
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            <Badge color={sideColor(d.side as string)}>{SIDE_FA[d.side as string] ?? (d.side as string)}</Badge>
            {d.zoneName ? <Badge>{d.zoneName as string}</Badge> : null}
          </>
        ))}
        {description(d.description)}
      </>
    );
  } else if (type === "achievement") {
    body = (
      <>
        {header(d.name as string, d.nameEn as string, d.icon as string, (
          <>
            <Badge color="#f0b429">{faNum(d.points as number)} امتیاز</Badge>
            <Badge>{ACHIEVEMENT_CATEGORY_FA[d.category as string] ?? (d.category as string)}</Badge>
            <Badge color={sideColor(d.side as string)}>{SIDE_FA[d.side as string] ?? (d.side as string)}</Badge>
          </>
        ))}
        {description(d.description)}
      </>
    );
  } else if (type === "news") {
    const latest = (related.latest ?? []) as Array<Record<string, unknown>>;
    const content = (d.content as string ?? "").split("\n").filter(Boolean);
    body = (
      <>
        {header(d.title as string, null, "newspaper", (
          <>
            <Badge color="#f0b429">{d.category as string}</Badge>
            <Badge>
              <Eye size={12} />
              {faNum(d.views as number)} بازدید
            </Badge>
            <Badge>
              <Clock size={12} />
              {faDate(d.createdAt as string)}
            </Badge>
            <Badge>{d.author as string}</Badge>
          </>
        ))}
        <article className="space-y-4 mb-2">
          {content.map((p, i) => (
            <p key={i} className="text-[15px] leading-9 text-foreground/90">
              {p}
            </p>
          ))}
        </article>
        <LinkList title="اخبار مرتبط" rows={latest} nav={nav} type="news" />
      </>
    );
  }

  return (
    <div>
      {backLink()}
      {body}
      <CommentsSection entityType={type} entityId={id} />
    </div>
  );
}

export { Flag, Scroll };
