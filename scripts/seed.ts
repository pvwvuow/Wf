/**
 * Seed دیتابیس «ووهِد فارسی» — داده‌های World of Warcraft با ترجمه فارسی
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ============================ مناطق ============================
const zonesData = [
  { name: "جنگل الون", nameEn: "Elwynn Forest", continent: "شرق‌سرزمین", type: "zone", minLevel: 1, maxLevel: 10, expansion: "classic", faction: "alliance", icon: "forest", description: "سرزمین زادگاه انسان‌ها، جنگلی سرسبز با روستاهای آرام و مزرعه‌های گندم. زادگاه قهرمانان اتحادیه و محل آغاز سفر تازه‌واردهای انسان. گرگ‌ها و خرس‌های جنگل الون نخستین دشمنان هر قهرمان تازه‌کار هستند." },
  { name: "دوروتار", nameEn: "Durotar", continent: "کالیمدور", type: "zone", minLevel: 1, maxLevel: 10, expansion: "classic", faction: "horde", icon: "canyon", description: "زمین‌های خشک و سرخ سرزمین اورک‌ها. پایتخت اورک‌ها، اورگیمار در شمال این منطقه قرار دارد. عقرب‌ها و کریک‌ها نخستین شکارهای تازه‌واردهای هورد هستند." },
  { name: "مولگور", nameEn: "Mulgore", continent: "کالیمدور", type: "zone", minLevel: 1, maxLevel: 10, expansion: "classic", faction: "horde", icon: "plains", description: "دشت‌های وسیع و چمن‌زاری که سرزمین مادری تائورن‌هاست. تاندر بلاف، شهر بزرگ تائورن‌ها بر فراز تپه‌ها مشرف است و بادهای ملایم، علف‌های بلند را موج می‌دهند." },
  { name: "تیریسفال", nameEn: "Tirisfal Glades", continent: "شرق‌سرزمین", type: "zone", minLevel: 1, maxLevel: 10, expansion: "classic", faction: "horde", icon: "death", description: "سرزمین تاریک و مرموز آنددها. درختان خشکیده و زمین‌های کم‌رنگ، خانه آنان که از گور برخاسته‌اند. کلیسای سوخته بریگن‌فیل و پایتخت زیرزمینی آندرسیتی این‌جاست." },
  { name: "وست‌فال", nameEn: "Westfall", continent: "شرق‌سرزمین", type: "zone", minLevel: 10, maxLevel: 20, expansion: "classic", faction: "alliance", icon: "wheat", description: "دشت‌های خشکیده با مزرعه‌های متروکه. مخفیگاه برادران دیفایس و محل نبرد با راهزنان. مدافعان سالویج گِیل از دهقانان بی‌خانه در برابر راهزنان حمایت می‌کنند." },
  { name: "دره استرنگل‌تورن", nameEn: "Stranglethorn Vale", continent: "شرق‌سرزمین", type: "zone", minLevel: 30, maxLevel: 45, expansion: "classic", faction: "both", icon: "jungle", description: "جنگل بارانی گرمسیری پر از ترول‌ها، مورلاک‌ها و ماجراجویان. نبرد بی‌پایان اتحادیه و هورد در قلب این جنگل جریان دارد و بندر بوگارد قلب تجاری آن است." },
  { name: "تپه‌ماهورهای هیلزبراد", nameEn: "Hillsbrad Foothills", continent: "شرق‌سرزمین", type: "zone", minLevel: 20, maxLevel: 30, expansion: "classic", faction: "both", icon: "hills", description: "تپه‌های سرسبز و باغ‌های چای. میدان نبرد محبوب اتحادیه و هورد در دوران کلاسیک؛ مزرعه تارن‌میل و شهر ساوت‌شور نقطه‌های کلیدی نبردند." },
  { name: "دشت‌های سوزان", nameEn: "Burning Steppes", continent: "شرق‌سرزمین", type: "zone", minLevel: 50, maxLevel: 60, expansion: "classic", faction: "both", icon: "lava", description: "زمین‌های سوخته و آتشفشانی که خاک آن به رنگ خاکستر است. راه ورودی به لانه پرگلاه از همین‌جا می‌گذرد و اژدهایان آتش‌افروز در آسمان آن چرخ می‌زنند." },
  { name: "دهانه اون‌گورو", nameEn: "Un'Goro Crater", continent: "کالیمدور", type: "zone", minLevel: 48, maxLevel: 55, expansion: "classic", faction: "both", icon: "crater", description: "دره‌ای پر از گیاهان غول‌آسا و دایناسورهای باستانی. سرزمینی اسرارآمیز با نیروهای طبیعی عجیب که دانشمندان گنوم درباره راز پیدایش آن بحث می‌کنند." },
  { name: "وینتراسپرینگ", nameEn: "Winterspring", continent: "کالیمدور", type: "zone", minLevel: 55, maxLevel: 60, expansion: "classic", faction: "both", icon: "snow", description: "جنگل همیشه‌پوشیده از برف، خانه فیل‌های پشمالو و سخت‌کیفان‌ها. از سردترین مناطق کالیمدور و محل تمرین شمن‌های یخی است." },
  { name: "اراضی طاعون‌زده شرقی", nameEn: "Eastern Plaguelands", continent: "شرق‌سرزمین", type: "zone", minLevel: 53, maxLevel: 60, expansion: "classic", faction: "both", icon: "plague", description: "سرزمین ویران‌شده به دست طاعون مرده‌متحرک. برج شهرک‌ها و پایگاه‌های سپاه اسکارلت در اینجا قرار دارند و ناکساراماس بر فراز آسمان آن معلق است." },
  { name: "سیلیتوس", nameEn: "Silithus", continent: "کالیمدور", type: "zone", minLevel: 55, maxLevel: 60, expansion: "classic", faction: "both", icon: "desert", description: "بیابان بی‌رحمی که در آن بقایای امپراتوری باستانی اکتسایدز خفته است. تندبادهای شن‌آلود و حشرات غول‌آسا نگهبانان معبد احمارای هستند." },
  { name: "دد ماینز", nameEn: "The Deadmines", continent: "شرق‌سرزمین", type: "dungeon", minLevel: 15, maxLevel: 22, expansion: "classic", faction: "alliance", icon: "mine", description: "معدن متروکه‌ای در وست‌فال که به پایگاه اصلی برادران دیفایس تبدیل شده. اولین امتحان بزرگ قهرمانان اتحادیه؛ ادوین ون‌کلیف با کشتی جنگی‌اش در انتظار شماست." },
  { name: "قلعه نیش‌سایه", nameEn: "Shadowfang Keep", continent: "شرق‌سرزمین", type: "dungeon", minLevel: 18, maxLevel: 24, expansion: "classic", faction: "both", icon: "castle", description: "قلعه‌ای تاریک بر فراز تیرسفال که مرگ‌آور بروکن‌توث با گرگ‌نماهایش در آن حکومت می‌کند. زمزمه‌های رازآلود در راهروهای آن پیچیده است." },
  { name: "صومعه اسکارلت", nameEn: "Scarlet Monastery", continent: "شرق‌سرزمین", type: "dungeon", minLevel: 28, maxLevel: 40, expansion: "classic", faction: "both", icon: "church", description: "چهار بال صومعه متعلق به سپاه مذهبی اسکارلت، فرقه‌ای متعصب که با همه دشمن است. کتابخانه، زندان، باغگاه و کلیسا؛ محبوب‌ترین دانجون کلاسیک." },
  { name: "هسته مذاب", nameEn: "Molten Core", continent: "شرق‌سرزمین", type: "raid", minLevel: 60, maxLevel: 60, expansion: "classic", faction: "both", icon: "fire", description: "نخستین رید بزرگ وارکرفت. جایی که راگناروس، لرد آتش، در اعماق آن خفته است. ۴۰ نفره، حماسی، فراموش‌نشدنی؛ زاده‌شده‌های آتش و غول‌های سنگی نگهبانان راهند." },
  { name: "لانه اونکسیا", nameEn: "Onyxia's Lair", continent: "شرق‌سرزمین", type: "raid", minLevel: 60, maxLevel: 60, expansion: "classic", faction: "both", icon: "dragon", description: "لانه اژدهای سیاه، اونکسیا، دختر دنیس‌استرایف. رید ۴۰ نفره کوتاه اما بی‌اندازه سخت؛ نوس‌ها و نفس‌های آتشین اونکسیا گروه‌های ناهماهنگ را نابود می‌کند." },
  { name: "ناکساراماس", nameEn: "Naxxramas", continent: "شرق‌سرزمین", type: "raid", minLevel: 60, maxLevel: 60, expansion: "classic", faction: "both", icon: "necropolis", description: "ناپولی معلق در آسمان، قلعه کل‌توزاد، دست راست لیک کینگ. سخت‌ترین رید کلاسیک با ۱۵ باس در چهار بال: عنکبوت، طاعون، جنگی و بازتاب." },
];

// ============================ کلاس‌ها ============================
const classesData = [
  { name: "واریر", nameEn: "Warrior", role: "تانک / دمیج فیزیکی", armorType: "ورق‌پوش", color: "#C79C6E", icon: "sword", powerSource: "خشم", description: "استادان سلاح و زره. واریرها از خشم نبرد قدرت می‌گیرند و می‌توانند هم سنگر اصلی گروه باشند و هم دمیج‌رنگار بی‌رحم. سه شاخه اصلی: اسلحه، فیوری و سلاح‌ورزی؛ هر سه بر پایه مدیریت خشم نبرد." },
  { name: "پالادین", nameEn: "Paladin", role: "تانک / هیولر / دمیج", armorType: "ورق‌پوش", color: "#F58CBA", icon: "shield", powerSource: "مانا", description: "شوالیه‌های نور مقدس، نگهبانان اتحادیه. ترکیبی از هیولر قوی، تانک مقاوم و دمیج‌رنگار مقدس. نماد ایمان به نور؛ سپر الهی، برکت‌ها و احیای هم‌رزمان از ابزارهای آنان است." },
  { name: "هانتر", nameEn: "Hunter", role: "دمیج فاصله‌دار", armorType: "زره‌ای", color: "#ABD473", icon: "bow", powerSource: "تمرکز", description: "شکارچیان جانوران وحشی همراه با پت‌هایشان. استاد تیراندازی و تله‌گذاری که از فاصله دور دشمنان را از پا درمی‌آورد و با مارک‌کردن اهداف، گروه را هدایت می‌کند." },
  { name: "راب", nameEn: "Rogue", role: "دمیج نزدیک (میلی)", armorType: "چرم‌پوش", color: "#FFF569", icon: "daggers", powerSource: "انرژی", description: "آدمکش‌های سایه. از تاریکی فرصت می‌سازند و با ترکیب‌های خطرناک، دشمنان را در چند ثانیه نابود می‌کنند. قفل‌گشایی، مسموم‌سازی و پنهان‌کاری از مهارت‌های ویژه‌شان است." },
  { name: "پرست", nameEn: "Priest", role: "هیولر / دمیج فاصله‌دار", armorType: "پارچه‌پوش", color: "#FFFFFF", icon: "holy", powerSource: "مانا", description: "بندگان نور و سایه. بهترین هیولر بازی با ابزارهای متنوع شفا و سپر، و شاخه سایه برای دمیج روانی. کلمه قدرت: سپر و نیایش درمان بخشی از زبان‌زد هر گروه است." },
  { name: "شمن", nameEn: "Shaman", role: "هیولر / دمیج فاصله‌دار", armorType: "زره‌ای", color: "#0070DE", icon: "totem", powerSource: "مانا", description: "داروگران روح که با عناصر گفت‌وگو می‌کنند. توتِم‌هایشان قدرت گروه را دوچندان می‌کند؛ مختص هورد. آذرخش، زنجیره شفا و توتِم خون زمین امضای کارشان است." },
  { name: "مگ", nameEn: "Mage", role: "دمیج فاصله‌دار", armorType: "پارچه‌پوش", color: "#69CCF0", icon: "staff", powerSource: "مانا", description: "استادان جادوی آرکان، آتش و یخ. می‌توانند دشمنان را به گوسفند تبدیل کنند، غذا و آب احضار کنند و از دروازه‌ها عبور کنند. انفجار یخی و گوی آتش از معروف‌ترین قابلیت‌هایشان است." },
  { name: "وارلوک", nameEn: "Warlock", role: "دمیج فاصله‌دار", armorType: "پارچه‌پوش", color: "#9482C9", icon: "flame", powerSource: "مانا / جان", description: "جادوگران تاریک که با ارواح و شیاطین پیمان بسته‌اند. نفرین‌ها، آتش جهنمی و پت‌های شیطانی از ابزارهایشان است. ترساندن دشمنان و احضار اعضای گروه، هنر مخصوص آنان است." },
  { name: "دروید", nameEn: "Druid", role: "تانک / هیولر / دمیج", armorType: "چرم‌پوش", color: "#FF7D0A", icon: "paw", powerSource: "مانا / انرژی / خشم", description: "بیدِ طبیعت با توانایی دگردیسی به خرس، گربه، ماهی و شاهین. منعطف‌ترین کلاس بازی؛ تنها کلاس مشترک هورد و اتحادیه در دوران کهن. شکل خرس برای تانک و شکل گربه برای دمیج." },
  { name: "شوالیه مرگ", nameEn: "Death Knight", role: "تانک / دمیج فیزیکی", armorType: "ورق‌پوش", color: "#C41F3B", icon: "rune", powerSource: "رونیک", description: "قهرمانان برخاسته از مرگ با شمشیرهای رونیک. نخستین کلاس قهرمان بازی که از سطح ۵۵ آغاز می‌شود. لمس یخی، ضربه طاعون و برخاستن دوباره از امضاهای مبارزاتی آنان است." },
  { name: "مانک", nameEn: "Monk", role: "تانک / هیولر / دمیج", armorType: "چرم‌پوش", color: "#00FF96", icon: "fist", powerSource: "انرژی / مانا", description: "راهبان پانداریا که هنر مشت و لگد را با تمرکز درونی آمیخته‌اند. چابک، روان و مهیج برای بازی؛ کیک سیاه‌رگ و کف دست ببر از حرکات پایه آنان است." },
  { name: "شکارچی اهریمن", nameEn: "Demon Hunter", role: "تانک / دمیج فیزیکی", armorType: "چرم‌پوش", color: "#A330C9", icon: "eye", powerSource: "خشم / انرژی جهنمی", description: "شکارچیان دژپوش که برای نبرد با شیاطین، خود را با نیروی جهنم آمیخته‌اند. چشمانشان را با آتش شیطانی جابه‌جا کرده‌اند و دو شاخه: ستیز و ویرانی دارند." },
];

// ============================ نژادها ============================
const racesData = [
  { name: "انسان", nameEn: "Human", side: "alliance", startZone: "جنگل الون", racialBonus: "{\"پرسونا\":\"+۱٪ دمیج حمله\",\"هر روز بیشتر\":\"+۲ روح\"}", icon: "human", description: "ملتی جسور و امیدوار در سرزمین‌های شرقی. پادشاهی استورم‌ویند قلب اتحادیه است و شوالیه‌هایش از دیرباز در جنگ‌های بزرگ آزراث نقش محوری داشته‌اند." },
  { name: "دورف", nameEn: "Dwarf", side: "alliance", startZone: "دان موروگ", racialBonus: "{\"سنگ‌فرم\":\"معافیت از سم و خونریزی\",\"کاوشگر\":\"+۵ مهارت معدنکاری\"}", icon: "dwarf", description: "قومی سرسخت و میخانه‌رو از قبیله خارکاس. استادان معدن و جواهرتراشی که در اعماق کوه‌های خاکستری، رازهای باستانی را نگه می‌دارند." },
  { name: "نایت‌الف", nameEn: "Night Elf", side: "alliance", startZone: "تِلدراسیل", racialBonus: "{\"محو در سایه\":\"پنهان‌کاری شبانه\",\"سریع‌الحرکت\":\"+۱٪ فرار\"}", icon: "elf", description: "فرزندان ستاره‌ها، قومی کهن و درازعمر که جنگل‌های کهن را پاس می‌دارند. درویدها و نگهبانان ماه در میان آنان به شمار می‌روند." },
  { name: "گنوم", nameEn: "Gnome", side: "alliance", startZone: "گنومرگان", racialBonus: "{\"آگاهی فناورانه\":\"+۱۵ مهندسی\",\"هوش چابک\":\"+۳ هوش\"}", icon: "gnome", description: "کوچک‌اند اما نبوغشان بی‌مرز است. مخترعان و مهندسان اتحادیه که گنومرگان، پایتخت فناوری‌شان، از داخل کوه کنده شده است." },
  { name: "درنایی", nameEn: "Draenei", side: "alliance", startZone: "جزایر اکزامار", racialBonus: "{\"هدیه نور\":\"شفا از خود\",\"الهام ارواح\":\"+۱٪ هیولر\"}", icon: "draenei", description: "پناهجویانی نجیب از اراضی افسانه‌ای اوت‌لند که با اکزامار به آزراث رسیدند. اهل شمن‌گری و نور‌پرستی و وفادار به نبیاتا." },
  { name: "اورک", nameEn: "Orc", side: "horde", startZone: "دوروتار", racialBonus: "{\"خون‌خشم\":\"+۲۵٪ ضربه حمله\",\"فرمان\":\"+۵٪ قدرت پت\"}", icon: "orc", description: "قهرمانان افتخار و جنگ. از دنیای درهم‌شده درشت‌نور به آزراث آورده شدند و هورد را بنیان نهادند. ترال، هال‌اسکریم و دووم‌همر نام‌آوران آنان‌اند." },
  { name: "آندد", nameEn: "Undead", side: "horde", startZone: "تیریسفال", racialBonus: "{\"نیایش تاریکی\":\"بازیابی ۷٪ جان\",\"پخش‌شدن\":\"آزادسازی از مهار\"}", icon: "undead", description: "فارسیت‌ها؛ آنان که از سلطه لیک کینگ رها شدند. با مکثی شناخته می‌شوند و آندرسیتی خانه‌شان است. استادان سم‌ها و جادوی تاریک." },
  { name: "تائورن", nameEn: "Tauren", side: "horde", startZone: "مولگور", racialBonus: "{\"موج‌بر\":\"خیرگی ۲ ثانیه\",\"استقامت طبیعی\":\"+۵٪ سلامتی\"}", icon: "tauren", description: "غول‌های آرام دشت‌ها، شمن‌های بزرگ و ستاره‌خوان‌های قدیمی. مولگور سرزمین مادری‌شان است و کرن بلودهوف بزرگ‌ترین پیشوایشان بود." },
  { name: "ترول", nameEn: "Troll", side: "horde", startZone: "اکوهای جزیره", racialBonus: "{\"دیوانگی نبرد\":\"+۲۰٪ سرعت حمله\",\"رج پرش\":\"+۵٪ بازگشت سلامتی\"}", icon: "troll", description: "از کهن‌ترین نژادهای آزراث با امپراتوری‌های باستانی گسترده. اکنون در هورد خانه‌ای یافته‌اند و سنت جادوگربازی و سلاح‌های پرتابی‌شان زبانزد است." },
  { name: "بلاد الف", nameEn: "Blood Elf", side: "horde", startZone: "اِیتریل", racialBonus: "{\"استخراج آرکان\":\"سلب ۲٪ مانا + سکوت دشمن\",\"هوش جادویی\":\"+۳ هوش\"}", icon: "elf", description: "بازماندگان فروپاشی کوئل‌تالاس که به انتقام از پیشوایان بدرقه، به هورد پیوستند. جذاب، تکبر و استاد جادوی آرکان." },
];

// ============================ جناح‌ها ============================
const factionsData = [
  { name: "اتحادیه", nameEn: "Alliance", side: "alliance", zoneName: "شرق‌سرزمین", icon: "lion", description: "اتحادیه بزرگ انسان‌ها، دورف‌ها، نایت‌الف‌ها، گنوم‌ها و درنایی‌ها. شعارشان: «عدالت و نور». از جنگ‌های بزرگ تا سقوط لیک کینگ، همیشه دیوار دفاعی آزراث بوده‌اند." },
  { name: "هورد", nameEn: "Horde", side: "horde", zoneName: "کالیمدور", icon: "wolf", description: "پیمان افتخار اورک‌ها، آنددها، تائورن‌ها، ترول‌ها و بلاد الف‌ها. شعارشان: «خون و افتخار». از خاکستر تحقیر برخاسته‌اند و هرگز ذلت را نمی‌پذیرند." },
  { name: "برادری توریوم", nameEn: "Thorium Brotherhood", side: "both", zoneName: "دشت‌های سوزان", icon: "anvil", description: "فرقه دورف‌های آهنگر استاد که راز ساختن آیتم‌های آتشین و افسانه‌ای هسته مذاب را می‌دانند. فلز توریوم و شعله‌های جاودانه، امضای کارگاه‌هایشان است." },
  { name: "حلقه سناریون", nameEn: "Cenarion Circle", side: "both", zoneName: "دهانه اون‌گورو", icon: "leaf", description: "مجمع درویدها و طبیعت‌گرایان که برای حفظ تعادل طبیعت می‌کوشند. مالتاریس و رماروس از پیشوایان آنان‌اند و پایگاه‌شان در دهانه اون‌گورو است." },
  { name: "سپیده‌دم نقره‌ای", nameEn: "Argent Dawn", side: "both", zoneName: "اراضی طاعون‌زده شرقی", icon: "dawn", description: "فرقه‌ای از قهرمانان هر دو جناح که بی‌گذشت با طاعون مرده‌متحرک و سپاهیان لیک کینگ می‌جنگند. نشان سپیده‌دم نقره‌ای بر سینه هر کسی که به جنگ ناکساراماس رفت، می‌درخشد." },
  { name: "قبیله زاندلار", nameEn: "Zandalar Tribe", side: "both", zoneName: "زول‌گوراب", icon: "mask", description: "قدیمی‌ترین قبیله ترول‌ها که میراث باستانی خدایان گربه‌سان خود را پاس می‌دارد. دانششان درباره تاریخ ترول‌ها از هر کتابخانه‌ای عمیق‌تر است." },
  { name: "شهر استورم‌ویند", nameEn: "Stormwind", side: "alliance", zoneName: "جنگل الون", icon: "city", description: "غرور اتحادیه؛ بزرگ‌ترین شهر انسانی آزراث با دیوارهای بلند و بندر پررونق. واریان ورین و سپس آندوین، فرمانروایان این شهر بودند." },
  { name: "اورگیمار", nameEn: "Orgrimmar", side: "horde", zoneName: "دوروتار", icon: "city", description: "پایتخت چوبی اورک‌ها که ترال آن را بنا نهاد. قلب تپنده هورد؛ دیوارهای خاکستری و استخوان‌های غول‌ها بر دروازه‌هایش نشانه اقتدار است." },
  { name: "سپاه اسکارلت", nameEn: "Scarlet Crusade", side: "both", zoneName: "صومعه اسکارلت", icon: "crusade", description: "فرقه متعصبی که با تبلیغات مذهبی و خشونت بی‌رحمانه، همه غیر از خود را دشمن می‌شمارد. زره‌های سرخ و شعارهای آتشین، نشانه سربازانشان است." },
  { name: "نگهبانان سایه", nameEn: "The Shadow Wardens", side: "both", zoneName: "مرداب زنگار", icon: "warden", description: "گروهی رازآلود از محافظان که با ردپای درویدهای فاسدشده و آلودگی زنگار می‌جنگند. آموزشگاه سخت‌گیرانه‌شان قهرمانان پولادین تحویل داده است." },
];

// ============================ دستاوردها ============================
const achievementsData = [
  { name: "قهرمان صعود", nameEn: "Level Cap", points: 50, category: "general", side: "both", icon: "star", description: "به بالاترین سطح ممکن برس. صعودی سخت اما شیرین؛ ساعت‌ها کوئست، دانجون و بی‌خوابی." },
  { name: "کاوشگر شرق‌سرزمین", nameEn: "Explore Eastern Kingdoms", points: 25, category: "exploration", side: "both", icon: "map", description: "همه مناطق شرق‌سرزمین را کشف کن و نقشه‌ات را کامل کن؛ از تیرسفال تا دشت‌های سوزان." },
  { name: "کاوشگر کالیمدور", nameEn: "Explore Kalimdor", points: 25, category: "exploration", side: "both", icon: "map", description: "تمام گوشه‌های کالیمدور را ببین، از تیرسفال تا سیلیتوس؛ حتی آن بیابان بی‌پایان." },
  { name: "استاد افسانه", nameEn: "The Loremaster", points: 50, category: "questing", side: "both", icon: "book", description: "۱۵۰۰ کوئست را کامل کن و داستان آزراث را از حفظ شو. نام‌آور قصه‌گویان گیلدت خواهی شد." },
  { name: "ساندویچ مشت‌بوکس", nameEn: "Did Somebody Order a Knuckle Sandwich?", points: 10, category: "profession", side: "both", icon: "fist", description: "مهارت خوراک‌پزی خود را به ۴۵۰ برسان. سرآشپز گیلد کسی است که می‌داند چه بپزد!" },
  { name: "بهتر است در آب باشی", nameEn: "Better Off Dred", points: 10, category: "exploration", side: "both", icon: "fish", description: "با ماهیگیری در دهانه اون‌گورو، ماهی باستانی را صید کن. صبوری لازم است!" },
  { name: "سلحشور ۲۵۰۰ کوئست", nameEn: "2500 Quests Completed", points: 50, category: "questing", side: "both", icon: "check", description: "دو هزار و پانصد کوئست کامل؛ یک رکورد واقعی که به زمان و پشتکار فراوان نیاز دارد." },
  { name: "فرمانده جنگ", nameEn: "Master of Arms", points: 20, category: "general", side: "both", icon: "sword", description: "مهارت تمام سلاح‌های کلاس خود را به ۴۰۰ برسان؛ هر تیغه، هر تبر، هر چکش." },
  { name: "دیپلمات", nameEn: "The Diplomat", points: 25, category: "general", side: "both", icon: "handshake", description: "وضعیت محبوب‌بودن با همه جناح‌های بی‌طرف را به محبوب برسان؛ کارهایی که هیچ قهرمانی حاضر به انجامش نیست." },
  { name: "فاتح هسته مذاب", nameEn: "Molten Core Conqueror", points: 100, category: "raid", side: "both", icon: "fire", description: "راگناروس را شکست بده و به فرمانروایی آتش پایان بده. سکوت پس از خفت‌شدن لرد آتش، شکوهمند است." },
  { name: "مرد آخر ایستاده", nameEn: "Last Man Standing", points: 25, category: "pvp", side: "both", icon: "flag", description: "در میدان جنگ، تنها بازمانده تیم خودت باش. وقتی همه افتادند، تو باید بایستی." },
  { name: "یاغی آیتم‌های افسانه‌ای", nameEn: "Legendary Collector", points: 75, category: "general", side: "both", icon: "gem", description: "۵ آیتم افسانه‌ای جمع کن؛ افتخاری که فقط به پایدارها نصیب می‌شود. طلای ناب و هفته‌ها رید!" },
];

// ============================ آیتم‌ها ============================
const itemsData = [
  // افسانه‌ای‌ها
  { name: "فراست‌مورن، شمشیر یخ‌زداده", nameEn: "Frostmourne", quality: "legendary", slot: "weapon", itemClass: "weapon", subclass: "sword", level: 284, requiredLevel: 80, bindsOn: "none", icon: "frostmourne", description: "شمشیر لیک کینگ؛ روح هر که را می‌کشد در خود زندانی می‌کند. «هر روحی که بروی گذشت، طعم شیرین‌تری داشت...»", stats: "{\"دمیج سلاح\":\"۵۹۵ - ۸۹۳\",\"سرعت\":\"۳.۶\",\"قدرت\":141,\"استقامت\":135,\"ضربه بحرانی\":\"+۴۸\"}", sellPrice: 0, stackable: false },
  { name: "تاندرفیوری، تیغه مبارک جوینده باد", nameEn: "Thunderfury, Blessed Blade of the Windseeker", quality: "legendary", slot: "weapon", itemClass: "weapon", subclass: "sword", level: 79, requiredLevel: 60, bindsOn: "pickup", icon: "thunderfury", description: "تیغه افسانه‌ای تورالیون، جوینده باد. آذرخش از آن جاری است و صدای رعد در هر ضربه آن می‌پیچد. گفته می‌شود صدای «بت تر فیوری» هنوز در هسته مذاب طنین‌انداز است.", stats: "{\"دمیج سلاح\":\"۴۴ - ۸۲\",\"سرعت\":\"۱.۹\",\"طبیعت\":\"+۱۶ استقامت\",\"آذرخش فعال\":\"۳۰۰ دمیج\"}", sellPrice: 0, stackable: false },
  { name: "سولفوراس، دست راگناروس", nameEn: "Sulfuras, Hand of Ragnaros", quality: "legendary", slot: "weapon", itemClass: "weapon", subclass: "mace", level: 80, requiredLevel: 60, bindsOn: "pickup", icon: "sulfuras", description: "پتک آتشین لرد آتش؛ ساخته‌شده از فلز مذاب هسته زمین. هر ضربه، دشمنان را با شعله‌های جهنمی می‌سوزاند.", stats: "{\"دمیج سلاح\":\"۲۲۳ - ۳۷۲\",\"سرعت\":\"۳.۷\",\"قدرت\":۱۲, \"استقامت\":۱۹, \"آتش\":\"ضربه آتشین ۵۰\"}", sellPrice: 0, stackable: false },
  { name: "شادومورن، قیچی اندوه", nameEn: "Shadowmourne", quality: "legendary", slot: "weapon", itemClass: "weapon", subclass: "axe", level: 284, requiredLevel: 80, bindsOn: "pickup", icon: "shadowmourne", description: "تبر روح‌نوشت که برای شکستن فراست‌مورن ساخته شد. روح‌های ۵۰ دشمن در آن خوابیده‌اند و طومار آن هرگز سیر نمی‌شود.", stats: "{\"دمیج سلاح\":\"۷۲۱ - ۱۰۸۲\",\"سرعت\":\"۳.۴\",\"قدرت\":198,\"استقامت\":145,\"سایه\":\"+۶۲\"}", sellPrice: 0, stackable: false },
  { name: "گلوی‌های جنگی آزینوت", nameEn: "Warglaives of Azzinoth", quality: "legendary", slot: "weapon", itemClass: "weapon", subclass: "sword", level: 151, requiredLevel: 70, bindsOn: "pickup", icon: "warglaive", description: "گلوی‌های دوقلوی آزینوت که ایلیدن طوفان‌خشم هزار سال با آن‌ها جنگید. حرکات موازی‌شان مانند رقص مرگ است.", stats: "{\"دمیج سلاح\":\"۱۰۷ - ۱۶۳\",\"سرعت\":\"۱.۵\",\"چابکی\":۲۵,\"هجوم\":\"+۲۱\"}", sellPrice: 0, stackable: false },
  { name: "آتیش، عصای بزرگ نگهبان", nameEn: "Atiesh, Greatstaff of the Guardian", quality: "legendary", slot: "weapon", itemClass: "weapon", subclass: "staff", level: 77, requiredLevel: 60, bindsOn: "pickup", icon: "atiesh", description: "عصای مدیو، نگهبان بزرگ تیرسفال. ۴۰ قطعه پراکنده در ناکساراماس و هسته مذاب آن را می‌سازند.", stats: "{\"آرکان\":\"+۲۸ هوش\",\"جادو\":\"+۱۵۰ دمیج جادویی\",\"تله‌پورت\":\"فراخوان گروه\"}", sellPrice: 0, stackable: false },
  // اپیک‌ها
  { name: "اشکاندی، شمشیر بزرگ برادری", nameEn: "Ashkandi, Greatsword of the Brotherhood", quality: "epic", slot: "weapon", itemClass: "weapon", subclass: "sword", level: 77, requiredLevel: 60, bindsOn: "pickup", icon: "ashkandi", description: "شمشیر عظیم نثریون، در لانه اونکسیا یافت می‌شود. «برای برادری» بر تیغه‌اش حک شده است.", stats: "{\"دمیج سلاح\":\"۲۳۰ - ۳۴۵\",\"سرعت\":\"۳.۵\",\"استقامت\":۲۶,\"قدرت\":۳۳}", sellPrice: 125000, stackable: false },
  { name: "اشبرینگر فاسد", nameEn: "Corrupted Ashbringer", quality: "epic", slot: "weapon", itemClass: "weapon", subclass: "sword", level: 89, requiredLevel: 60, bindsOn: "pickup", icon: "ashbringer", description: "شمشیر مقدس که در تاریکی فرو رفت. پس از کشتن چهار کاپیتان اسکارلت، اشبرینگر فاسد صدای مرده‌ها را می‌شنود.", stats: "{\"دمیج سلاح\":\"۲۵۹ - ۳۸۹\",\"سرعت\":\"۳.۷\",\"سایه\":۶۰,\"دمیج مقدس\":\"-۵۰\"}", sellPrice: 145000, stackable: false },
  { name: "زره‌پوش خون‌دندان", nameEn: "Bloodfang Chestpiece", quality: "epic", slot: "chest", itemClass: "armor", subclass: "leather", level: 76, requiredLevel: 60, bindsOn: "pickup", icon: "bloodfang", description: "سینه‌پوش چرمی مجموعه خون‌دندان؛ محبوب راب‌ها و شکارچی اهرمن‌ها. از فسکیویا در هسته مذاب می‌افتد.", stats: "{\"استقامت\":۲۳,\"چابکی\":۳۷,\"چیرگی\":\"+۲\"}", sellPrice: 0, stackable: false },
  { name: "پلات‌های خشم", nameEn: "Legplates of Wrath", quality: "epic", slot: "legs", itemClass: "armor", subclass: "plate", level: 66, requiredLevel: 60, bindsOn: "pickup", icon: "wrath", description: "شلواری از مجموعه خشم واریر؛ تی‌وان در هسته مذاب. پولادینی که در دشت‌های سوزان برای هر واریر آرزوست.", stats: "{\"استقامت\":۳۲,\"قدرت\":۲۸,\"بلوک\":\"+۲٪\"}", sellPrice: 0, stackable: false },
  { name: "روباه یخ‌آتش", nameEn: "Frostfire Robe", quality: "epic", slot: "chest", itemClass: "armor", subclass: "cloth", level: 76, requiredLevel: 60, bindsOn: "pickup", icon: "frostfire", description: "روبای مجموعه یخ‌آتش مگ‌ها؛ تی‌۲ در هسته مذاب. ترکیبی عجیب از سرمای یخ و گرمای آتش.", stats: "{\"استقامت\":۲۲,\"هوش\":۲۶,\"روح\":۲۰,\"دمیج جادویی\":\"+۳۶\"}", sellPrice: 0, stackable: false },
  { name: "کلاه نعمسیس", nameEn: "Nemesis Skullcap", quality: "epic", slot: "head", itemClass: "armor", subclass: "cloth", level: 76, requiredLevel: 60, bindsOn: "pickup", icon: "nemesis", description: "کلاه مجموعه نعمسیس وارلوک‌ها؛ از لورد اینکتافار در آنوبراس می‌افتد. جادوگران تاریک آن را به ستایش می‌گیرند.", stats: "{\"استقامت\":۲۳,\"هوش\":۲۵,\"روح\":۲۴,\"سایه\":\"+۳۳\"}", sellPrice: 0, stackable: false },
  { name: "حلقه اژدهاسواران", nameEn: "Ring of the Dragonriders", quality: "epic", slot: "ring", itemClass: "armor", subclass: "ring", level: 70, requiredLevel: 60, bindsOn: "pickup", icon: "ring", description: "انگشتری از ریشه اژدهایان در استرنگل‌تورن؛ مزد سرداران کهن.", stats: "{\"استقامت\":۱۵,\"چابکی\":۱۸,\"ضربه\":\"+۱٪\"}", sellPrice: 0, stackable: false },
  // کمیاب‌ها
  { name: "داس آکانیت", nameEn: "Arcanite Reaper", quality: "rare", slot: "weapon", itemClass: "weapon", subclass: "axe", level: 57, requiredLevel: 55, bindsOn: "equip", icon: "reaper", description: "تبر دوست سنگین از فلز آکانیت؛ محبوب واریرهای پولادین. در کارگاه‌های آهنگری سطح بالا ساخته می‌شود.", stats: "{\"دمیج سلاح\":\"۱۵۳ - ۲۵۶\",\"سرعت\":\"۳.۸\",\"قدرت\":۱۳,\"دمیج بحرانی\":\"+۲٪\"}", sellPrice: 55000, stackable: false },
  { name: "تیغه دیفایس", nameEn: "Cape of the Brotherhood", quality: "rare", slot: "back", itemClass: "armor", subclass: "cloth", level: 22, requiredLevel: 18, bindsOn: "pickup", icon: "cape", description: "شنل ادوین ون‌کلیف؛ پس از شکست در دد ماینز باقی می‌ماند.", stats: "{\"چابکی\":۷,\"استقامت\":۵,\"زره\":\"۳۵\"}", sellPrice: 0, stackable: false },
  { name: "سپر فریب‌دهنده", nameEn: "Crest of Deceit", quality: "rare", slot: "off-hand", itemClass: "armor", subclass: "shield", level: 33, requiredLevel: 28, bindsOn: "pickup", icon: "shield", description: "سپری از صومعه اسکارلت؛ هرود آن را با خود به گور می‌برد.", stats: "{\"زره\":\"۱۳۵\",\"استقامت\":۱۰,\"بلوک\":\"+۳٪\"}", sellPrice: 0, stackable: false },
  { name: "پلاک نیش‌سایه", nameEn: "Shadowfang Chestplate", quality: "rare", slot: "chest", itemClass: "armor", subclass: "leather", level: 24, requiredLevel: 20, bindsOn: "pickup", icon: "chestplate", description: "سینه‌پوش چرمی از قلعه نیش‌سایه؛ گرگ‌نماها آن را می‌پوشند.", stats: "{\"زره\":\"۹۰\",\"استقامت\":۱۱,\"چابکی\":۸}", sellPrice: 0, stackable: false },
  { name: "پتک بریکن‌توث", nameEn: "Broken Tooth Mace", quality: "rare", slot: "weapon", itemClass: "weapon", subclass: "mace", level: 26, requiredLevel: 22, bindsOn: "pickup", icon: "mace", description: "پتکی که مرگ‌آور بروکن‌توث با آن دیوارهای تیرسفال را می‌لرزاند.", stats: "{\"دمیج سلاح\":\"۴۸ - ۷۴\",\"سرعت\":\"۲.۵\",\"قدرت\":۹}", sellPrice: 0, stackable: false },
  { name: "شمشیر اسکارلت", nameEn: "Scarlet Kris", quality: "rare", slot: "weapon", itemClass: "weapon", subclass: "dagger", level: 35, requiredLevel: 30, bindsOn: "pickup", icon: "dagger", description: "خنجر خونین سرخ‌پوشان؛ سریع و بی‌رحم.", stats: "{\"دمیج سلاح\":\"۳۴ - ۶۵\",\"سرعت\":\"۱.۸\",\"چابکی\":۶,\"دمیج بحرانی\":\"+۱٪\"}", sellPrice: 0, stackable: false },
  { name: "استخوان‌سپر", nameEn: "Bone Shield", quality: "rare", slot: "off-hand", itemClass: "armor", subclass: "shield", level: 44, requiredLevel: 40, bindsOn: "pickup", icon: "boneshield", description: "سپری ساخته‌شده از استخوان‌های غول‌ها در تپه‌های آراچی.", stats: "{\"زره\":\"۱۸۰\",\"استقامت\":۱۴,\"بلوک\":\"+۴٪\"}", sellPrice: 0, stackable: false },
  // غیرمعمولی‌ها
  { name: "شمشیر کوتاه جنگاور", nameEn: "Warrior's Shortsword", quality: "uncommon", slot: "weapon", itemClass: "weapon", subclass: "sword", level: 15, requiredLevel: 10, bindsOn: "equip", icon: "shortsword", description: "شمشیری کوتاه و پولادین برای نخستین قدم‌های نبرد.", stats: "{\"دمیج سلاح\":\"۲۱ - ۳۹\",\"سرعت\":\"۲.۲\",\"قدرت\":۴}", sellPrice: 8500, stackable: false },
  { name: "پلاک الون", nameEn: "Elwynn Breastplate", quality: "uncommon", slot: "chest", itemClass: "armor", subclass: "mail", level: 12, requiredLevel: 8, bindsOn: "pickup", icon: "breastplate", description: "سینه‌پوش زره‌ای از آهنگران جنگل الون.", stats: "{\"زره\":\"۱۴۰\",\"استقامت\":۸}", sellPrice: 4200, stackable: false },
  { name: "حلقه جنگل", nameEn: "Forest Band", quality: "uncommon", slot: "ring", itemClass: "armor", subclass: "ring", level: 14, requiredLevel: 10, bindsOn: "pickup", icon: "ring", description: "انگشتری ساده با حکاکی برگ از جنگل الون.", stats: "{\"روح\":۴,\"هوش\":۳}", sellPrice: 0, stackable: false },
  { name: "پلاک دوروتار", nameEn: "Durotar Chestguard", quality: "uncommon", slot: "chest", itemClass: "armor", subclass: "leather", level: 12, requiredLevel: 8, bindsOn: "pickup", icon: "chestguard", description: "سینه‌پوش چرمی رنگ‌شده به خاک دوروتار.", stats: "{\"زره\":\"۸۵\",\"استقامت\":۷,\"چابکی\":۵}", sellPrice: 3900, stackable: false },
  { name: "پلاک تاندر", nameEn: "Thunder Bracers", quality: "uncommon", slot: "wrist", itemClass: "armor", subclass: "plate", level: 18, requiredLevel: 15, bindsOn: "pickup", icon: "bracers", description: "مچ‌بند ورق‌پوش با نقش رعد از تاندر بلاف.", stats: "{\"زره\":\"۱۱۰\",\"استقامت\":۹}", sellPrice: 5200, stackable: false },
  // معمولی‌ها و افتضاح
  { name: "سنگ کانونی", nameEn: "Hearthstone", quality: "common", slot: null, itemClass: "misc", subclass: "trinket", level: 1, requiredLevel: 1, bindsOn: "pickup", icon: "hearthstone", description: "سنگ جادویی که هر کجا باشد، به کانون خانه می‌برد. همه قهرمانان آن را دارند؛ تنها امید بازگشت.", stats: null, sellPrice: 0, stackable: false },
  { name: "پارچه کتانی", nameEn: "Linen Cloth", quality: "common", slot: null, itemClass: "trade-goods", subclass: "cloth", level: 1, requiredLevel: 1, bindsOn: "none", icon: "linen", description: "پارچه ساده و مقاوم برای نخستین خیاطی‌ها.", stats: null, sellPrice: 50, stackable: true },
  { name: "سنگ معدن مس", nameEn: "Copper Ore", quality: "common", slot: null, itemClass: "trade-goods", subclass: "ore", level: 1, requiredLevel: 1, bindsOn: "none", icon: "copper", description: "سنگ معدنی کهن که در کوره به شمش مس تبدیل می‌شود.", stats: null, sellPrice: 150, stackable: true },
  { name: "گل صلح", nameEn: "Peacebloom", quality: "common", slot: null, itemClass: "trade-goods", subclass: "herb", level: 1, requiredLevel: 1, bindsOn: "none", icon: "peacebloom", description: "گلی سفید و کوچک که در چمن‌زارهای آزراث همه‌جاست.", stats: null, sellPrice: 40, stackable: true },
  { name: "برگ نقره", nameEn: "Silverleaf", quality: "common", slot: null, itemClass: "trade-goods", subclass: "herb", level: 1, requiredLevel: 1, bindsOn: "none", icon: "silverleaf", description: "برگ‌های نقره‌فام که به معجون‌ها خاصیت شفا می‌دهد.", stats: null, sellPrice: 60, stackable: true },
  { name: "معجون سلامتی جزئی", nameEn: "Minor Healing Potion", quality: "common", slot: null, itemClass: "consumable", subclass: "potion", level: 1, requiredLevel: 1, bindsOn: "none", icon: "potion", description: "جان را تا ۹۰ نقطه بازیابی می‌کند. همراه همیشگی هر قهرمان.", stats: null, sellPrice: 25, stackable: true },
  { name: "چوب‌دستی ترک‌خورده", nameEn: "Cracked Staff", quality: "poor", slot: "weapon", itemClass: "weapon", subclass: "staff", level: 1, requiredLevel: 1, bindsOn: "equip", icon: "crackedstaff", description: "چوب‌دستی کهن که عمرش به پایان رسیده؛ تنها ارزشش فروش به بازرگان است.", stats: "{\"دمیج سلاح\":\"۳ - ۵\",\"سرعت\":\"۲.۸\"}", sellPrice: 80, stackable: false },
  { name: "چکش زنگ‌زده", nameEn: "Rusted Hammer", quality: "poor", slot: "weapon", itemClass: "weapon", subclass: "mace", level: 1, requiredLevel: 1, bindsOn: "equip", icon: "rustyhammer", description: "چکشی که سال‌ها زیر باران مانده و زنگار آن را خورده است.", stats: "{\"دمیج سلاح\":\"۲ - ۴\",\"سرعت\":\"۲.۵\"}", sellPrice: 70, stackable: false },
];

// ============================ NPC ها ============================
const npcsData = [
  { name: "راگناروس", nameEn: "Ragnaros the Firelord", type: "elemental", classification: "boss", minLevel: 63, maxLevel: 63, health: 1624750, faction: "hostile", reaction: "hostile", zoneName: "هسته مذاب", location: "قلب هسته مذاب", icon: "ragnaros", description: "لرد آتش؛ فرزند خدایان باستانی که هزار سال در اعماق زمین خفته بود. «برای آتش فراخوانده شدم... و سوزاندن، کار من است!» باوس اصلی هسته مذاب." },
  { name: "اونکسیا", nameEn: "Onyxia", type: "dragonkin", classification: "boss", minLevel: 63, maxLevel: 63, health: 1400000, faction: "hostile", reaction: "hostile", zoneName: "لانه اونکسیا", location: "قلب لانه", icon: "onyxia", description: "اژدهای سیاه، دختر دنیس‌استرایف که در لباس انسانی «لیدی کاترینا پرستور»، دخترخوانده پادشاه استورم‌ویند شد. نفس آتشین و نوس‌های مرگبارش گروه‌های بی‌نظم را نابود می‌کند." },
  { name: "کل‌توزاد", nameEn: "Kel'Thuzad", type: "undead", classification: "boss", minLevel: 63, maxLevel: 63, health: 1500000, faction: "hostile", reaction: "hostile", zoneName: "ناکساراماس", location: "بال بازتاب", icon: "kelthuzad", description: "معمار طاعون و دست راست لیک کینگ. جادوگری که روحش در فروست‌مورن زندانی بود و اکنون در ناپولی معلق بر فراز اراضی طاعون‌زده حکومت می‌کند." },
  { name: "هوگر", nameEn: "Hogger", type: "humanoid", classification: "elite", minLevel: 11, maxLevel: 11, health: 700, faction: "hostile", reaction: "hostile", zoneName: "جنگل الون", location: "جاده الون", icon: "hogger", description: "گنول خشمگین و مشهورترین دشمن تازه‌واردهای اتحادیه. اولین بوس راید ۴۰ نفره هر گیلد کوچکی! «مطلوب: هوگر» نشانی که همه قهرمانان می‌شناسند." },
  { name: "ادوین ون‌کلیف", nameEn: "Edwin VanCleef", type: "humanoid", classification: "boss", minLevel: 22, maxLevel: 22, health: 6200, faction: "hostile", reaction: "hostile", zoneName: "دد ماینز", location: "کشتی جنگی", icon: "vancleef", description: "رهبر برادران دیفایس؛ بنا‌ای که پس از رها شدن توسط پادشاهی، به راهزنی روی آورد. «شما پول نمی‌دهید، اما جانتان را می‌گیریم!»" },
  { name: "مرگ‌آور بروکن‌توث", nameEn: "Deathmaster Dwyer / Fenrus / Wolf Master Nandos", type: "undead", classification: "boss", minLevel: 24, maxLevel: 25, health: 8400, faction: "hostile", reaction: "hostile", zoneName: "قلعه نیش‌سایه", location: "راهرو شمالی", icon: "wolfmaster", description: "فرمانده گرگ‌نماهای قلعه نیش‌سایه. با گرگ‌های وحشی و طلسم‌های تاریکی، قلعه را از هر دشمنی پاک می‌کند." },
  { name: "هرود", nameEn: "Herod", type: "humanoid", classification: "boss", minLevel: 36, maxLevel: 36, health: 16000, faction: "hostile", reaction: "hostile", zoneName: "صومعه اسکارلت", location: "بال کتابخانه", icon: "herod", description: "مربی جنگی سپاه اسکارلت با شمشیر عظیمش. «نفرین بر شما! شما همه خواهید مرد!» چرخش خشم‌آلودش تازه‌واردها را می‌کشد." },
  { name: "لرد اینکتافار", nameEn: "Lord Incantafar", type: "undead", classification: "boss", minLevel: 60, maxLevel: 60, health: 250000, faction: "hostile", reaction: "hostile", zoneName: "صومعه اسکارلت", location: "بال کلیسا", icon: "infectafar", description: "جادوگر مرده‌متحرک سپاه اسکارلت؛ طلسم‌های طاعون و سایه از آستینش می‌ریزد." },
  { name: "غول کوه تارن", nameEn: "Tarn the Mountain Giant", type: "giant", classification: "elite", minLevel: 55, maxLevel: 57, health: 22000, faction: "hostile", reaction: "hostile", zoneName: "دهانه اون‌گورو", location: "غرب دهانه", icon: "giant", description: "غولی سنگ‌دل که در اون‌گورو به جست‌وجوی سنگ‌های آتشین می‌گردد. ضربه پایش زمین را می‌لرزاند." },
  { name: "مورلاک جنگ‌جو", nameEn: "Murloc Warrior", type: "humanoid", classification: "normal", minLevel: 30, maxLevel: 33, health: 1600, faction: "hostile", reaction: "hostile", zoneName: "دره استرنگل‌تورن", location: "سواحل جنوبی", icon: "murloc", description: "مورلاک‌ها؛ مخلوق‌های دوآب خندان و پرخاشگر. «مرگ به همه تازه‌واردها!» صدایشان را هرگز فراموش نمی‌کنید." },
  { name: "ترول خون‌تازه", nameEn: "Bloodscalp Troll", type: "humanoid", classification: "normal", minLevel: 33, maxLevel: 38, health: 2100, faction: "hostile", reaction: "hostile", zoneName: "دره استرنگل‌تورن", location: "پایگاه‌های جنگلی", icon: "troll", description: "قبیله خون‌تازه؛ ترول‌های جنگل که با خودکشی آیینی و سحر سرخ می‌جنگند. مشکل اصلی هر قهرمان ۳۰-۴۰ ساله." },
  { name: "عقرب دوروتار", nameEn: "Scorpid Worker", type: "beast", classification: "normal", minLevel: 3, maxLevel: 5, health: 120, faction: "hostile", reaction: "hostile", zoneName: "دوروتار", location: "دره شکار", icon: "scorpid", description: "عقرب‌های سرخ خاکی دوروتار؛ نخستین شکارهای تازه‌واردهای اورک. گوشتشان برای آشپزی و نیششان برای کیمیاگری مفید است." },
  { name: "گرگ الون", nameEn: "Timber Wolf", type: "beast", classification: "normal", minLevel: 5, maxLevel: 7, health: 200, faction: "hostile", reaction: "hostile", zoneName: "جنگل الون", location: "سراسر جنگل", icon: "wolf", description: "گرگ‌های خاکستری جنگل الون؛ به گله‌ها حمله می‌کنند. پوستشان برای چرم‌کاری و گوشتشان برای آشپزی لازم است." },
  { name: "خرس جنگل", nameEn: "Forest Grizzly", type: "beast", classification: "normal", minLevel: 8, maxLevel: 10, health: 480, faction: "hostile", reaction: "hostile", zoneName: "جنگل الون", location: "شمال جنگل", icon: "bear", description: "خرس‌های تنومند و خشمگین جنگل الون؛ با ناخن‌های بزرگ و خشم بی‌پایان. با احتیاط حمله کنید!" },
  { name: "دیمیناش", nameEn: "Defias Bandit", type: "humanoid", classification: "normal", minLevel: 12, maxLevel: 16, health: 550, faction: "hostile", reaction: "hostile", zoneName: "وست‌فال", location: "مزرعه‌های متروکه", icon: "bandit", description: "راهزنان ماسک‌دار برادران دیفایس؛ در جاده‌های وست‌فال به مسافران می‌تازند. «پولت را بده!» جملگی جملگی مشهورشان است." },
  { name: "دیمیناش ویزارد", nameEn: "Defias Wizard", type: "humanoid", classification: "normal", minLevel: 14, maxLevel: 18, health: 700, faction: "hostile", reaction: "hostile", zoneName: "وست‌فال", location: "کاتاراک", icon: "wizard", description: "جادوگران برادران دیفایس با آتش‌افروزی و سایه. سریع کارشان را تمام می‌کنند." },
  { name: "شبح تیرسفال", nameEn: "Tirisfal Ghost", type: "undead", classification: "normal", minLevel: 4, maxLevel: 8, health: 260, faction: "hostile", reaction: "hostile", zoneName: "تیریسفال", location: "باغگاه سوخته", icon: "ghost", description: "روح‌های بی‌قرار باغگاه‌های تیرسفال که آرامش نمی‌یابند. با طلسم‌های سایه به تازه‌واردها حمله می‌کنند." },
  { name: "مرده‌متحرک تازه‌برخاسته", nameEn: "Fresh Zombie", type: "undead", classification: "normal", minLevel: 5, maxLevel: 9, health: 320, faction: "hostile", reaction: "hostile", zoneName: "تیریسفال", location: "سراسر منطقه", icon: "zombie", description: "طاعون مرده‌متحرک بدن‌های تازه را می‌گیرد و آنان را به سربازان لیک کینگ تبدیل می‌کند." },
  { name: "اژدهای کوچک اون‌گورو", nameEn: "Un'Goro Raptor", type: "beast", classification: "normal", minLevel: 50, maxLevel: 54, health: 4800, faction: "hostile", reaction: "hostile", zoneName: "دهانه اون‌گورو", location: "سراسر دهانه", icon: "raptor", description: "داایناسورهای کوچک و چابک اون‌گورو؛ سریع و خطرناک. پوستشان برای چرم‌کاری سطح بالا ارزشمند است." },
  { name: "سخت‌کیفان وینتراسپرینگ", nameEn: "Winterspring Yeti", type: "humanoid", classification: "normal", minLevel: 55, maxLevel: 58, health: 5600, faction: "hostile", reaction: "hostile", zoneName: "وینتراسپرینگ", location: "غارهای برفی", icon: "yeti", description: "یتی‌های سفید و پشمالوی برف‌ها؛ کوچک اما قوی. پشمشان برای خیاطی و خونشان برای کیمیاگری لازم است." },
  { name: "دروید فاسد", nameEn: "Corrupted Druid", type: "humanoid", classification: "normal", minLevel: 56, maxLevel: 60, health: 5200, faction: "hostile", reaction: "hostile", zoneName: "سیلیتوس", location: "سنگ‌تراش‌ها", icon: "druid", description: "درویدهایی که زنگار طبیعت‌شان را فاسد کرده؛ با شکل خرس و طلسم طبیعی می‌جنگند." },
  { name: "ترال", nameEn: "Thrall", type: "humanoid", classification: "boss", minLevel: 85, maxLevel: 85, health: 3874500, faction: "horde", reaction: "friendly", zoneName: "اورگیمار", location: "تالار اعظم", icon: "thrall", description: "پیشوای هورد؛ واریر شمن‌وار که از بردگی برخاست و اورک‌ها را آزاد کرد. «افتخار، هورد را می‌سازد؛ خون فقط آن را جاری می‌کند.»" },
  { name: "واریان ورین", nameEn: "Varian Wrynn", type: "humanoid", classification: "boss", minLevel: 85, maxLevel: 85, health: 3874500, faction: "alliance", reaction: "friendly", zoneName: "شهر استورم‌ویند", location: "تالار پادشاهان", icon: "varian", description: "پادشاه استورم‌ویند؛ شمشیر شالاما و دو روح در یک تن. «به افتخار اتحادیه!» سردار بی‌باک اتحادیه در همه جنگ‌های بزرگ." },
  { name: "سیلواناس ویند‌رانر", nameEn: "Sylvanas Windrunner", type: "undead", classification: "boss", minLevel: 85, maxLevel: 85, health: 3874500, faction: "horde", reaction: "friendly", zoneName: "آندرسیتی", location: "تالار سلطنتی", icon: "sylvanas", description: "بانوی تاریکی؛ رانجار سابق که به دست آرتاس کشته شد و به‌عنوان باندر برخاست. اکنون پیشوای فارسیت‌هاست و انتقامش هرگز سیر نمی‌شود." },
  { name: "جینا پرادمور", nameEn: "Jaina Proudmoore", type: "humanoid", classification: "elite", minLevel: 80, maxLevel: 80, health: 1520000, faction: "alliance", reaction: "friendly", zoneName: "ترمیفال", location: "برج جادوگر", icon: "jaina", description: "قوی‌ترین مگ زنده آزراث؛ دختر آدمیرال پرادمور و شاگرد منتاویس. در جنگ‌ها بارها بارها اتحادیه را نجات داده است." },
  { name: "کرن بلودهوف", nameEn: "Cairne Bloodhoof", type: "humanoid", classification: "elite", minLevel: 80, maxLevel: 80, health: 1520000, faction: "horde", reaction: "friendly", zoneName: "تاندر بلاف", location: "تالار حکمت", icon: "cairne", description: "رئیس قبیله بلودهوف؛ تائورنی حکیم و شمن‌وار که با ترال هورد را بنیان نهاد. تبر بزرگش و افتخارش زبانزد است." },
  { name: "ایلیدان طوفان‌خشم", nameEn: "Illidan Stormrage", type: "demon", classification: "boss", minLevel: 73, maxLevel: 73, health: 5670000, faction: "hostile", reaction: "hostile", zoneName: "معبد اوت‌لند", location: "تالار شمشیرها", icon: "illidan", description: "شکارچی اهریمن؛ برادر دوقلوی ملفوریون که چشمانش را با آتش شیطانی جابه‌جا کرد. «شما برای این لحظه آماده نبودید!»" },
  { name: "آرتاس منتیل / لیک کینگ", nameEn: "The Lich King", type: "undead", classification: "world-boss", minLevel: 83, maxLevel: 83, health: 8786400, faction: "hostile", reaction: "hostile", zoneName: "قلعه سیاه‌یخ", location: "تاج یخ", icon: "lichking", description: "پادشاه مرده‌متحرک؛ شاهزاده‌ای که برای نجات مردمش شمشیر نفرین‌شده را برداشت و روحش را از دست داد. «همه‌ای که می‌بیند، سرد می‌شود...»" },
];

// ============================ کوئست‌ها ============================
const questsData = [
  { title: "مطلوب: هوگر!", titleEn: "Wanted: Hogger!", requiredLevel: 10, questLevel: 12, type: "normal", side: "alliance", giverName: "مأمور آمارال", zoneName: "جنگل الون", experience: 1200, goldReward: 25, difficulty: "normal", description: "شورای الون برای سرکوب گنول خشمگین موسوم به هوگر جایزه گذاشته است. او در شمال جاده الون لانه کرده و به کاروان‌ها حمله می‌کند. سر او را بیاورید!", objectives: "[{\"text\":\"کشتار هوگر\",\"count\":1}]", rewards: "{\"items\":[\"شمشیر کوتاه جنگاور\"]}" },
  { title: "برادری دیفایس", titleEn: "The Defias Brotherhood", requiredLevel: 15, questLevel: 18, type: "dungeon", side: "alliance", giverName: "مدافع فهرن", zoneName: "وست‌فال", experience: 3400, goldReward: 55, difficulty: "hard", description: "برادران دیفایس در اعماق دد ماینز کشتی جنگی می‌سازند تا به استورم‌ویند حمله کنند. ادوین ون‌کلیف را در کشتی جنگی پیدا و نابود کنید!", objectives: "[{\"text\":\"کشتار ادوین ون‌کلیف\",\"count\":1}]", rewards: "{\"items\":[\"تیغه دیفایس\"]}" },
  { title: "پاک‌سازی معدن", titleEn: "Clearing the Mines", requiredLevel: 15, questLevel: 17, type: "dungeon", side: "alliance", giverName: "کارگر ماین", zoneName: "دد ماینز", experience: 2800, goldReward: 40, difficulty: "normal", description: "دیمیناش‌ها معدن را اشغال کرده‌اند و کارگران بیرون مانده‌اند. ۱۰ راهزن دیفایس را در معدن بکشید تا راه امن شود.", objectives: "[{\"text\":\"کشتار ۱۰ دیمیناش\",\"count\":10}]" },
  { title: "زمزمه‌های تیرسفال", titleEn: "Whispers of Tirisfal", requiredLevel: 5, questLevel: 7, type: "normal", side: "horde", giverName: "مکثی چشم‌سرد", zoneName: "تیریسفال", experience: 850, goldReward: 15, difficulty: "easy", description: "شبح‌های بی‌قرار باغگاه سوخته آرامش ندارند. ۸ شبح تیرسفال را رها کنید تا ارواحشان به سایه بازگردد.", objectives: "[{\"text\":\"رها کردن ۸ شبح\",\"count\":8}]" },
  { title: "طاعون تازه", titleEn: "The New Plague", requiredLevel: 8, questLevel: 10, type: "normal", side: "horde", giverName: "آپوتکاری فارنل", zoneName: "تیریسفال", experience: 1100, goldReward: 20, difficulty: "normal", description: "فارسیت‌ها برای ساخت پادزهر طاعون، نمونه‌های تازه لازم دارند. ۵ نمونه بافت از مرده‌متحرک‌های تازه‌برخاسته جمع کنید.", objectives: "[{\"text\":\"جمع آوری ۵ نمونه بافت\",\"count\":5}]" },
  { title: "شکار گرگ", titleEn: "The Timber Wolf Hunt", requiredLevel: 4, questLevel: 6, type: "normal", side: "alliance", giverName: "هانتر بارن", zoneName: "جنگل الون", experience: 700, goldReward: 12, difficulty: "easy", description: "گرگ‌های الون گله‌های دهقانان را می‌ترسانند. ۸ گرگ جنگل را شکار کنید و ۶ پوست گرگ بیاورید.", objectives: "[{\"text\":\"کشتار ۸ گرگ جنگل\",\"count\":8},{\"text\":\"جمع آوری ۶ پوست گرگ\",\"count\":6}]" },
  { title: "خرس‌های خشمگین", titleEn: "Grizzlies of the Forest", requiredLevel: 8, questLevel: 10, type: "normal", side: "alliance", giverName: "هانتر بارن", zoneName: "جنگل الون", experience: 950, goldReward: 18, difficulty: "normal", description: "خرس‌های تنومند شمال جنگل به مزرعه‌ها می‌ریزند. ۵ خرس جنگل را از پا درآورید.", objectives: "[{\"text\":\"کشتار ۵ خرس جنگل\",\"count\":5}]" },
  { title: "افسانه‌های دهانه اون‌گورو", titleEn: "Legends of Un'Goro", requiredLevel: 48, questLevel: 52, type: "normal", side: "both", giverName: "کاوشگر مارشال", zoneName: "دهانه اون‌گورو", experience: 6800, goldReward: 90, difficulty: "normal", description: "دانشمندان گنوم معتقدند سنگ‌های کریستالی اون‌گورو راز پیدایش آزراث را در خود دارند. ۱۰ کریستال باستانی جمع کنید.", objectives: "[{\"text\":\"جمع آوری ۱۰ کریستال\",\"count\":10}]" },
  { title: "شکار غول کوه", titleEn: "Hunting the Mountain Giant", requiredLevel: 52, questLevel: 55, type: "group", side: "both", giverName: "کاوشگر مارشال", zoneName: "دهانه اون‌گورو", experience: 8200, goldReward: 120, difficulty: "hard", description: "غول کوه تارن به پایگاه کاوشگران حمله کرده. او را در غرب دهانه پیدا و شکست دهید؛ گروه ۳ نفره توصیه می‌شود.", objectives: "[{\"text\":\"کشتار غول کوه تارن\",\"count\":1}]" },
  { title: "پاک‌سازی سواحل", titleEn: "Clearing the Coast", requiredLevel: 30, questLevel: 33, type: "normal", side: "both", giverName: "کاپیتان هانک", zoneName: "دره استرنگل‌تورن", experience: 3200, goldReward: 60, difficulty: "normal", description: "مورلاک‌های جنگ‌جو به قایق‌های بندر بوگارد حمله می‌کنند. ۱۲ مورلاک جنگ‌جو را از سواحل جنوبی پاک کنید.", objectives: "[{\"text\":\"کشتار ۱۲ مورلاک\",\"count\":12}]" },
  { title: "قبیله خون‌تازه", titleEn: "The Bloodscalp Tribe", requiredLevel: 34, questLevel: 38, type: "normal", side: "both", giverName: "کاوشگر نیم", zoneName: "دره استرنگل‌تورن", experience: 4100, goldReward: 75, difficulty: "normal", description: "ترول‌های خون‌تازه به کاروان‌های تجاری حمله می‌کنند. ۱۵ ترول خون‌تازه را در پایگاه‌هایشان بکشید.", objectives: "[{\"text\":\"کشتار ۱۵ ترول خون‌تازه\",\"count\":15}]" },
  { title: "سرکوب اسکارلت", titleEn: "Crushing the Scarlet Crusade", requiredLevel: 30, questLevel: 35, type: "dungeon", side: "both", giverName: "فرمانده مداوی", zoneName: "صومعه اسکارلت", experience: 5500, goldReward: 85, difficulty: "hard", description: "سپاه اسکارلت باید سرکوب شود. هرود، مربی جنگی آنان، در بال کتابخانه با شمشیر عظیمش انتظارتان را می‌کشد. او را بکشید!", objectives: "[{\"text\":\"کشتار هرود\",\"count\":1}]", rewards: "{\"items\":[\"شمشیر اسکارلت\"]}" },
  { title: "گرگ‌نماهای قلعه", titleEn: "Wolves of the Keep", requiredLevel: 20, questLevel: 23, type: "dungeon", side: "both", giverName: "جادوگر آرمان", zoneName: "قلعه نیش‌سایه", experience: 3600, goldReward: 50, difficulty: "normal", description: "مرگ‌آور بروکن‌توث ارتش گرگ‌نما ساخته است. ۱۰ گرگ‌نمای قلعه را نابود کنید و پتک بریکن‌توث را بگیرید.", objectives: "[{\"text\":\"کشتار ۱۰ گرگ‌نما\",\"count\":10}]", rewards: "{\"items\":[\"پتک بریکن‌توث\"]}" },
  { title: "دشت‌های سوزان", titleEn: "The Burning Steppes", requiredLevel: 50, questLevel: 54, type: "normal", side: "both", giverName: "سرباز هال", zoneName: "دشت‌های سوزان", experience: 6200, goldReward: 95, difficulty: "normal", description: "اژدهایان آتش‌افروز آسمان دشت‌ها را آلوده‌اند. ۸ اژدهای آتشین را بکشید و ۵ قلب آتشین برای برادری توریوم جمع کنید.", objectives: "[{\"text\":\"کشتار ۸ اژدها\",\"count\":8},{\"text\":\"جمع آوری ۵ قلب آتشین\",\"count\":5}]" },
  { title: "کریستال‌های باستانی", titleEn: "Ancient Crystals", requiredLevel: 55, questLevel: 58, type: "daily", side: "both", giverName: "حلقه سناریون", zoneName: "سیلیتوس", experience: 5500, goldReward: 110, difficulty: "normal", description: "کوئست روزانه حلقه سناریون: ۱۰ کریستال باستانی از سنگ‌تراش‌های سیلیتوس جمع کنید تا نیروی طلسم‌ها تجدید شود.", objectives: "[{\"text\":\"جمع آوری ۱۰ کریستال\",\"count\":10}]" },
  { title: "نگهبانان طاعون", titleEn: "Plague Wardens", requiredLevel: 53, questLevel: 57, type: "normal", side: "both", giverName: "سپیده‌دم نقره‌ای", zoneName: "اراضی طاعون‌زده شرقی", experience: 7200, goldReward: 100, difficulty: "hard", description: "سپیده‌دم نقره‌ای با مرده‌متحرک‌های طاعون‌زده می‌جنگد. ۱۲ مرده‌متحرک در برج‌های طاعون را از پا درآورید.", objectives: "[{\"text\":\"کشتار ۱۲ مرده‌متحرک\",\"count\":12}]" },
  { title: "یورش یتی‌ها", titleEn: "Yeti Rampage", requiredLevel: 55, questLevel: 58, type: "normal", side: "both", giverName: "شمن بورفور", zoneName: "وینتراسپرینگ", experience: 7800, goldReward: 105, difficulty: "normal", description: "یتی‌ها از غارهای برفی بیرون ریخته‌اند. ۱۰ سخت‌کیفان وینتراسپرینگ را بکشید و ۵ پشم یتی جمع کنید.", objectives: "[{\"text\":\"کشتار ۱۰ یتی\",\"count\":10},{\"text\":\"جمع آوری ۵ پشم یتی\",\"count\":5}]" },
  { title: "لانه اونکسیا", titleEn: "Onyxia's Lair", requiredLevel: 60, questLevel: 60, type: "raid", side: "both", giverName: "پیشوا هالوند", zoneName: "لانه اونکسیا", experience: 0, goldReward: 0, difficulty: "hard", description: "اژدهای سیاه لیدی کاترینا پرستور، در حقیقت اونکسیا، دختر دنیس‌استرایف است. گروه ۴۰ نفره جمع کنید و او را در لانه‌اش شکست دهید!", objectives: "[{\"text\":\"کشتار اونکسیا\",\"count\":1}]", rewards: "{\"items\":[\"حلقه اژدهاسواران\"]}" },
  { title: "قلب هسته مذاب", titleEn: "Heart of the Molten Core", requiredLevel: 60, questLevel: 60, type: "raid", side: "both", giverName: "برادری توریوم", zoneName: "هسته مذاب", experience: 0, goldReward: 0, difficulty: "hard", description: "برای شکست راگناروس، ۴۰ قلب آتشین از زاده‌شده‌های هسته مذاب جمع کنید تا کلید دروازه نهایی باز شود.", objectives: "[{\"text\":\"جمع آوری ۴۰ قلب آتشین\",\"count\":40}]" },
  { title: "آزمون افتخار", titleEn: "Test of Honor", requiredLevel: 20, questLevel: 25, type: "pvp", side: "horde", giverName: "واریر خون", zoneName: "تپه‌ماهورهای هیلزبراد", experience: 2500, goldReward: 45, difficulty: "normal", description: "سربازان اتحادیه در تپه‌های هیلزبراد پدیدار شده‌اند. ۱۰ نفر از آنان را در نبرد شکست دهید و افتخار هورد را پاس دارید.", objectives: "[{\"text\":\"کشتار ۱۰ سرباز اتحادیه\",\"count\":10}]" },
  { title: "چای ساوت‌شور", titleEn: "Southshore Tea", requiredLevel: 25, questLevel: 30, type: "normal", side: "alliance", giverName: "بازرگان ولیام", zoneName: "تپه‌ماهورهای هیلزبراد", experience: 2200, goldReward: 40, difficulty: "easy", description: "باغ‌های چای ساوت‌شور به دست ترول‌ها آسیب دیده. ۱۰ برگ چای خالص جمع کنید تا بازار شهر نجات یابد.", objectives: "[{\"text\":\"جمع آوری ۱۰ برگ چای\",\"count\":10}]" },
  { title: "اقتدار ترول‌های جنگل", titleEn: "Jungle Troll Might", requiredLevel: 40, questLevel: 44, type: "normal", side: "both", giverName: "کاوشگر نیم", zoneName: "دره استرنگل‌تورن", experience: 4800, goldReward: 80, difficulty: "normal", description: "ترول‌های خون‌تازه خدایان کهن خود را بیدار می‌کنند. ۲۰ ترول را بکشید و ۵ طلسم جادوییشان را برای مطالعه ببرید.", objectives: "[{\"text\":\"کشتار ۲۰ ترول\",\"count\":20},{\"text\":\"جمع آوری ۵ طلسم\",\"count\":5}]" },
  { title: "پیغام ترال", titleEn: "Message from Thrall", requiredLevel: 10, questLevel: 12, type: "normal", side: "horde", giverName: "پیغام‌رسان اورگیمار", zoneName: "دوروتار", experience: 900, goldReward: 18, difficulty: "easy", description: "ترال فرمان داده از دشت‌های شمال دوروتار گزارش بیاورید. عقرب‌ها و کریک‌ها را بکشید و راه را امن کنید.", objectives: "[{\"text\":\"کشتار ۸ عقرب دوروتار\",\"count\":8}]" },
  { title: "نوشیرون در انتظار", titleEn: "Naxxramas Awaits", requiredLevel: 60, questLevel: 60, type: "raid", side: "both", giverName: "سپیده‌دم نقره‌ای", zoneName: "ناکساراماس", experience: 0, goldReward: 0, difficulty: "hard", description: "کل‌توزاد در ناپولی معلق بر آسمان انتظارتان را می‌کشد. چهار بال ناکساراماس را پاک کنید و به تالار بازتاب برسید!", objectives: "[{\"text\":\"کشتار کل‌توزاد\",\"count\":1}]" },
];

// ============================ اسپل‌ها ============================
const spellsData = [
  { name: "گوی آتش", nameEn: "Fireball", school: "fire", className: "مگ", requiredLevel: 1, castTime: "۳.۵ ثانیه", cooldown: "ندارد", range: "۴۰ یارد", cost: "۴٪ مانای پایه", icon: "fireball", description: "گوی آتشی به سمت دشمن پرتاب می‌کند و ۴۸ تا ۶۲ دمیج آتشین وارد می‌کند. دمیج با سطح بالا می‌شود." },
  { name: "تیر یخ", nameEn: "Frostbolt", school: "frost", className: "مگ", requiredLevel: 4, castTime: "۳ ثانیه", cooldown: "ندارد", range: "۳۰ یارد", cost: "۵٪ مانای پایه", icon: "frostbolt", description: "تیر یخی که ۳۵ تا ۴۲ دمیج یخی می‌زند و سرعت حرکت دشمن را ۵۰٪ تا ۸ ثانیه کم می‌کند." },
  { name: "دگردیسی", nameEn: "Polymorph", school: "arcane", className: "مگ", requiredLevel: 8, castTime: "۱.۷ ثانیه", cooldown: "۱.۵ ثانیه", range: "۳۰ یارد", cost: "۱۵٪ مانای پایه", icon: "polymorph", description: "دشمن را به گوسفند تبدیل می‌کند! در این حالت نمی‌تواند حمله کند اما با هر ضربه بیدار می‌شود. امضای مگ‌ها." },
  { name: "انفجار یخی", nameEn: "Frost Nova", school: "frost", className: "مگ", requiredLevel: 10, castTime: "بی‌درنگ", cooldown: "۲۵ ثانیه", range: "۱۰ یارد", cost: "۱۲٪ مانای پایه", icon: "frostnova", description: "دشمنان اطراف را در یخ فرو می‌برد و ۸ ثانیه بی‌حرکت می‌کند. ابزار فرار اصلی مگ." },
  { name: "ضربه قهرمانانه", nameEn: "Heroic Strike", school: "physical", className: "واریر", requiredLevel: 1, castTime: "بی‌درنگ", cooldown: "ندارد", range: "نزدیک", cost: "۱۵ خشم", icon: "heroicstrike", description: "ضربه‌ای قوی به ضربه عادی اضافه می‌کند و ۱۲ دمیج بیشتر می‌زند. پایه چرخه حمله واریر." },
  { name: "یورش برقی", nameEn: "Charge", school: "physical", className: "واریر", requiredLevel: 1, castTime: "بی‌درنگ", cooldown: "۱۵ ثانیه", range: "۸ - ۲۵ یارد", cost: "بدون هزینه", icon: "charge", description: "به سمت دشمن می‌تازد، ۸ خشم می‌گیرد و دشمن را ۱ ثانیه گیج می‌کند. آغاز هر نبرد واریر." },
  { name: "گردباد", nameEn: "Whirlwind", school: "physical", className: "واریر", requiredLevel: 36, castTime: "بی‌درنگ", cooldown: "۱۰ ثانیه", range: "۸ یارد", cost: "۲۵ خشم", icon: "whirlwind", description: "چرخش مرگبار که به همه دشمنان اطراف دمیج سلاح می‌زند. در میدان‌های شلوغ امضای واریر فیوری." },
  { name: "اعدام", nameEn: "Execute", school: "physical", className: "واریر", requiredLevel: 24, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۵ یارد", cost: "۱۵ خشم", icon: "execute", description: "تلاش برای کشتن دشمن ضعیف (زیر ۲۰٪ سلامتی)؛ دمیج شدید بسته به خشم اضافی. جمله معروف: «نفرین بر شما!»" },
  { name: "نور مقدس", nameEn: "Holy Light", school: "holy", className: "پالادین", requiredLevel: 1, castTime: "۲.۵ ثانیه", cooldown: "ندارد", range: "۴۰ یارد", cost: "۱۲٪ مانای پایه", icon: "holylight", description: "دوست خود را با نور مقدس شفا می‌دهد و ۱۲۰ تا ۱۵۰ جان بازیابی می‌کند. هیول اصلی پالادین." },
  { name: "سپر الهی", nameEn: "Divine Shield", school: "holy", className: "پالادین", requiredLevel: 6, castTime: "بی‌درنگ", cooldown: "۵ دقیقه", range: "خود", cost: "۸٪ مانای پایه", icon: "divineshield", description: "۸ ثانیه در برابر همه حمله‌ها مصون می‌شوید؛ اما نیمی از سرعت حمله کم می‌شود. «پالادین عسل»!" },
  { name: "دست‌گذاری", nameEn: "Lay on Hands", school: "holy", className: "پالادین", requiredLevel: 10, castTime: "بی‌درنگ", cooldown: "۶۰ دقیقه", range: "۴۰ یارد", cost: "بدون هزینه", icon: "layonhands", description: "دوستان را با تمام جان شفا می‌دهد؛ مساوی با سلامتی کامل. کول‌داون یک‌ساعته؛ در لحظه حساس استفاده کنید!" },
  { name: "شلیک هدفمند", nameEn: "Aimed Shot", school: "physical", className: "هانتر", requiredLevel: 20, castTime: "۳ ثانیه", cooldown: "۱۰ ثانیه", range: "۳۵ یارد", cost: "۲۵۰ مانا", icon: "aimedshot", description: "شلیکی دقیق و سنگین که ۱۵۵ دمیج می‌زند. پایه بازکردن نبرد هانتر." },
  { name: "تیر آرکان", nameEn: "Arcane Shot", school: "arcane", className: "هانتر", requiredLevel: 6, castTime: "بی‌درنگ", cooldown: "۶ ثانیه", range: "۳۵ یارد", cost: "۱۰۰ مانا", icon: "arcaneshot", description: "شلیک سریع جادویی که ۶۰ دمیج آرکان می‌زند؛ بدون نیاز به تیراندازی معمول." },
  { name: "فراخوان جانور", nameEn: "Call Beast", school: "nature", className: "هانتر", requiredLevel: 10, castTime: "بی‌درنگ", cooldown: "۳۰ دقیقه", range: "خود", cost: "بدون هزینه", icon: "callbeast", description: "پت خود را از هر کجای نقشه فراخوان می‌کنید؛ حتی از آن‌سوی دنیا. پت همیشه با شماست!" },
  { name: "پنهان‌کاری", nameEn: "Stealth", school: "physical", className: "راب", requiredLevel: 1, castTime: "بی‌درنگ", cooldown: "۱۰ ثانیه", range: "خود", cost: "بدون هزینه", icon: "stealth", description: "در سایه محو می‌شوید تا دشمنان شما را نبینند. سرعت حرکت کم می‌شود اما فرصت حمله غافلگیرانه می‌گیرید." },
  { name: "ضربه شوم", nameEn: "Sinister Strike", school: "physical", className: "راب", requiredLevel: 1, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۵ یارد", cost: "۴۵ انرژی", icon: "sinister", description: "ضربه‌ای بی‌رحم که ۱۱ دمیج بیشتر می‌زند و ۱ نقطه کمبو می‌سازد. پایه چرخه حمله راب." },
  { name: "خنجر از پشت", nameEn: "Backstab", school: "physical", className: "راب", requiredLevel: 12, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۵ یارد", cost: "۶۰ انرژی", icon: "backstab", description: "به پشت دشمن خنجر می‌زنید و ۱۵۰٪ دمیج سلاح + ۱۵ می‌زنید. حتماً پشت دشمن باید باشید!" },
  { name: "دریدگی", nameEn: "Eviscerate", school: "physical", className: "راب", requiredLevel: 4, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۵ یارد", cost: "۳۵ انرژی", icon: "eviscerate", description: "پایان‌دهنده کمبوها؛ دمیج شدید بر اساس تعداد نقطه‌های کمبو. پنج نقطه یعنی مرگ!" },
  { name: "کلمه قدرت: سپر", nameEn: "Power Word: Shield", school: "holy", className: "پرست", requiredLevel: 6, castTime: "بی‌درنگ", cooldown: "۴ ثانیه", range: "۴۰ یارد", cost: "۱۵٪ مانای پایه", icon: "pwshield", description: "سپری جادویی که دمیج را جذب می‌کند؛ اما صدای هجوم به دشمنان می‌پیوندد. ابزار جان‌بخش هر هیولر." },
  { name: "نیایش درمان", nameEn: "Healing Prayer", school: "holy", className: "پرست", requiredLevel: 26, castTime: "۳ ثانیه", cooldown: "ندارد", range: "۴۰ یارد", cost: "۲۰٪ مانای پایه", icon: "healingprayer", description: "کل گروه را شفا می‌دهد؛ هر عضو ۱۵۰ جان بازیابی می‌کند. در برابر طاعون‌ها حیاتی است." },
  { name: "تیر سایه", nameEn: "Shadow Bolt", school: "shadow", className: "وارلوک", requiredLevel: 1, castTime: "۲.۹ ثانیه", cooldown: "ندارد", range: "۳۰ یارد", cost: "۵٪ مانای پایه", icon: "shadowbolt", description: "تیر سایه‌ای به دشمن می‌اندازد و ۵۲ تا ۵۸ دمیج سایه می‌زند. پایه دمیج وارلوک." },
  { name: "احضار پاگردیده", nameEn: "Summon Voidwalker", school: "shadow", className: "وارلوک", requiredLevel: 10, castTime: "۵ ثانیه", cooldown: "ندارد", range: "خود", cost: "۸۰٪ جان", icon: "voidwalker", description: "پاگردیده‌ای شیطانی احضار می‌کنید که تانک خوبی است و تهدید را جذب می‌کند." },
  { name: "نفرین عذاب", nameEn: "Curse of Agony", school: "shadow", className: "وارلوک", requiredLevel: 8, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۳۰ یارد", cost: "۵٪ مانای پایه", icon: "curse", description: "نفرینی که در ۲۴ ثانیه دمیج فزاینده می‌دهد؛ در پایان بیشترین دمیج را می‌زند." },
  { name: "تیر آذرخش", nameEn: "Lightning Bolt", school: "nature", className: "شمن", requiredLevel: 1, castTime: "۲ ثانیه", cooldown: "ندارد", range: "۳۰ یارد", cost: "۴٪ مانای پایه", icon: "lightning", description: "آذرخشی به دشمن می‌اندازد و ۴۰ دمیج طبیعت می‌زند. پایه دمیج شمن." },
  { name: "زنجیره شفا", nameEn: "Chain Heal", school: "nature", className: "شمن", requiredLevel: 40, castTime: "۲.۵ ثانیه", cooldown: "ندارد", range: "۲۵ یارد", cost: "۱۸٪ مانای پایه", icon: "chainheal", description: "شفایی که از یک عضو گروه به ۳ عضو دیگر می‌جهد؛ هر پرش ۲۰٪ کمتر. امضای شمن‌های هیول." },
  { name: "توتِم خون زمین", nameEn: "Earthbind Totem", school: "nature", className: "شمن", requiredLevel: 12, castTime: "بی‌درنگ", cooldown: "۱۵ ثانیه", range: "خود", cost: "۵٪ مانای پایه", icon: "totem", description: "توتِمی که دشمنان اطراف را ۵۰٪ کند می‌کند؛ برای فرار و کنترل گروه حیاتی است." },
  { name: "خشم طبیعت", nameEn: "Wrath", school: "nature", className: "دروید", requiredLevel: 1, castTime: "۲ ثانیه", cooldown: "ندارد", range: "۳۰ یارد", cost: "۶٪ مانای پایه", icon: "wrath", description: "نیروی طبیعت را به دشمن می‌کوبید؛ ۴۵ دمیج طبیعت. پایه دمیج دروید در فرم انسانی." },
  { name: "شکل گربه", nameEn: "Cat Form", school: "nature", className: "دروید", requiredLevel: 20, castTime: "بی‌درنگ", cooldown: "ندارد", range: "خود", cost: "۳۵٪ مانای پایه", icon: "catform", description: "به گربه تبدیل می‌شوید؛ دمیج فیزیکی چابک با انرژی، مشابه راب. پایه دمیج دروید فروال." },
  { name: "آتش ماه", nameEn: "Moonfire", school: "nature", className: "دروید", requiredLevel: 4, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۳۰ یارد", cost: "۱۳٪ مانای پایه", icon: "moonfire", description: "شعله‌ای ماه‌گونه که فوراً ۳۸ دمیج می‌زند و در ۱۲ ثانیه ۳۲ دمیج بیشتر می‌دهد." },
  { name: "لمس یخی", nameEn: "Icy Touch", school: "frost", className: "شوالیه مرگ", requiredLevel: 55, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۵ یارد", cost: "۱ رون", icon: "icytouch", description: "لمس یخی که ۲۱۰ دمیج یخی می‌زند و تهدید اضافی می‌سازد؛ پایه تانکینگ شوالیه مرگ." },
  { name: "ضربه طاعون", nameEn: "Plague Strike", school: "shadow", className: "شوالیه مرگ", requiredLevel: 55, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۵ یارد", cost: "۱ رون", icon: "plaguestrike", description: "ضربه‌ای طاعون‌آلود که ۱۸۰ دمیج می‌زند و شفا دشمن را ۵۰٪ کم می‌کند." },
  { name: "کیک سیاه‌رگ", nameEn: "Blackout Kick", school: "physical", className: "مانک", requiredLevel: 12, castTime: "بی‌درنگ", cooldown: "ندارد", range: "۵ یارد", cost: "۴۰ انرژی", icon: "blackout", description: "ضربه‌ای چرخان با پای سیاه‌رگ که ۱۸۰٪ دمیج سلاح می‌زند؛ شانس احتمال گیج‌کردن." },
  { name: "یورش جهنمی", nameEn: "Fel Rush", school: "fire", className: "شکارچی اهریمن", requiredLevel: 98, castTime: "بی‌درنگ", cooldown: "۱۰ ثانیه", range: "۱۵ یارد", cost: "بدون هزینه", icon: "felrush", description: "به سمت جلو می‌تازید و دشمنان در مسیر را می‌سوزانید؛ ۱۲۰ دمیج جهنمی. ابزار جابجایی سریع." },
];

// ============================ اخبار ============================
const newsData = [
  { title: "به ووهِد فارسی خوش آمدید!", slug: "welcome-to-wowhead-farsi", excerpt: "بزرگ‌ترین دیتابیس فارسی World of Warcraft افتتاح شد؛ آیتم‌ها، کوئست‌ها، NPC‌ها، اسپل‌ها و همه‌چیز درباره آزراث به زبان فارسی.", content: "سرانجام پس از مدت‌ها انتظار، ووهِد فارسی راه‌اندازی شد؛ نخستین و بزرگ‌ترین دیتابیس فارسی بازی World of Warcraft.\n\nهدف ما ساده است: هر قهرمان ایرانی باید بتواند بدون دغدغه زبانی به اطلاعات دقیق آیتم‌ها، کوئست‌ها، موجودات و مناطق دسترسی داشته باشد. در همین راستا بیش از ۱۵۰ صفحه اطلاعاتی با ترجمه‌ای روان و دقیق آماده کرده‌ایم.\n\nامکانات نسخه نخست شامل جست‌وجوی سراسری در تمام دیتابیس، فیلتر پیشرفته آیتم‌ها بر اساس کیفیت و نوع، جداول لوت موجودات، و سیستم نظرات کاربران است. در هفته‌های آینده راهنمای کلاس‌ها، محاسبه‌گرها و پروفایل کاربری اضافه خواهد شد.\n\nما را از نظرات و پیشنهادهایتان محروم نکنید؛ این سایت برای شما ساخته شده است. «برای آزراث!»", author: "تحریریه ووهِد", category: "اخبار", pinned: true },
  { title: "راهنمای انتخاب کلاس برای تازه‌واردها", slug: "beginner-class-guide", excerpt: "واریر یا مگ؟ هیولر یا تانک؟ راهنمای کامل انتخاب کلاس اول برای بازیکنان تازه‌وارد وارکرفت.", content: "انتخاب کلاس نخستین و مهم‌ترین تصمیم هر قهرمان تازه‌وارد است. هر کلاس سبک بازی متفاوتی دارد و انتخاب درست، تجربه بازی شما را دگرگون می‌کند.\n\nاگر به نزدیک‌ترین نبرد و تحمل ضربه‌ها علاقه دارید، واریر یا پالادین انتخاب خوبی‌اند. واریر با خشم می‌جنگد و قوی‌ترین تانک بازی است؛ پالادین اما علاوه بر تانک بودن، هیولر هم هست و برای شروع آرام‌تر مناسب‌تر است.\n\nاگر ترجیح می‌دهید از فاصله دور بجنگید، مگ و هانتر گزینه‌های اصلی‌اند. مگ با آتش، یخ و آرکان بازی می‌کند و دگردیسی‌اش معروف است؛ هانتر با پت خود تنها می‌جنگد و برای بازی انفرادی عالی است.\n\nبرای آنان که می‌خواهند ستون گروه باشند، پرست و شمن بهترین هیولرها هستند. و اگر از دمیج سنگین و تاکتیک لذت می‌برید، راب و وارلوک در انتظارتان هستند.\n\nنکته طلایی: کلاس را با شخصیت خودتان انتخاب کنید، نه با بهترین بودن در آمارها. قهرمانی که با کلاسش لذت می‌برد، همیشه بهتر بازی می‌کند.", author: "مستر_فلیم", category: "راهنما", pinned: false },
  { title: "تحلیل کامل پچ جدید: تغییرات توازن کلاس‌ها", slug: "patch-analysis", excerpt: "بررسی دقیق تغییرات پچ تازه؛ کدام کلاس‌ها قدرتمند شدند و کدام‌ها باید منتظر تغییر بمانند؟", content: "پچ تازه بازی بزرگ‌ترین تغییرات توازن را از زمان عرضه به همراه داشته است. در این گزارش تغییرات اصلی را مرور می‌کنیم.\n\nواریرهای فیوری بیشترین سود را از این پچ برده‌اند؛ دمیج گردباد ۱۵٪ افزایش یافته و خشم‌گیری در نبردهای گروهی بسیار قابل‌اعتمادتر شده است. انتظار می‌رود حضور واریرها در ریدها به‌طور چشمگیری افزایش یابد.\n\nمگ‌های یخ اما ضربه خورده‌اند؛ زمان کست تیر یخ ۰.۲ ثانیه افزایش یافته که در نگاه اول کم به نظر می‌رسد اما در نبردهای طولانی تاثیر چشمگیر دارد. با این حال انفجار یخی بدون تغییر مانده و مگ‌ها همچنان در کنترل گروه بی‌رقیب‌اند.\n\nدر سمت هیولرها، زنجیره شفای شمن‌ها اکنون تا چهار هدف می‌جهد؛ خبری عالی برای گروه‌های بزرگ رید. نیایش درمان پرست‌ها نیز ۱۰٪ ارزان‌تر شده است.\n\nجمع‌بندی: متا پس از مدت‌ها جابه‌جا شده است. اگر مدت‌هاست کلاس خود را کنار گذاشته‌اید، حالا بهترین زمان بازگشت است.", author: "مستر_فلیم", category: "پچ", pinned: false },
  { title: "چگونه فراست‌مورن را بگیریم؟ راهنمای کامل زنجیره کوئست", slug: "how-to-get-frostmourne", excerpt: "زنجیره ۲۵ کوئستی برای رسیدن به شمشیر افسانه‌ای لیک کینگ؛ از دشت‌های یخی تا تاج یخ.", content: "فراست‌مورن افسانه‌ای‌ترین سلاح تاریخ وارکرفت است؛ شمشیری که آرتاس با آن روح پدرش را گرفت و خودش هم قربانی آن شد. به دست آوردنش سخت‌ترین و طولانی‌ترین زنجیره کوئست بازی است.\n\nمرحله نخست: باید به سطح ۸۰ برسید و «قلعه سیاه‌یخ» را در ناحیه تاج یخ باز کنید. زنجیره با کوئست «صدای درون» از روح آرتاس در برج یخ آغاز می‌شود.\n\nمرحله دوم: جمع‌آوری ۵۰ روح یخ‌زده از سه منطقه؛ این بخش به‌تنهایی ۸ ساعت زمان می‌برد و به یک گروه ۱۰ نفره نیاز دارد. سهمیه هر هفته محدود است پس برنامه‌ریزی کنید.\n\nمرحله سوم: نبرد نهایی با لیک کینگ در تاج یخ. با توجه به اینکه شمشیر را فقط در حالت مبارزه کامل می‌توان برداشت، پس از شکست او باید ۳۰ ثانیه در برابر روح خشمگینش دوام بیاورید.\n\nنکته آخر: شمشیر روح شما را می‌خواهد؛ پس از برداشتن، هیچ‌کس نمی‌داند چه بر سر شما می‌آید. به قول کل‌توزاد: «هر روحی که بروی گذشت، طعم شیرین‌تری داشت...»", author: "لرد_یخ", category: "گاید", pinned: false },
  { title: "برترین گیلدهای ایرانی؛ رقابت بر سر اونکسیا", slug: "top-iranian-guilds", excerpt: "نگاهی به گیلدهای پیشتاز سرورهای ایرانی که در نبردهای لانه اونکسیا رکوردهای تازه ثبت می‌کنند.", content: "رقابت گیلدهای ایرانی این روزها داغ‌تر از همیشه است. در مسابقه کشتن اونکسیا، سه گیلد پیشتاز در فاصله چند دقیقه از هم رکورد ثبت کرده‌اند.\n\nگیلد «شوالیه‌های نور» با زمان ۴ دقیقه و ۲۰ ثانیه در صدر است؛ ترکیب تانک‌های واریر و هیولرهای پرستشان نشان داد که برنامه‌ریزی چند ماهه نتیجه داده است. سرگروه آنان می‌گوید راز موفقیت، تمرین نوس‌های نفس آتش اونکسیا با گروه ۲۰ نفره بوده است.\n\nگیلد «مرداب آتش» اما با استراتژی متفاوتی ظاهر شد: به‌جای تانک سنتی، از دو شوالیه مرگ برای جذب تهدید استفاده کرد و رکورد را تا ۳ دقیقه و ۵۸ ثانیه پایین آورد.\n\nجای خالی گیلدهای هوردی در صدر جدول اما محسوس است؛ ترول‌های سرخ تنها گیلد هوردی در میان ده گیلد برتر است و به گفته سرگروهشان «فقط مشکل کول‌داون توتِم‌ها» مانع رسیدن به رکورد بهتر بوده است.\n\nرقابت بعدی بر سر هسته مذاب است؛ کدام گیلد نخستین گروه ایرانی خواهد بود که راگناروس را می‌کشد؟ ما هم منتظریم.", author: "تحریریه ووهِد", category: "اخبار", pinned: false },
  { title: "راهنمای حرفه آهنگری؛ از مس تا آکانیت", slug: "blacksmithing-guide", excerpt: "همه‌چیز درباره آهنگری: نقشه‌های طلایی، منابع کمیاب و پول‌سازترین آیتم‌های این حرفه.", content: "آهنگری یکی از محبوب‌ترین حرفه‌های جنگی است و برای واریرها و پالادین‌ها تقریباً اجباری؛ ساختن زره‌های خودساخته از سطح ۱ تا ۳۰۰ کل مسیر رشد شما را همراهی می‌کند.\n\nاز سطح ۱ تا ۷۵ با سنگ مس و شمش برنزی پیش بروید. نقشه «تبر جنگی سنگین مس» بهترین انتخاب برای این بازه است؛ موادش ارزان است و فروشش هم سود خوبی دارد.\n\nبازه ۱۲۵ تا ۲۰۰ دوران طلایی آهن و فولاد است. اگر نزدیک دشت‌های سوزان ماین می‌زنید، سنگ طلایی را دور نریزید؛ نقشه‌های طلایی آن در حراجی همیشه فروش است.\n\nسطح ۲۵۰ به بالا عصر آکانیت است. شمش آکانیت (ترکیب سنگ توریوم و کریستال آرکان) گران‌ترین مواد کلاسیک است اما داس آکانیت، محصول مشهورش، هنوز یکی از پول‌سازترین آیتم‌های حراجی است.\n\nتوصیه آخر: آهنگری با معدنکاری جفت شود. بدون معدن‌کاری، هزینه مواد دو برابر می‌شود و سود از دست می‌رود.", author: "آهنگر_کوهستان", category: "راهنما", pinned: false },
  { title: "رویداد جشنواره ماه تازه آغاز شد", slug: "lunar-festival-event", excerpt: "جشنواره ماه با جوایز افسانه‌ای بازگشت؛ راهنمای کامل جشن‌ها، آتش‌بازی و نبرد با خدایان کهن.", content: "جشنواره ماه، محبوب‌ترین رویداد فصلی وارکرفت، امسال با تغییرات بزرگی برگزار می‌شود. در طول دو هفته آینده، قهرمانان می‌توانند در سراسر آزراث به جست‌وجوی سالخوردگان بپردازند.\n\nدر هر قاره ۱۲ سالخوردار پنهان شده‌اند؛ یافتن هر کدام سکه‌ای افتخار می‌دهد که می‌توانید آن را در ازای لباس‌های جشنواره، پت کاپیتان ماه و مهم‌تر از همه، کلاه افسانه‌ای «سلاله ماه» خرج کنید.\n\nنبرد اصلی جشنواره اما با «اومن» خدایان ماه است؛ باس سطح ۶۰ در معبد ماه که برای شکستش به گروه کامل رید نیاز است. جوایز او شامل جواهر جشنواره و طلسم یکتای «برکت ماه» است.\n\nآتش‌بازی‌های شبانه هر ساعت در استورم‌ویند و اورگیمار برگزار می‌شود و شرکت در آن‌ها، کوئست روزانه «ستایش آتش» را باز می‌کند.\n\nجشنواره تا پایان ماه ادامه دارد؛ سالخوردگان منتظرتان هستند!", author: "تحریریه ووهِد", category: "اخبار", pinned: false },
  { title: "نگاهی به تاریخچه وارکرفت: از جنگ‌های بزرگ تا امروز", slug: "warcraft-history", excerpt: "سفر در زمان؛ از جنگ بزرگ اول تا فروپاشی لیک کینگ، مرور کامل تاریخچه جهان وارکرفت.", content: "تاریخ آزراث تاریخ خون و قهرمانی است. جنگ بزرگ اول زمانی آغاز شد که قبیله‌های اورک از دنیای درشت‌نور به آزراث گشوده شدند و دروازه تاریک بر آسمان شرق‌سرزمین گشوده شد.\n\nدر جنگ بزرگ دوم، اتحادیه برای نخستین بار شکل گرفت؛ انسان‌ها، دورف‌ها و نایت‌الف‌ها دست در دست هم در برابر هورد باستانی ایستادند و پیروزی در دروازه سیاه، دوره صلح کوتاهی را رقم زد.\n\nطاعون مرده‌متحرک اما صلح را پایان داد. شاهزاده آرتاس منتیل برای نجات مردمش به راهزن فراست‌مورن پناه برد و روحش را از دست داد؛ متحدی که باید همیشه هراس او را داشت. تاریکی او نورد را به پایتخت انسان‌ها آورد و استاترام هرگز از خاکستر برنخاست.\n\nامروز پس از شکست لیک کینگ در تاج یخ، آزراث دوره تازه‌ای را می‌گذراند؛ اما زخم‌های جنگ هنوز تازه است و در دره استرنگل‌تورن و تپه‌های هیلزبراد، نبرد اتحادیه و هورد هرگز تمام نمی‌شود.\n\nتاریخ‌ها تکرار می‌شود؛ اما امیدواریم قهرمانان تازه‌وارد، درس‌های گرفته‌شده را فراموش نکنند.", author: "استاد_تاریخ", category: "گاید", pinned: false },
];

// ============================ نظرات ============================
const commentsData = [
  { entityType: "item", entityName: "Frostmourne", author: "لرد_یخ", body: "بهترین سلاح بازی. سه ماه برایش جنگیدم و ارزشش را داشت. روحم را گرفت ولی خفن‌ترین قهرمان سرورم!", rating: 5 },
  { entityType: "item", entityName: "Thunderfury, Blessed Blade of the Windseeker", author: "مستر_فلیم", body: "چهل قلب عنصری + ۱۰ بارکد آتشین + ماه‌ها قرعه‌کشی = این شمشیر. سخت‌ترین کرفت تاریخ بازی ولی هر تانکی باید یک بار بگیردش.", rating: 5 },
  { entityType: "item", entityName: "Arcanite Reaper", author: "واریر_خشم", body: "REAPER! شعار قدیمی. هنوز هم در PVP وحشتناک است. برای واریر سطح ۵۵ چیزی بهتر از این نیست.", rating: 4 },
  { entityType: "item", entityName: "Hearthstone", author: "مهمان_تازه", body: "سنگی که یک بار گم کردنش = ۳۰ دقیقه دویدن. همیشه یادت باشد که کول‌داون دارد!", rating: 5 },
  { entityType: "npc", entityName: "Hogger", author: "پالادین_نور", body: "اولین بوس راید زندگی هر اتحادیه‌ای. گروه ۴۰ نفره بردیم آخرش یک نفر ماند! هرگز فراموش نمی‌کنم.", rating: 5 },
  { entityType: "npc", entityName: "Ragnaros the Firelord", author: "تانک_پولادین", body: "چهل نفر، سه ساعت وایپ و در آخر او افتاد. صدای SULFURAS هنوز تو گوشمه. بهترین رید کلاسیک.", rating: 5 },
  { entityType: "npc", entityName: "Onyxia", author: "مگ_یخ‌زده", body: "Deep Breath را یاد بگیرید وگرنه کل رید پودر می‌شود. سه بار وایپ کردیم تا بفهمیم تانک‌ها باید سمت چپ بایستند!", rating: 4 },
  { entityType: "npc", entityName: "Thrall", author: "شمن_آذرخش", body: "پیشوای واقعی هورد. هر بار که کنارش کوئست می‌دهم، برکت توتِم می‌گیرم. FOR THE HORDE!", rating: 5 },
  { entityType: "quest", entityName: "Wanted: Hogger!", author: "هانتر_جنگل", body: "اولین کوئست جدی که با گیلد گرفتم. جایزه‌اش بد نیست برای سطح ۱۰ ولی سلاحش کمی قدیمی است.", rating: 3 },
  { entityType: "quest", entityName: "The Defias Brotherhood", author: "راب_سایه", body: "بهترین دانجون اتحادیه برای سطح ۱۵-۲۰. ون‌کلیف سخت می‌جنگد ولی لوتش ارزشش را دارد.", rating: 4 },
  { entityType: "zone", entityName: "Stranglethorn Vale", author: "جنگل‌گرد", body: "بهترین و بدترین منطقه بازی: کوئست‌ها عالی، ولی هر لحظه ممکن است یک هوردی از سر بوته بیرون بزند!", rating: 5 },
  { entityType: "zone", entityName: "Elwynn Forest", author: "مهمان_تازه", body: "خانه. موسیقی‌اش هنوز قشنگ‌ترین موسیقی بازی است.", rating: 5 },
  { entityType: "spell", entityName: "Polymorph", author: "مگ_بره", body: "گوسفند کردن در پارتی همیشه خنده‌دارترین لحظه شب است. بره من فقط ۸ ثانیه زنده می‌ماند ولی ۸ ثانیه خنده ۴۰ نفره ارزشش را دارد!", rating: 5 },
];

// ============================ لوت NPC ها ============================
// NPC name -> [{ itemName, chance }]
const dropsMap: Record<string, Array<{ item: string; chance: number }>> = {
  "راگناروس": [
    { item: "سولفوراس، دست راگناروس", chance: 0.03 },
    { item: "اشکاندی، شمشیر بزرگ برادری", chance: 0.08 },
    { item: "روباه یخ‌آتش", chance: 0.05 },
    { item: "پلات‌های خشم", chance: 0.06 },
  ],
  "اونکسیا": [
    { item: "اشکاندی، شمشیر بزرگ برادری", chance: 0.12 },
    { item: "حلقه اژدهاسواران", chance: 0.15 },
    { item: "زره‌پوش خون‌دندان", chance: 0.06 },
  ],
  "کل‌توزاد": [
    { item: "آتیش، عصای بزرگ نگهبان", chance: 0.02 },
    { item: "کلاه نعمسیس", chance: 0.05 },
  ],
  "ادوین ون‌کلیف": [
    { item: "تیغه دیفایس", chance: 0.35 },
  ],
  "هرود": [
    { item: "شمشیر اسکارلت", chance: 0.28 },
    { item: "سپر فریب‌دهنده", chance: 0.22 },
  ],
  "مرگ‌آور بروکن‌توث": [
    { item: "پتک بریکن‌توث", chance: 0.3 },
    { item: "پلاک نیش‌سایه", chance: 0.18 },
  ],
  "گرگ الون": [{ item: "پارچه کتانی", chance: 0.45 }],
  "مورلاک جنگ‌جو": [{ item: "گل صلح", chance: 0.3 }],
  "غول کوه تارن": [
    { item: "استخوان‌سپر", chance: 0.2 },
    { item: "سنگ معدن مس", chance: 0.4 },
  ],
  "سخت‌کیفان وینتراسپرینگ": [{ item: "برگ نقره", chance: 0.35 }],
};

// ============================ اجرا ============================
async function main() {
  console.log("پاک‌سازی داده‌های قبلی...");
  await db.comment.deleteMany();
  await db.npcDrop.deleteMany();
  await db.achievement.deleteMany();
  await db.news.deleteMany();
  await db.spell.deleteMany();
  await db.quest.deleteMany();
  await db.npc.deleteMany();
  await db.item.deleteMany();
  await db.zone.deleteMany();
  await db.wowClass.deleteMany();
  await db.race.deleteMany();
  await db.faction.deleteMany();

  console.log("درج مناطق...");
  const zoneMap = new Map<string, number>();
  for (const z of zonesData) {
    const created = await db.zone.create({ data: z });
    zoneMap.set(z.name, created.id);
  }

  console.log("درج آیتم‌ها...");
  const itemMap = new Map<string, number>(); // کلید: نام فارسی (برای لوت‌ها)
  for (const it of itemsData) {
    const created = await db.item.create({ data: it });
    itemMap.set(it.name, created.id);
  }

  console.log("درج NPC ها...");
  const npcMap = new Map<string, number>(); // کلید: نام فارسی (برای لوت‌ها)
  for (const n of npcsData) {
    const { zoneName, ...rest } = n;
    const created = await db.npc.create({
      data: { ...rest, zoneId: zoneName ? (zoneMap.get(zoneName) ?? null) : null },
    });
    npcMap.set(n.name, created.id);
  }

  console.log("درج لوت‌ها...");
  for (const [npcName, drops] of Object.entries(dropsMap)) {
    const npcId = npcMap.get(npcName);
    if (!npcId) continue;
    for (const d of drops) {
      const itemId = itemMap.get(d.item);
      if (!itemId) continue;
      await db.npcDrop.create({ data: { npcId, itemId, chance: d.chance } });
    }
  }

  console.log("درج کوئست‌ها...");
  for (const q of questsData) {
    const { zoneName, ...rest } = q;
    await db.quest.create({
      data: { ...rest, zoneId: zoneName ? (zoneMap.get(zoneName) ?? null) : null },
    });
  }

  console.log("درج اسپل‌ها...");
  for (const s of spellsData) {
    await db.spell.create({ data: s });
  }

  console.log("درج کلاس‌ها، نژادها، جناح‌ها و دستاوردها...");
  for (const c of classesData) await db.wowClass.create({ data: c });
  for (const r of racesData) await db.race.create({ data: r });
  for (const f of factionsData) await db.faction.create({ data: f });
  for (const a of achievementsData) await db.achievement.create({ data: a });

  console.log("درج اخبار...");
  for (const nw of newsData) {
    const { pinned, ...rest } = nw;
    await db.news.create({ data: { ...rest, pinned: pinned ?? false } });
  }

  console.log("درج نظرات...");
  // نظرات به آیتم‌ها
  const itemTypeByEn = new Map<string, { id: number }>();
  const allItems = await db.item.findMany({ select: { id: true, nameEn: true } });
  for (const it of allItems) itemTypeByEn.set(it.nameEn!, it);
  const allNpcs = await db.npc.findMany({ select: { id: true, nameEn: true } });
  const npcByEn = new Map<string, { id: number }>();
  for (const n of allNpcs) npcByEn.set(n.nameEn!.split(" / ")[0], n);
  const allQuests = await db.quest.findMany({ select: { id: true, titleEn: true } });
  const questByEn = new Map<string, { id: number }>();
  for (const q of allQuests) questByEn.set(q.titleEn!, q);
  const allZones = await db.zone.findMany({ select: { id: true, nameEn: true } });
  const zoneByEn = new Map<string, { id: number }>();
  for (const z of allZones) zoneByEn.set(z.nameEn!, z);
  const allSpells = await db.spell.findMany({ select: { id: true, nameEn: true } });
  const spellByEn = new Map<string, { id: number }>();
  for (const s of allSpells) spellByEn.set(s.nameEn!, s);

  for (const c of commentsData) {
    let entityId: number | undefined;
    if (c.entityType === "item") entityId = itemTypeByEn.get(c.entityName)?.id;
    else if (c.entityType === "npc") entityId = npcByEn.get(c.entityName)?.id;
    else if (c.entityType === "quest") entityId = questByEn.get(c.entityName)?.id;
    else if (c.entityType === "zone") entityId = zoneByEn.get(c.entityName)?.id;
    else if (c.entityType === "spell") entityId = spellByEn.get(c.entityName)?.id;
    if (!entityId) continue;
    await db.comment.create({
      data: { entityType: c.entityType, entityId, author: c.author, body: c.body, rating: c.rating },
    });
  }

  const counts = {
    zones: await db.zone.count(),
    items: await db.item.count(),
    npcs: await db.npc.count(),
    drops: await db.npcDrop.count(),
    quests: await db.quest.count(),
    spells: await db.spell.count(),
    classes: await db.wowClass.count(),
    races: await db.race.count(),
    factions: await db.faction.count(),
    achievements: await db.achievement.count(),
    news: await db.news.count(),
    comments: await db.comment.count(),
  };
  console.log("Seed کامل شد ✓", counts);
}

main()
  .catch((e) => {
    console.error("خطا در seed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
