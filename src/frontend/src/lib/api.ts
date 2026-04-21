import {
  BackgroundScope,
  SubmissionStatus,
  Topic,
  createActor,
  canisterIds,
  ExternalBlob,
} from "../backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import type {
  AboutContent as BackendAboutContent,
  Activity as BackendActivity,
  Area as BackendArea,
  AreaInput as BackendAreaInput,
  Background as BackendBackground,
  ContactSubmissionInput as BackendContactSubmissionInput,
  FooterLink as BackendFooterLink,
  HeroSlide as BackendHeroSlide,
  RegistrationInput as BackendRegistrationInput,
  SiteSettings as BackendSiteSettings,
} from "../backend";
import type {
  AboutContent,
  Activity,
  Area,
  AreaInput,
  Background,
  ContactInfo,
  ContactSubmission,
  ContactSubmissionInput,
  FooterLink,
  HeroSlide,
  RegistrationSubmission,
  SiteSettings,
  TopicType,
} from "./types";

// ---------------------------------------------------------------------------
// Actor factory — uses the mock in dev (no env.json), real backend otherwise
// ---------------------------------------------------------------------------

async function getActor() {
  try {
    const agent = await HttpAgent.create();

    // Fetch root key for cryptographic verification in the browser
    const fetchRootKey = await agent.fetchRootKey();
    if (!fetchRootKey) {
      console.warn("Unable to fetch root key. Verify your IC local is running properly.");
    }

    // Local dev canister communication doesn't need authentication
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      agent.fetchRootKey();
    }

    return createActor(canisterIds!.backend!, null as any, null as any, { agent } as any);
  } catch {
    const { mockBackend } = await import("../mocks/backend");
    return mockBackend;
  }
}

// ---------------------------------------------------------------------------
// Token helper — reads from Zustand store (outside React hooks)
// ---------------------------------------------------------------------------

function getToken(): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAppStore } = require("../store") as typeof import("../store");
  return useAppStore.getState().adminAuth.token ?? "";
}

// ---------------------------------------------------------------------------
// Result unwrapper — all write ops return {__kind__:"ok";ok:T}|{__kind__:"err";err:string}
// ---------------------------------------------------------------------------

function unwrap<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

// ---------------------------------------------------------------------------
// Type adapters — Backend ↔ Frontend
// ---------------------------------------------------------------------------

function topicToBackend(topic: TopicType): Topic {
  const map: Record<TopicType, Topic> = {
    cultural: Topic.Cultural,
    educational: Topic.Educational,
    sport: Topic.Sport,
  };
  return map[topic];
}

function topicFromBackend(topic: Topic): TopicType {
  const map: Record<Topic, TopicType> = {
    [Topic.Cultural]: "cultural",
    [Topic.Educational]: "educational",
    [Topic.Sport]: "sport",
  };
  return map[topic];
}

function bgScopeToContext(scope: BackgroundScope): "landing" | TopicType {
  const map: Record<BackgroundScope, "landing" | TopicType> = {
    [BackgroundScope.Landing]: "landing",
    [BackgroundScope.Cultural]: "cultural",
    [BackgroundScope.Educational]: "educational",
    [BackgroundScope.Sport]: "sport",
    [BackgroundScope.Activity]: "landing",
  };
  return map[scope];
}

function contextToBgScope(context: "landing" | TopicType): BackgroundScope {
  const map: Record<string, BackgroundScope> = {
    landing: BackgroundScope.Landing,
    cultural: BackgroundScope.Cultural,
    educational: BackgroundScope.Educational,
    sport: BackgroundScope.Sport,
  };
  return map[context] ?? BackgroundScope.Landing;
}

function adaptActivity(a: BackendActivity): Activity {
  return {
    id: String(a.id),
    slug: a.slug,
    topic: topicFromBackend(a.topic),
    title: { fa: a.titleFa, sv: a.titleSv },
    description: { fa: a.descriptionFa, sv: a.descriptionSv },
    shortDescription: { fa: a.descriptionFa, sv: a.descriptionSv },
    imageUrl: a.imageUrl?.getDirectURL() || "",
    date: new Date(Number(a.createdAt) / 1_000_000).toISOString().split("T")[0],
    location: { fa: "", sv: "" },
    capacity: 0,
    hasRegistrationForm: a.hasRegistrationForm,
    tags: [],
    order: 0,
  };
}

