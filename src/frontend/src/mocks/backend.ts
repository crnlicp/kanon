import type { backendInterface, AboutContent, Activity, ContactSubmission, ContactSubmissionInput, HeroSlide, FooterLink, SiteSettings, Background, ContactInfo, RegistrationSubmission, RegistrationInput, Area, AreaInput, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillInformation, _ImmutableObjectStorageRefillResult } from "../backend";
import { Topic, BackgroundScope, SubmissionStatus, UserRole } from "../backend";

// Helper to create a mock ExternalBlob
const mockBlob = (url: string) => ({
  getBytes: async () => new Uint8Array(),
  getDirectURL: () => url,
  directURL: url,
  withUploadProgress: () => mockBlob(url),
});

// Result helper — wraps a value in the {__kind__: "ok"} shape all write ops return
function ok<T>(value: T): { __kind__: "ok"; ok: T } {
  return { __kind__: "ok", ok: value };
}

const sampleActivity1: Activity = {
  id: BigInt(1),
  titleFa: "کلاس موسیقی ایرانی",
  titleSv: "Iranskmusikklass",
  descriptionFa: "یادگیری موسیقی سنتی ایران با استادان مجرب",
  descriptionSv: "Lär dig traditionell iransk musik med erfarna lärare",
  contentFa: "<p>این دوره جامع موسیقی سنتی ایران را پوشش می‌دهد...</p>",
  contentSv: "<p>Denna kurs täcker traditionell iransk musik...</p>",
  topic: Topic.Cultural,
  slug: "iranian-music-class",
  isActive: true,
  hasRegistrationForm: true,
  imageUrl: mockBlob("https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800"),
  createdAt: BigInt(Date.now()),
  updatedAt: BigInt(Date.now()),
};

const sampleActivity2: Activity = {
  id: BigInt(2),
  titleFa: "کلاس زبان سوئدی",
  titleSv: "Svensk språkkurs",
  descriptionFa: "یادگیری زبان سوئدی برای مبتدیان",
  descriptionSv: "Lär dig svenska för nybörjare",
  contentFa: "<p>دوره زبان سوئدی برای مبتدیان...</p>",
  contentSv: "<p>Svensk språkkurs för nybörjare...</p>",
  topic: Topic.Educational,
  slug: "swedish-language-class",
  isActive: true,
  hasRegistrationForm: true,
  imageUrl: mockBlob("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"),
  createdAt: BigInt(Date.now()),
  updatedAt: BigInt(Date.now()),
};

const sampleActivity3: Activity = {
  id: BigInt(3),
  titleFa: "تیم فوتبال جوانان",
  titleSv: "Ungdomsfotbollslag",
  descriptionFa: "فوتبال برای جوانان ۱۲ تا ۱۸ ساله",
  descriptionSv: "Fotboll för ungdomar 12–18 år",
  contentFa: "<p>تیم فوتبال ما جوانان را آموزش می‌دهد...</p>",
  contentSv: "<p>Vårt fotbollslag tränar ungdomar...</p>",
  topic: Topic.Sport,
  slug: "youth-football",
  isActive: true,
  hasRegistrationForm: true,
  imageUrl: mockBlob("https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"),
  createdAt: BigInt(Date.now()),
  updatedAt: BigInt(Date.now()),
};

const sampleHeroSlide1: HeroSlide = {
  id: BigInt(1),
  topic: Topic.Cultural,
  order: BigInt(1),
  isActive: true,
  imageUrl: mockBlob("https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1400"),
  titleFa: "فرهنگ ایرانی-سوئدی",
  titleSv: "Iranskt-Svenskt Kulturhus",
  subtitleFa: "پل‌ی میان دو فرهنگ",
  subtitleSv: "En bro mellan två kulturer",
};

const sampleFooterLink1: FooterLink = {
  id: BigInt(1),
  labelFa: "درباره ما",
  labelSv: "Om oss",
  url: "/about",
  order: BigInt(1),
  category: "main",
};

const sampleSettings: SiteSettings = {
  id: BigInt(1),
  titleFa: "خانه فرهنگ ایرانی-سوئدی",
  titleSv: "Iranskt-Svenskt Kulturhus",
  primaryColor: "oklch(0.55 0.18 250)",
  secondaryColor: "oklch(0.65 0.15 35)",
  accentColor: "oklch(0.75 0.12 35)",
  logoUrl: mockBlob(""),
  adminPassword: "kanonGolYasAdminPassword",
  landingSubtitleFa: "خانه فرهنگ، آموزش و ورزش ایرانی-سوئدی",
  landingSubtitleSv: "Iranskt-Svenskt hus för kultur, utbildning och sport",
};

const sampleBackground: Background = {
  id: BigInt(1),
  scope: BackgroundScope.Landing,
  imageUrl: mockBlob("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600"),
};

