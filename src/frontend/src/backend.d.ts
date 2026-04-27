import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Blob = Uint8Array;
export interface AboutContent {
    id: bigint;
    contentFa: string;
    contentSv: string;
    imagePath?: string;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone?: string;
}
export interface Background {
    id: bigint;
    activitySlug?: string;
    scope: BackgroundScope;
    imageUrl?: Blob;
    mediaType?: string;
}
export interface HeroSlide {
    id: bigint;
    topic: Topic;
    order: bigint;
    isActive: boolean;
    imageUrl?: Blob;
    subtitleFa: string;
    subtitleSv: string;
    titleFa: string;
    titleSv: string;
}
export interface AreaInput {
    icon: string;
    subtitleFa: string;
    subtitleSv: string;
    titleFa: string;
    titleSv: string;
}
export interface FooterLink {
    id: bigint;
    url: string;
    labelFa: string;
    labelSv: string;
    order: bigint;
    category: string;
}
export interface RegistrationInput {
    nameFa?: string;
    nameSv?: string;
    activityId: bigint;
    email: string;
    message?: string;
    phone?: string;
}
export interface SiteSettings {
    id: bigint;
    landingSubtitleFa: string;
    landingSubtitleSv: string;
    primaryColor: string;
    topicsBgVideo?: Blob;
    accentColor: string;
    logoUrl?: Blob;
    adminPassword: string;
    secondaryColor: string;
    topicsBgImage?: Blob;
    titleFa: string;
    titleSv: string;
}
export interface Activity {
    id: bigint;
    contentFa: string;
    contentSv: string;
    topic: Topic;
    descriptionFa: string;
    descriptionSv: string;
    createdAt: bigint;
    slug: string;
    isActive: boolean;
    updatedAt: bigint;
    imageUrl?: Blob;
    hasRegistrationForm: boolean;
    titleFa: string;
    titleSv: string;
}
export interface Area {
    id: bigint;
    order: bigint;
    icon: string;
    cardBackground?: Blob;
    subtitleFa: string;
    subtitleSv: string;
    areaBackgroundVideo?: Blob;
    areaBackground?: Blob;
    titleFa: string;
    titleSv: string;
}
export interface ContactSubmissionInput {
    name: string;
    email: string;
    message: string;
    phone?: string;
}
export interface RegistrationSubmission {
    id: bigint;
    status: SubmissionStatus;
    nameFa?: string;
    nameSv?: string;
    activityId: bigint;
    submittedAt: bigint;
    email: string;
    message?: string;
    phone?: string;
}
export interface ContactInfo {
    id: bigint;
    email: string;
    addressFa: string;
    addressSv: string;
    mapEmbedUrl?: string;
    phone: string;
}
export enum BackgroundScope {
    Sport = "Sport",
    Cultural = "Cultural",
    Educational = "Educational",
    Landing = "Landing",
    Activity = "Activity"
}
export enum SubmissionStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}
export enum Topic {
    Sport = "Sport",
    Cultural = "Cultural",
    Educational = "Educational"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addActivity(token: string, input: Activity): Promise<{
        __kind__: "ok";
        ok: Activity;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addArea(token: string, input: AreaInput): Promise<{
        __kind__: "ok";
        ok: Area;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addFooterLink(token: string, input: FooterLink): Promise<{
        __kind__: "ok";
        ok: FooterLink;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addHeroSlide(token: string, input: HeroSlide): Promise<{
        __kind__: "ok";
        ok: HeroSlide;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogin(password: string): Promise<string | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteActivity(token: string, id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteArea(token: string, id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteContactSubmission(token: string, id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteFooterLink(token: string, id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteHeroSlide(token: string, id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteSubmission(token: string, id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    emergencyResetPassword(recoverySecret: string): Promise<boolean>;
    getAbout(): Promise<AboutContent>;
    getActivities(topic: Topic | null): Promise<Array<Activity>>;
    getActivityBySlug(slug: string): Promise<Activity | null>;
    getAllActivitiesAdmin(topic: Topic | null): Promise<Array<Activity>>;
    getAllHeroSlides(): Promise<Array<HeroSlide>>;
    getAreas(): Promise<Array<Area>>;
    getBackgrounds(): Promise<Array<Background>>;
    getContactInfo(): Promise<ContactInfo | null>;
    getContactSubmissions(token: string): Promise<{
        __kind__: "ok";
        ok: Array<ContactSubmission>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getFooterLinks(): Promise<Array<FooterLink>>;
    getHeroSlides(topic: Topic): Promise<Array<HeroSlide>>;
    getRegistrationSubmissions(activityId: bigint | null): Promise<Array<RegistrationSubmission>>;
    getSiteSettings(): Promise<SiteSettings | null>;
    isCallerAdmin(): Promise<boolean>;
    reorderAreas(token: string, ids: Array<bigint>): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    reorderFooterLinks(token: string, orderedIds: Array<bigint>): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    reorderHeroSlides(token: string, orderedIds: Array<bigint>): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    resetAdminPassword(token: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    seedSampleData(): Promise<boolean>;
    setAbout(token: string, input: AboutContent): Promise<boolean>;
    setAreaBackground(token: string, areaId: bigint, blob: Blob): Promise<{
        __kind__: "ok";
        ok: Area | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setAreaBackgroundVideo(token: string, areaId: bigint, blob: Blob): Promise<{
        __kind__: "ok";
        ok: Area | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setAreaCardBackground(token: string, areaId: bigint, blob: Blob): Promise<{
        __kind__: "ok";
        ok: Area | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setBackground(token: string, input: Background): Promise<{
        __kind__: "ok";
        ok: Background;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setContactInfo(token: string, input: ContactInfo): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setSiteSettings(token: string, input: SiteSettings): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitContactForm(input: ContactSubmissionInput): Promise<ContactSubmission>;
    submitRegistration(input: RegistrationInput): Promise<RegistrationSubmission>;
    updateActivity(token: string, updated: Activity): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateAdminPassword(token: string, currentPassword: string, newPassword: string): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateArea(token: string, id: bigint, input: AreaInput): Promise<{
        __kind__: "ok";
        ok: Area | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateFooterLink(token: string, updated: FooterLink): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateHeroSlide(token: string, updated: HeroSlide): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateSubmissionStatus(token: string, id: bigint, status: SubmissionStatus): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