function adaptHeroSlide(h: BackendHeroSlide): HeroSlide {
  return {
    id: String(h.id),
    topic: topicFromBackend(h.topic),
    title: { fa: h.titleFa, sv: h.titleSv },
    subtitle: { fa: h.subtitleFa, sv: h.subtitleSv },
    imageUrl: h.imageUrl?.getDirectURL() || "",
    ctaLabel: { fa: "بیشتر بدانید", sv: "Läs mer" },
    ctaUrl: "#",
    order: Number(h.order),
  };
}

function adaptBackground(b: BackendBackground): Background {
  return {
    id: String(b.id),
    context: bgScopeToContext(b.scope),
    imageUrl: b.imageUrl?.getDirectURL() || "",
    label: bgScopeToContext(b.scope),
  };
}

function adaptFooterLink(f: BackendFooterLink): FooterLink {
  return {
    id: String(f.id),
    label: { fa: f.labelFa, sv: f.labelSv },
    url: f.url,
    category: { fa: f.category, sv: f.category },
    order: Number(f.order),
  };
}

function adaptArea(a: BackendArea): Area {
  return {
    id: Number(a.id),
    icon: a.icon,
    titleFa: a.titleFa,
    titleSv: a.titleSv,
    subtitleFa: a.subtitleFa,
    subtitleSv: a.subtitleSv,
    cardBackground: a.cardBackground?.getDirectURL() || undefined,
    areaBackground: a.areaBackground?.getDirectURL() || undefined,
    areaBackgroundVideo: a.areaBackgroundVideo?.getDirectURL() || undefined,
    order: Number(a.order),
  };
}

// ---------------------------------------------------------------------------
// Admin login — calls backend.adminLogin() to get a real session token
// ---------------------------------------------------------------------------

export async function adminLogin(
  password: string,
): Promise<{ success: boolean; token: string }> {
  try {
    const actor = await getActor();
    // Call backend's adminLogin — returns a session token or null
    const token = await actor.adminLogin(password);
    if (token) {
      return { success: true, token };
    }
    return { success: false, token: "" };
  } catch {
    // Backend unavailable — allow default password for initial setup
    if (password === "kanonGolYasAdminPassword") {
      return { success: true, token: password };
    }
    return { success: false, token: "" };
  }
}

// ---------------------------------------------------------------------------
// Public read APIs
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const actor = await getActor();
  const [settingsResult, contactResult] = await Promise.all([
    actor.getSiteSettings(),
    actor.getContactInfo(),
  ]);

  const defaultContact: ContactInfo = {
    address: { fa: "استکهلم، سوئد", sv: "Stockholm, Sverige" },
    phone: "+46 8 000 000",
    email: "info@example.se",
    socialLinks: [],
  };

  const contactInfo: ContactInfo = contactResult
    ? {
        address: { fa: contactResult.addressFa, sv: contactResult.addressSv },
        phone: contactResult.phone,
        email: contactResult.email,
        socialLinks: [],
      }
    : defaultContact;

  if (!settingsResult) {
    return {
      id: "1",
      title: { fa: "", sv: "" },
      logoUrl: "",
      primaryColor: "#3B82F6",
      accentColor: "#D97706",
      landingSubtitleFa: "",
      landingSubtitleSv: "",
      contactInfo,
    };
  }

  const s: BackendSiteSettings = settingsResult;
  return {
    id: String(s.id),
    title: { fa: s.titleFa, sv: s.titleSv },
    logoUrl: s.logoUrl?.getDirectURL() || "",
    primaryColor: s.primaryColor,
    accentColor: s.accentColor,
    adminPassword: s.adminPassword,
    landingSubtitleFa:
      (s as BackendSiteSettings & { landingSubtitleFa?: string })
        .landingSubtitleFa ?? "",
    landingSubtitleSv:
      (s as BackendSiteSettings & { landingSubtitleSv?: string })
        .landingSubtitleSv ?? "",
    topicsBgImage: s.topicsBgImage?.getDirectURL() || undefined,
    topicsBgVideo: s.topicsBgVideo?.getDirectURL() || undefined,
    contactInfo,
  };
}