const sampleContactInfo: ContactInfo = {
  id: BigInt(1),
  email: "info@example.se",
  phone: "+46 8 123 456",
  addressFa: "استکهلم، سوئد",
  addressSv: "Stockholm, Sverige",
  mapEmbedUrl: "https://maps.google.com",
};

const sampleSubmission: RegistrationSubmission = {
  id: BigInt(1),
  activityId: BigInt(1),
  email: "user@example.com",
  nameFa: "علی احمدی",
  nameSv: "Ali Ahmadi",
  phone: "+46 70 123 456",
  message: "Looking forward to joining",
  status: SubmissionStatus.Pending,
  submittedAt: BigInt(Date.now()),
};

// Mock areas data — Cultural, Educational, Sport
let mockAreas: Area[] = [
  {
    id: BigInt(1),
    icon: "🎭",
    titleFa: "فرهنگی",
    titleSv: "Kulturellt",
    subtitleFa: "هنر، موسیقی و رویدادهای فرهنگی",
    subtitleSv: "Konst, musik och kulturella evenemang",
    cardBackground: mockBlob("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800"),
    areaBackground: mockBlob("https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1600"),
    areaBackgroundVideo: mockBlob(""),
    order: BigInt(1),
  },
  {
    id: BigInt(2),
    icon: "📚",
    titleFa: "آموزشی",
    titleSv: "Utbildning",
    subtitleFa: "دوره‌ها، کارگاه‌ها و برنامه‌های آموزشی",
    subtitleSv: "Kurser, workshops och utbildningsprogram",
    cardBackground: mockBlob("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"),
    areaBackground: mockBlob("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600"),
    areaBackgroundVideo: mockBlob(""),
    order: BigInt(2),
  },
  {
    id: BigInt(3),
    icon: "⚽",
    titleFa: "ورزشی",
    titleSv: "Sport",
    subtitleFa: "تیم‌ها، مسابقات و فعالیت‌های ورزشی",
    subtitleSv: "Lag, tävlingar och sportaktiviteter",
    cardBackground: mockBlob("https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"),
    areaBackground: mockBlob("https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600"),
    areaBackgroundVideo: mockBlob(""),
    order: BigInt(3),
  },
];

