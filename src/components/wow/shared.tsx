"use client";

import * as React from "react";
import {
  Axe,
  Biohazard,
  Bird,
  BookOpen,
  Bug,
  Building,
  Castle,
  Check,
  Church,
  CircleDot,
  Compass,
  Crown,
  Dog,
  Eye,
  Fish,
  Flag,
  Flame,
  FlaskConical,
  Flower2,
  Gem,
  Ghost,
  Hand,
  Hammer,
  Hash,
  Hexagon,
  Home,
  Map,
  Mountain,
  Newspaper,
  PawPrint,
  Pickaxe,
  Scroll,
  Shield,
  Ship,
  Shirt,
  Slice,
  Skull,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Swords,
  Sword,
  Target,
  Trees,
  Trophy,
  User,
  Users,
  Wand2,
  Wheat,
  type LucideIcon,
} from "lucide-react";

// ============================ انواع ============================
export type EntityType =
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

export const ENTITY_TYPES: EntityType[] = [
  "item",
  "npc",
  "quest",
  "zone",
  "spell",
  "class",
  "race",
  "faction",
  "achievement",
  "news",
];

export const SLUG_TO_TYPE: Record<string, EntityType> = {
  items: "item",
  npcs: "npc",
  quests: "quest",
  zones: "zone",
  spells: "spell",
  classes: "class",
  races: "race",
  factions: "faction",
  achievements: "achievement",
  news: "news",
};

export const TYPE_TO_SLUG: Record<EntityType, string> = {
  item: "items",
  npc: "npcs",
  quest: "quests",
  zone: "zones",
  spell: "spells",
  class: "classes",
  race: "races",
  faction: "factions",
  achievement: "achievements",
  news: "news",
};

export const TYPE_FA: Record<EntityType, string> = {
  item: "آیتم",
  npc: "موجود",
  quest: "کوئست",
  zone: "منطقه",
  spell: "اسپل",
  class: "کلاس",
  race: "نژاد",
  faction: "جناح",
  achievement: "دستاورد",
  news: "خبر",
};

export const TYPE_PLURAL_FA: Record<EntityType, string> = {
  item: "آیتم‌ها",
  npc: "موجودات",
  quest: "کوئست‌ها",
  zone: "مناطق",
  spell: "اسپل‌ها",
  class: "کلاس‌ها",
  race: "نژادها",
  faction: "جناح‌ها",
  achievement: "دستاوردها",
  news: "اخبار",
};

// ============================ برچسب‌های فارسی ============================
export const QUALITY_FA: Record<string, string> = {
  poor: "افتضاح",
  common: "معمولی",
  uncommon: "غیرمعمولی",
  rare: "کمیاب",
  epic: "حماسی",
  legendary: "افسانه‌ای",
};

export const ITEM_CLASS_FA: Record<string, string> = {
  armor: "زره",
  weapon: "سلاح",
  consumable: "مصرفی",
  container: "کیسه",
  "trade-goods": "کالای تجاری",
  quest: "کوئستی",
  misc: "متفرقه",
};

export const SLOT_FA: Record<string, string> = {
  head: "سر",
  chest: "سینه",
  legs: "پا",
  wrist: "مچ",
  hands: "دست",
  feet: "قدم",
  shoulders: "شانه",
  back: "پشت",
  weapon: "سلاح",
  "off-hand": "دست غیرمسلط",
  ring: "انگشت",
  neck: "گردن",
  trinket: "ترینکت",
};

export const NPC_TYPE_FA: Record<string, string> = {
  humanoid: "انسانی‌نما",
  beast: "جانور",
  dragonkin: "اژدهایی",
  elemental: "عنصری",
  undead: "مرده‌متحرک",
  demon: "اهریمنی",
  giant: "غول",
  mechanical: "مکانیکی",
  aberration: "ناهنجار",
};