export async function getHeroSlides(topic: TopicType): Promise<HeroSlide[]> {
  const actor = await getActor();
  const results = await actor.getHeroSlides(topicToBackend(topic));
  return results.map(adaptHeroSlide).sort((a, b) => a.order - b.order);
}

export async function getActivities(topic?: TopicType): Promise<Activity[]> {
  const actor = await getActor();
  const results = await actor.getActivities(
    topic ? topicToBackend(topic) : null,
  );
  return results.map(adaptActivity);
}

export async function getActivityBySlug(
  slug: string,
): Promise<Activity | null> {
  const actor = await getActor();
  const result = await actor.getActivityBySlug(slug);
  return result ? adaptActivity(result) : null;
}

export async function getBackgrounds(): Promise<Background[]> {
  const actor = await getActor();
  const results = await actor.getBackgrounds();
  return results.map(adaptBackground);
}

export async function getFooterLinks(): Promise<FooterLink[]> {
  const actor = await getActor();
  const results = await actor.getFooterLinks();
  return results.map(adaptFooterLink).sort((a, b) => a.order - b.order);
}

export async function submitRegistration(
  data: Omit<RegistrationSubmission, "id" | "submittedAt">,
): Promise<{ success: boolean }> {
  const actor = await getActor();
  const input: BackendRegistrationInput = {
    activityId: BigInt(data.activityId),
    email: data.email,
    nameFa: data.fullName || undefined,
    nameSv: data.fullName || undefined,
    phone: data.phone || undefined,
    message: data.message || undefined,
  };
  await actor.submitRegistration(input);
  return { success: true };
}

// ---------------------------------------------------------------------------
// Admin — Submissions
// ---------------------------------------------------------------------------

export async function getRegistrationSubmissions(): Promise<
  RegistrationSubmission[]
> {
  const actor = await getActor();
  const results = await actor.getRegistrationSubmissions(null);
  return results.map((s) => ({
    id: String(s.id),
    activityId: String(s.activityId),
    activityTitle: { fa: "", sv: "" },
    nameFa: s.nameFa ?? undefined,
    nameSv: s.nameSv ?? undefined,
    fullName: s.nameSv ?? s.nameFa ?? s.email,
    email: s.email,
    phone: s.phone ?? "",
    message: s.message ?? "",
    submittedAt: String(Number(s.submittedAt) / 1_000_000),
    lang: "sv" as const,
    status: s.status,
  }));
}

export async function getRegistrationSubmissionsForActivity(
  activityId: number,
): Promise<RegistrationSubmission[]> {
  const actor = await getActor();
  const results = await actor.getRegistrationSubmissions(BigInt(activityId));
  return results.map((s) => ({
    id: String(s.id),
    activityId: String(s.activityId),
    activityTitle: { fa: "", sv: "" },
    nameFa: s.nameFa ?? undefined,
    nameSv: s.nameSv ?? undefined,
    fullName: s.nameSv ?? s.nameFa ?? s.email,
    email: s.email,
    phone: s.phone ?? "",
    message: s.message ?? "",
    submittedAt: String(Number(s.submittedAt) / 1_000_000),
    lang: "sv" as const,
    status: s.status,
  }));
}

export async function updateSubmissionStatus(
  id: number,
  status: "Pending" | "Approved" | "Rejected",
): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const statusMap: Record<string, SubmissionStatus> = {
    Pending: SubmissionStatus.Pending,
    Approved: SubmissionStatus.Approved,
    Rejected: SubmissionStatus.Rejected,
  };
  const result = await actor.updateSubmissionStatus(
    token,
    BigInt(id),
    statusMap[status],
  );
  return unwrap(result);
}