export const mockBackend: backendInterface = {
  // ── Write ops: all accept token as first arg, return Result wrapper ──

  addActivity: async (_token: string, input: Activity) =>
    ok({ ...input, id: BigInt(Date.now()) }),

  addFooterLink: async (_token: string, input: FooterLink) =>
    ok({ ...input, id: BigInt(Date.now()) }),

  addHeroSlide: async (_token: string, input: HeroSlide) =>
    ok({ ...input, id: BigInt(Date.now()) }),

  addArea: async (_token: string, input: AreaInput) => {
    const newArea: Area = {
      id: BigInt(Date.now()),
      icon: input.icon,
      titleFa: input.titleFa,
      titleSv: input.titleSv,
      subtitleFa: input.subtitleFa,
      subtitleSv: input.subtitleSv,
      cardBackground: mockBlob(""),
      areaBackground: mockBlob(""),
      areaBackgroundVideo: mockBlob(""),
      order: BigInt(mockAreas.length + 1),
    };
    mockAreas.push(newArea);
    return ok(newArea);
  },

  updateArea: async (_token: string, id: bigint, input: AreaInput) => {
    const idx = mockAreas.findIndex((a) => a.id === id);
    if (idx === -1) return ok(null);
    mockAreas[idx] = { ...mockAreas[idx], ...input };
    return ok(mockAreas[idx]);
  },

  deleteArea: async (_token: string, id: bigint) => {
    const before = mockAreas.length;
    mockAreas = mockAreas.filter((a) => a.id !== id);
    return ok(mockAreas.length < before);
  },

  reorderAreas: async (_token: string, ids: bigint[]) => {
    ids.forEach((id, index) => {
      const area = mockAreas.find((a) => a.id === id);
      if (area) area.order = BigInt(index + 1);
    });
    return ok(true);
  },

  setAreaCardBackground: async (_token: string, areaId: bigint, blob) => {
    const area = mockAreas.find((a) => a.id === areaId);
    if (!area) return ok(null);
    area.cardBackground = blob;
    return ok(area);
  },

  setAreaBackground: async (_token: string, areaId: bigint, blob) => {
    const area = mockAreas.find((a) => a.id === areaId);
    if (!area) return ok(null);
    area.areaBackground = blob;
    return ok(area);
  },

  setAreaBackgroundVideo: async (_token: string, areaId: bigint, blob) => {
    const area = mockAreas.find((a) => a.id === areaId);
    if (!area) return ok(null);
    area.areaBackgroundVideo = blob;
    return ok(area);
  },

  deleteActivity: async (_token: string) => ok(true),
  deleteFooterLink: async (_token: string) => ok(true),
  deleteHeroSlide: async (_token: string) => ok(true),
  deleteSubmission: async (_token: string) => ok(true),
  deleteContactSubmission: async (_token: string, _id: bigint) => ok(true),

  updateActivity: async (_token: string) => ok(true),
  updateFooterLink: async (_token: string) => ok(true),
  updateHeroSlide: async (_token: string) => ok(true),
  updateSubmissionStatus: async (_token: string) => ok(true),
  reorderFooterLinks: async (_token: string) => ok(true),
  reorderHeroSlides: async (_token: string) => ok(true),

  setBackground: async (_token: string, input: Background) => ok(input),
  setContactInfo: async (_token: string) => ok(true),
  setSiteSettings: async (_token: string) => ok(true),

  updateAdminPassword: async (_token: string, _newPassword: string) => {
    sampleSettings.adminPassword = _newPassword;
    return ok(true);
  },

  emergencyResetPassword: async (_recoverySecret: string): Promise<boolean> => {
    return true;
  },

  resetAdminPassword: async (_token: string) => ok(true),

  setAbout: async (_token: string, _input: AboutContent) => true,

  getContactSubmissions: async (_token: string): Promise<{ __kind__: "ok"; ok: Array<ContactSubmission> } | { __kind__: "err"; err: string }> =>
    ok([
      {
        id: BigInt(1),
        name: "Sara Lindqvist",
        email: "sara@example.se",
        phone: "+46 70 123 456",
        message: "Jag är intresserad av er kulturkurser. Kan ni skicka mer information?",
        timestamp: BigInt(Date.now() - 86400000),
      },
      {
        id: BigInt(2),
        name: "احمد محمدی",
        email: "ahmad@example.ir",
        phone: "+46 73 987 654",
        message: "سلام، می‌خواستم درباره کلاس‌های فارسی بیشتر بدانم.",
        timestamp: BigInt(Date.now() - 3600000),
      },
    ]),

  // ── Read-only ops: no token, no Result wrapper ──

  adminLogin: async (password: string) => {
    if (password === "kanonGolYasAdminPassword") return password;
    return null;
  },
  adminLogout: async () => undefined,

  getActivities: async (topic) => {
    const all = [sampleActivity1, sampleActivity2, sampleActivity3];
    if (topic === null) return all;
    return all.filter((a) => a.topic === topic);
  },
  getActivityBySlug: async (slug) => {
    const all = [sampleActivity1, sampleActivity2, sampleActivity3];
    return all.find((a) => a.slug === slug) ?? null;
  },
  getAllActivitiesAdmin: async (topic) => {
    const all = [sampleActivity1, sampleActivity2, sampleActivity3];
    if (topic === null) return all;
    return all.filter((a) => a.topic === topic);
  },
  getAllHeroSlides: async () => [sampleHeroSlide1],
  getBackgrounds: async () => [sampleBackground],
  getContactInfo: async () => sampleContactInfo,
  getFooterLinks: async () => [sampleFooterLink1],
  getHeroSlides: async () => [sampleHeroSlide1],
  getRegistrationSubmissions: async () => [sampleSubmission],
  getSiteSettings: async () => sampleSettings,
  getAreas: async () => [...mockAreas],
  getAdminPasswordHash: async () => "kanonGolYasAdminPassword",

  getAbout: async (): Promise<AboutContent> => ({
    id: BigInt(1),
    contentFa: "<p>خانه فرهنگ ایرانی-سوئدی یک مرکز فرهنگی، آموزشی و ورزشی است که با هدف ارتقاء پیوندهای فرهنگی میان ایرانیان و سوئدی‌ها تأسیس شده است.</p>",
    contentSv: "<p>Det Iranskt-Svenska Kulturhuset är ett kultur-, utbildnings- och sportcenter som grundades för att stärka de kulturella banden mellan iranier och svenskar.</p>",
    imagePath: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200",
  }),

  submitContactForm: async (input: ContactSubmissionInput): Promise<ContactSubmission> => ({
    id: BigInt(Date.now()),
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: input.message,
    timestamp: BigInt(Date.now()),
  }),

  submitRegistration: async (input: RegistrationInput) => ({
    ...sampleSubmission,
    ...input,
    id: BigInt(Date.now()),
    submittedAt: BigInt(Date.now()),
  }),

  seedSampleData: async () => true,

  // Authorization mixin stubs
  _initializeAccessControl: async () => undefined,
  assignCallerUserRole: async (_user, _role) => undefined,
  getCallerUserRole: async () => UserRole.guest,
  isCallerAdmin: async () => false,

  // Object storage methods (required by backendInterface)
  _immutableObjectStorageBlobsAreLive: async (hashes: Array<Uint8Array>) => hashes.map(() => true),
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({ method: "GET", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> => ({ success: true }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
};