export const CLASSIFICATION_FA: Record<string, string> = {
  normal: "عادی",
  elite: "نخبه",
  rare: "کمیاب",
  "rare-elite": "نخبه کمیاب",
  boss: "باس",
  "world-boss": "باس جهانی",
};

export const QUEST_TYPE_FA: Record<string, string> = {
  normal: "عادی",
  dungeon: "دانجون",
  raid: "رید",
  daily: "روزانه",
  weekly: "هفتگی",
  pvp: "نبرد",
  group: "گروهی",
};

export const SIDE_FA: Record<string, string> = {
  alliance: "اتحادیه",
  horde: "هورد",
  both: "هر دو جناح",
};

export const ZONE_TYPE_FA: Record<string, string> = {
  zone: "منطقه",
  dungeon: "دانجون",
  raid: "رید",
  battleground: "میدان نبرد",
};

export const EXPANSION_FA: Record<string, string> = {
  classic: "کلاسیک",
  tbc: "شکوفایی",
  wotlk: "پادشاه لیک",
  cataclysm: "کاتاکلیسم",
  mop: "میستری",
  legion: "لیجیون",
  bfa: "نبرد برای آزراث",
  shadowlands: "شادولندز",
  dragonflight: "اژدهاسواری",
};

export const SCHOOL_FA: Record<string, string> = {
  fire: "آتش",
  frost: "یخ",
  shadow: "سایه",
  arcane: "آرکان",
  nature: "طبیعت",
  holy: "مقدس",
  physical: "فیزیکی",
};

export const ACHIEVEMENT_CATEGORY_FA: Record<string, string> = {
  general: "عمومی",
  exploration: "کاوش",
  questing: "کوئست",
  pvp: "نبرد",
  raid: "رید",
  profession: "حرفه",
};

export const CLASS_COLORS: Record<string, string> = {
  واریر: "#C79C6E",
  پالادین: "#F58CBA",
  هانتر: "#ABD473",
  راب: "#FFF569",
  پرست: "#FFFFFF",
  شمن: "#0070DE",
  مگ: "#69CCF0",
  وارلوک: "#9482C9",
  دروید: "#FF7D0A",
  "شوالیه مرگ": "#C41F3B",
  مانک: "#00FF96",
  "شکارچی اهریمن": "#A330C9",
};