export async function deleteSubmission(id: number): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.deleteSubmission(token, BigInt(id));
  return unwrap(result);
}

// ---------------------------------------------------------------------------
// Admin — Backgrounds
// ---------------------------------------------------------------------------

export async function setBackground(input: {
  id?: string;
  context: "landing" | TopicType;
  imageBlob: ExternalBlob;
}): Promise<Background> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.setBackground(token, {
    id: input.id ? BigInt(input.id) : BigInt(0),
    scope: contextToBgScope(input.context),
    imageUrl: input.imageBlob,
  });
  return adaptBackground(unwrap(result));
}

// ---------------------------------------------------------------------------
// Admin — Hero Slides
// ---------------------------------------------------------------------------

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  const actor = await getActor();
  const results = await actor.getAllHeroSlides();
  return results.map(adaptHeroSlide);
}

export async function addHeroSlide(input: {
  topic: TopicType;
  titleFa: string;
  titleSv: string;
  subtitleFa: string;
  subtitleSv: string;
  imageBlob: ExternalBlob;
  order: number;
}): Promise<HeroSlide> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.addHeroSlide(token, {
    id: BigInt(0),
    topic: topicToBackend(input.topic),
    titleFa: input.titleFa,
    titleSv: input.titleSv,
    subtitleFa: input.subtitleFa,
    subtitleSv: input.subtitleSv,
    imageUrl: input.imageBlob,
    order: BigInt(input.order),
    isActive: true,
  });
  return adaptHeroSlide(unwrap(result));
}

export async function updateHeroSlide(input: {
  id: string;
  topic: TopicType;
  titleFa: string;
  titleSv: string;
  subtitleFa: string;
  subtitleSv: string;
  imageBlob?: ExternalBlob;
  currentImageUrl?: string;
  order: number;
}): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const imageUrl =
    input.imageBlob ?? ExternalBlob.fromURL(input.currentImageUrl ?? "");
  const result = await actor.updateHeroSlide(token, {
    id: BigInt(input.id),
    topic: topicToBackend(input.topic),
    titleFa: input.titleFa,
    titleSv: input.titleSv,
    subtitleFa: input.subtitleFa,
    subtitleSv: input.subtitleSv,
    imageUrl,
    order: BigInt(input.order),
    isActive: true,
  });
  return unwrap(result);
}

export async function deleteHeroSlide(id: string): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.deleteHeroSlide(token, BigInt(id));
  return unwrap(result);
}

// ---------------------------------------------------------------------------
// Admin — Activities
// ---------------------------------------------------------------------------

export async function getAllActivitiesAdmin(
  topic?: TopicType,
): Promise<Activity[]> {
  const actor = await getActor();
  const results = await actor.getAllActivitiesAdmin(
    topic ? topicToBackend(topic) : null,
  );
  return results.map(adaptActivity);
}

