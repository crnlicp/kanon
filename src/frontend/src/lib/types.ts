export type Lang = "fa" | "sv";
export type Dir = "rtl" | "ltr";
export type TopicType = string;

export interface MultiLangText {
  fa: string;
  sv: string;
}

export interface SiteSettings {
  id: string;
  title: MultiLangText;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  adminPassword?: string;
  contactInfo: ContactInfo;
  landingSubtitleFa?: string;
  landingSubtitleSv?: string;
  topicsBgImage?: string;
  topicsBgVideo?: string;
}

export interface ContactInfo {
  address: MultiLangText;
  phone: string;
  email: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "twitter" | "youtube" | "linkedin";
  url: string;
}

export interface HeroSlide {
  id: string;
  topic: TopicType;
  title: MultiLangText;
  subtitle: MultiLangText;
  imageUrl: string;
  ctaLabel: MultiLangText;
  ctaUrl: string;
  order: number;
}

export interface Activity {
  id: string;
  slug: string;
  topic: TopicType;
  title: MultiLangText;
  description: MultiLangText;
  shortDescription: MultiLangText;
  imageUrl: string;
  date: string;
  location: MultiLangText;
  capacity: number;
  hasRegistrationForm: boolean;
  tags: string[];
  order: number;
}

export interface Background {
  id: string;
  context: "landing" | TopicType;
  imageUrl: string;
  label: string;
}

export interface FooterLink {
  id: string;
  label: MultiLangText;
  url: string;
  category: MultiLangText;
  order: number;
}

export interface RegistrationSubmission {
  id: string;
  activityId: string;
  activityTitle: MultiLangText;
  /** Bilingual name fields — use nameFa / nameSv when available */
  nameFa?: string;
  nameSv?: string;
  /** Legacy single-field name (email fallback) */
  fullName: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  lang: Lang;
  status?: string;
}

export interface AdminAuthState {
  isLoggedIn: boolean;
  token: string | null;
}

// ---------------------------------------------------------------------------
// About & Contact types
// ---------------------------------------------------------------------------

export interface AboutContent {
  id: number;
  contentFa: string;
  contentSv: string;
  imagePath?: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: number;
}

export interface ContactSubmissionInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Area types
// ---------------------------------------------------------------------------

export interface Area {
  id: number;
  icon: string;
  titleFa: string;
  titleSv: string;
  subtitleFa: string;
  subtitleSv: string;
  cardBackground?: string; // URL from ExternalBlob
  areaBackground?: string;
  areaBackgroundVideo?: string;
  order: number;
}

export interface AreaInput {
  icon: string;
  titleFa: string;
  titleSv: string;
  subtitleFa: string;
  subtitleSv: string;
}