// ============================ کمکی‌ها ============================
export function faToEnDigits(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function parseJsonSafe<T = unknown>(s: string | null | undefined): T | null {
  if (!s) return null;
  try {
    return JSON.parse(faToEnDigits(s)) as T;
  } catch {
    return null;
  }
}

export function faNum(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("fa-IR");
}

export function faDate(d: string | Date | null | undefined): string {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function copperToGoldText(copper: number | null | undefined): string {
  if (!copper) return "—";
  const gold = Math.floor(copper / 10000);
  const silver = Math.floor((copper % 10000) / 100);
  const copp = copper % 100;
  const parts: string[] = [];
  if (gold) parts.push(`${faNum(gold)} طلا`);
  if (silver) parts.push(`${faNum(silver)} نقره`);
  if (copp) parts.push(`${faNum(copp)} مسی`);
  return parts.length ? parts.join("، ") : "۰";
}

export function qualityClass(q: string | null | undefined): string {
  if (!q || !["poor", "common", "uncommon", "rare", "epic", "legendary"].includes(q)) {
    return "q-common";
  }
  return `q-${q}`;
}

export function schoolColor(school: string | null | undefined): string {
  switch (school) {
    case "fire":
      return "#ff7a45";
    case "frost":
      return "#69CCF0";
    case "shadow":
      return "#b569ff";
    case "arcane":
      return "#d4a5ff";
    case "nature":
      return "#5fd068";
    case "holy":
      return "#ffe680";
    default:
      return "#c9d1e3";
  }
}

export function sideColor(side: string | null | undefined): string {
  switch (side) {
    case "alliance":
      return "#4fa8ff";
    case "horde":
      return "#ff6b6b";
    default:
      return "#c9d1e3";
  }
}

export function classificationColor(cls: string | null | undefined): string {
  switch (cls) {
    case "boss":
    case "world-boss":
      return "#ff5c5c";
    case "elite":
    case "rare-elite":
      return "#f0b429";
    case "rare":
      return "#4fa8ff";
    default:
      return "#98a2b8";
  }
}

// ============================ آیکون‌ها ============================
const ICON_MAP: Record<string, LucideIcon> = {
  sword: Sword,
  swords: Swords,
  axe: Axe,
  hammer: Hammer,
  shield: Shield,
  boneshield: Shield,
  flame: Flame,
  fire: Flame,
  fireball: Flame,
  frost: Snowflake,
  frostbolt: Snowflake,
  frostnova: Snowflake,
  icytouch: Snowflake,
  snow: Snowflake,
  shadow: Hash,
  shadowbolt: Hash,
  arcane: Sparkles,
  arcaneshot: Sparkles,
  nature: Sun,
  holy: Sun,
  physical: Swords,
  zap: Sparkles,
  skull: Skull,
  ghost: Ghost,
  bug: Bug,
  fish: Fish,
  paw: PawPrint,
  bird: Bird,
  target: Target,
  crosshair: Target,
  gem: Gem,
  map: Map,
  book: BookOpen,
  star: Star,
  flag: Flag,
  city: Building,
  dog: Dog,
  wolf: Dog,
  eye: Eye,
  hand: Hand,
  hash: Hash,
  hexagon: Hexagon,
  flaskconical: FlaskConical,
  potion: FlaskConical,
  scroll: Scroll,
  linen: Scroll,
  shirt: Shirt,
  slice: Slice,
  dagger: Slice,
  wand: Wand2,
  staff: Wand2,
  flower2: Flower2,
  peacebloom: Flower2,
  wheat: Wheat,
  plains: Wheat,
  trees: Trees,
  forest: Trees,
  jungle: Trees,
  mountain: Mountain,
  hills: Mountain,
  canyon: Mountain,
  giant: Mountain,
  circledot: CircleDot,
  crater: CircleDot,
  ring: CircleDot,
  church: Church,
  castle: Castle,
  necropolis: Castle,
  crown: Crown,
  ship: Ship,
  user: User,
  troll: User,
  bandit: User,
  wizard: Sparkles,
  home: Home,
  hearthstone: Home,
  check: Check,
  trophy: Trophy,
  users: Users,
  totem: Hexagon,
  rune: Hash,
  fist: Hand,
  bow: Target,
  daggers: Slice,
  biohazard: Biohazard,
  plague: Biohazard,
  mine: Pickaxe,
  copper: Pickaxe,
  compass: Compass,
  newspaper: Newspaper,
};

export function getIcon(key: string | null | undefined): LucideIcon {
  if (!key) return Sparkles;
  return ICON_MAP[key] ?? Sparkles;
}

// ============================ کامپوننت‌های کوچک ============================
export function EntityIcon({
  iconKey,
  className,
  iconClassName,
  size = 20,
}: {
  iconKey?: string | null;
  className?: string;
  iconClassName?: string;
  size?: number;
}) {
  return React.createElement(
    "div",
    {
      className: `flex items-center justify-center rounded-md bg-panel-2 border border-border shrink-0 ${className ?? ""}`,
      style: { width: size + 20, height: size + 20 },
    },
    React.createElement(getIcon(iconKey), {
      className: iconClassName ?? "text-gold",
      size,
      strokeWidth: 1.8,
    })
  );
}

export function Badge({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium border ${className ?? ""}`}
      style={
        color
          ? { color, borderColor: `${color}55`, backgroundColor: `${color}14` }
          : undefined
      }
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  title,
  icon,
  action,
}: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gold">
        {icon}
        {title}
      </h2>
      {action}
    </div>
  );
}