export async function addActivity(input: {
  topic: TopicType;
  titleFa: string;
  titleSv: string;
  descriptionFa: string;
  descriptionSv: string;
  contentFa: string;
  contentSv: string;
  slug: string;
  hasRegistrationForm: boolean;
  imageBlob?: ExternalBlob;
}): Promise<Activity> {
  const actor = await getActor();
  const token = getToken();
  const now = BigInt(Date.now() * 1_000_000);
  try {
    const result = await actor.addActivity(token, {
      id: BigInt(0),
      topic: topicToBackend(input.topic),
      titleFa: input.titleFa,
      titleSv: input.titleSv,
      descriptionFa: input.descriptionFa,
      descriptionSv: input.descriptionSv,
      contentFa: input.contentFa,
      contentSv: input.contentSv,
      slug: input.slug,
      hasRegistrationForm: input.hasRegistrationForm,
      imageUrl: input.imageBlob,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    return adaptActivity(unwrap(result));
  } catch (err: unknown) {
    const msg =
      err instanceof Error
        ? err.message
        : typeof err === "string"
          ? err
          : "Backend error adding activity — check canister logs";
    console.error("[addActivity] Error:", err);
    throw new Error(msg);
  }
}

export async function updateActivity(input: {
  id: string;
  topic: TopicType;
  titleFa: string;
  titleSv: string;
  descriptionFa: string;
  descriptionSv: string;
  contentFa: string;
  contentSv: string;
  slug: string;
  hasRegistrationForm: boolean;
  imageBlob?: ExternalBlob;
  currentImageUrl?: string;
}): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const now = BigInt(Date.now() * 1_000_000);
  const imageUrl =
    input.imageBlob ?? ExternalBlob.fromURL(input.currentImageUrl ?? "");
  const result = await actor.updateActivity(token, {
    id: BigInt(input.id),
    topic: topicToBackend(input.topic),
    titleFa: input.titleFa,
    titleSv: input.titleSv,
    descriptionFa: input.descriptionFa,
    descriptionSv: input.descriptionSv,
    contentFa: input.contentFa,
    contentSv: input.contentSv,
    slug: input.slug,
    hasRegistrationForm: input.hasRegistrationForm,
    imageUrl,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });
  return unwrap(result);
}

export async function deleteActivity(id: string): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.deleteActivity(token, BigInt(id));
  return unwrap(result);
}

// ---------------------------------------------------------------------------
// Admin — Site Settings
// ---------------------------------------------------------------------------

export async function setSiteSettings(input: {
  titleFa: string;
  titleSv: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  logoBlob?: ExternalBlob;
  currentLogoUrl?: string;
  adminPassword?: string;
  landingSubtitleFa?: string;
  landingSubtitleSv?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddressFa?: string;
  contactAddressSv?: string;
}): Promise<void> {
  const actor = await getActor();
  const token = getToken();
  const logoUrl =
    input.logoBlob ?? ExternalBlob.fromURL(input.currentLogoUrl ?? "");
  const currentSettings = await actor.getSiteSettings();
  const adminPassword =
    input.adminPassword ?? currentSettings?.adminPassword ?? "";

  const settingsPayload: BackendSiteSettings & {
    landingSubtitleFa?: string;
    landingSubtitleSv?: string;
  } = {
    id: BigInt(1),
    titleFa: input.titleFa,
    titleSv: input.titleSv,
    primaryColor: input.primaryColor,
    accentColor: input.accentColor,
    secondaryColor: input.secondaryColor,
    logoUrl,
    adminPassword,
    landingSubtitleFa: input.landingSubtitleFa ?? "",
    landingSubtitleSv: input.landingSubtitleSv ?? "",
  };

  const result = await actor.setSiteSettings(
    token,
    settingsPayload as BackendSiteSettings,
  );
  unwrap(result);

  if (
    input.contactEmail !== undefined ||
    input.contactPhone !== undefined ||
    input.contactAddressFa !== undefined ||
    input.contactAddressSv !== undefined
  ) {
    const existing = await actor.getContactInfo();
    const contactResult = await actor.setContactInfo(token, {
      id: existing?.id ?? BigInt(1),
      email: input.contactEmail ?? existing?.email ?? "",
      phone: input.contactPhone ?? existing?.phone ?? "",
      addressFa: input.contactAddressFa ?? existing?.addressFa ?? "",
      addressSv: input.contactAddressSv ?? existing?.addressSv ?? "",
      mapEmbedUrl: existing?.mapEmbedUrl,
    });
    unwrap(contactResult);
  }
}

// ---------------------------------------------------------------------------
// Admin — Footer Links
// ---------------------------------------------------------------------------

export async function addFooterLink(input: {
  labelFa: string;
  labelSv: string;
  url: string;
  category: string;
  order: number;
}): Promise<FooterLink> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.addFooterLink(token, {
    id: BigInt(0),
    labelFa: input.labelFa,
    labelSv: input.labelSv,
    url: input.url,
    category: input.category,
    order: BigInt(input.order),
  });
  return adaptFooterLink(unwrap(result));
}

export async function updateFooterLink(input: {
  id: string;
  labelFa: string;
  labelSv: string;
  url: string;
  category: string;
  order: number;
}): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.updateFooterLink(token, {
    id: BigInt(input.id),
    labelFa: input.labelFa,
    labelSv: input.labelSv,
    url: input.url,
    category: input.category,
    order: BigInt(input.order),
  });
  return unwrap(result);
}

export async function deleteFooterLink(id: string): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.deleteFooterLink(token, BigInt(id));
  return unwrap(result);
}

// ---------------------------------------------------------------------------
// Admin — Areas
// ---------------------------------------------------------------------------

export async function getAreas(): Promise<Area[]> {
  const actor = await getActor();
  const results = await actor.getAreas();
  return results.map(adaptArea).sort((a, b) => a.order - b.order);
}

export async function createArea(input: AreaInput): Promise<Area> {
  const actor = await getActor();
  const token = getToken();
  const backendInput: BackendAreaInput = {
    icon: input.icon,
    titleFa: input.titleFa,
    titleSv: input.titleSv,
    subtitleFa: input.subtitleFa,
    subtitleSv: input.subtitleSv,
  };
  try {
    const result = await actor.addArea(token, backendInput);
    return adaptArea(unwrap(result));
  } catch (err: unknown) {
    const msg =
      err instanceof Error
        ? err.message
        : "Backend error — check canister logs";
    throw new Error(msg);
  }
}

export async function updateArea(
  id: number,
  input: AreaInput,
): Promise<Area | null> {
  const actor = await getActor();
  const token = getToken();
  const backendInput: BackendAreaInput = {
    icon: input.icon,
    titleFa: input.titleFa,
    titleSv: input.titleSv,
    subtitleFa: input.subtitleFa,
    subtitleSv: input.subtitleSv,
  };
  const result = await actor.updateArea(token, BigInt(id), backendInput);
  const area = unwrap(result);
  return area ? adaptArea(area) : null;
}

export async function deleteArea(id: number): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.deleteArea(token, BigInt(id));
  return unwrap(result);
}

export async function reorderAreas(ids: number[]): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.reorderAreas(token, ids.map(BigInt));
  return unwrap(result);
}

export async function setAreaCardBackground(
  areaId: number,
  blob: ExternalBlob,
): Promise<Area | null> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.setAreaCardBackground(token, BigInt(areaId), blob);
  const area = unwrap(result);
  return area ? adaptArea(area) : null;
}

export async function setAreaBackground(
  areaId: number,
  blob: ExternalBlob,
): Promise<Area | null> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.setAreaBackground(token, BigInt(areaId), blob);
  const area = unwrap(result);
  return area ? adaptArea(area) : null;
}

export async function setAreaBackgroundVideo(
  areaId: number,
  blob: ExternalBlob,
): Promise<Area | null> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.setAreaBackgroundVideo(
    token,
    BigInt(areaId),
    blob,
  );
  const area = unwrap(result);
  return area ? adaptArea(area) : null;
}

// ---------------------------------------------------------------------------
// Admin — Password Management
// ---------------------------------------------------------------------------

export async function updateAdminPassword(
  currentPassword: string,
  newPassword: string,
): Promise<boolean> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.updateAdminPassword(token, currentPassword, newPassword);
  return unwrap(result);
}

export async function resetAdminPassword(token: string): Promise<boolean> {
  const actor = await getActor();
  const result = await actor.resetAdminPassword(token);
  return unwrap(result);
}

export async function emergencyResetPassword(
  recoverySecret: string,
): Promise<boolean> {
  const actor = await getActor();
  return actor.emergencyResetPassword(recoverySecret);
}

// ---------------------------------------------------------------------------
// Frontend-side media cleanup helper
// ---------------------------------------------------------------------------
// Object storage is content-addressed — we cannot delete by filename prefix
// on the backend. Instead, the frontend tracks all URLs uploaded in a session
// for a given field and deletes the orphaned ones when the form is saved.
//
// Usage:
//   const pendingRef = useRef<string[]>([]);
//   // on each upload:   pendingRef.current.push(uploadedUrl)
//   // on save:          await deleteOrphanedUploads(pendingRef.current, savedUrl)
//
// The backend's _immutableObjectStorageConfirmBlobDeletion expects raw hashes,
// which we don't have from a URL alone, so this is a best-effort no-op on the
// real backend; it remains useful for tracking intent and future implementations.

export async function deleteOrphanedUploads(
  pendingUrls: string[],
  savedUrl: string,
): Promise<void> {
  const toDelete = pendingUrls.filter((u) => u && u !== savedUrl);
  if (!toDelete.length) return;
  // Log orphaned URLs for debugging; actual deletion requires hash-based API
  // which is not exposed in backendInterface for arbitrary URLs.
  console.debug(
    "[deleteOrphanedUploads] Orphaned URLs (not deletable by URL):",
    toDelete,
  );
}

// ---------------------------------------------------------------------------
// Admin — Topics Page Background
// ---------------------------------------------------------------------------

export async function setTopicsBackground(input: {
  imageBlob?: ExternalBlob;
  videoBlob?: ExternalBlob;
  currentSettings: SiteSettings;
}): Promise<void> {
  const actor = await getActor();
  const token = getToken();
  const currentRaw = await actor.getSiteSettings();
  if (!currentRaw) return;

  const logoUrl = ExternalBlob.fromURL(input.currentSettings.logoUrl ?? "");
  const topicsBgImage =
    input.imageBlob ??
    (input.currentSettings.topicsBgImage
      ? ExternalBlob.fromURL(input.currentSettings.topicsBgImage)
      : undefined);
  const topicsBgVideo =
    input.videoBlob ??
    (input.currentSettings.topicsBgVideo
      ? ExternalBlob.fromURL(input.currentSettings.topicsBgVideo)
      : undefined);

  const result = await actor.setSiteSettings(token, {
    ...currentRaw,
    logoUrl,
    topicsBgImage,
    topicsBgVideo,
  });
  unwrap(result);
}

// ---------------------------------------------------------------------------
// Public — About
// ---------------------------------------------------------------------------

export async function getAbout(): Promise<AboutContent> {
  const actor = await getActor();
  const result = await actor.getAbout();
  return {
    id: Number(result.id),
    contentFa: result.contentFa,
    contentSv: result.contentSv,
    imagePath: result.imagePath ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Admin — About
// ---------------------------------------------------------------------------

export async function setAbout(
  token: string,
  input: AboutContent,
): Promise<boolean> {
  const actor = await getActor();
  const backendInput: BackendAboutContent = {
    id: BigInt(input.id),
    contentFa: input.contentFa,
    contentSv: input.contentSv,
    imagePath: input.imagePath,
  };
  return actor.setAbout(token, backendInput);
}

// ---------------------------------------------------------------------------
// Public — Contact Form
// ---------------------------------------------------------------------------

export async function submitContactForm(
  input: ContactSubmissionInput,
): Promise<ContactSubmission> {
  const actor = await getActor();
  const backendInput: BackendContactSubmissionInput = {
    name: input.name,
    email: input.email,
    message: input.message,
    phone: input.phone,
  };
  const result = await actor.submitContactForm(backendInput);
  return {
    id: Number(result.id),
    name: result.name,
    email: result.email,
    phone: result.phone ?? undefined,
    message: result.message,
    timestamp: Number(result.timestamp) / 1_000_000,
  };
}

// ---------------------------------------------------------------------------
// Admin — Contact Submissions
// ---------------------------------------------------------------------------

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const actor = await getActor();
  const token = getToken();
  const result = await actor.getContactSubmissions(token);
  const list = unwrap(result);
  return list.map((s) => ({
    id: Number(s.id),
    name: s.name,
    email: s.email,
    phone: s.phone ?? undefined,
    message: s.message,
    timestamp: Number(s.timestamp) / 1_000_000,
  }));
}

export async function deleteContactSubmission(
  token: string,
  id: number,
): Promise<boolean> {
  const actor = await getActor();
  const result = await actor.deleteContactSubmission(token, BigInt(id));
  return unwrap(result);
}
