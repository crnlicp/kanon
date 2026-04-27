import type { Principal } from '@icp-sdk/core/principal';
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export interface AboutContent {
  'id' : bigint,
  'contentFa' : string,
  'contentSv' : string,
  'imagePath' : [] | [string],
}
export interface Activity {
  'id' : bigint,
  'contentFa' : string,
  'contentSv' : string,
  'topic' : Topic,
  'descriptionFa' : string,
  'descriptionSv' : string,
  'createdAt' : bigint,
  'slug' : string,
  'isActive' : boolean,
  'updatedAt' : bigint,
  'imageUrl' : [] | [Uint8Array | number[]],
  'hasRegistrationForm' : boolean,
  'titleFa' : string,
  'titleSv' : string,
}
export interface Area {
  'id' : bigint,
  'order' : bigint,
  'icon' : string,
  'cardBackground' : [] | [Uint8Array | number[]],
  'subtitleFa' : string,
  'subtitleSv' : string,
  'areaBackgroundVideo' : [] | [Uint8Array | number[]],
  'areaBackground' : [] | [Uint8Array | number[]],
  'titleFa' : string,
  'titleSv' : string,
}
export interface AreaInput {
  'icon' : string,
  'subtitleFa' : string,
  'subtitleSv' : string,
  'titleFa' : string,
  'titleSv' : string,
}
export interface Background {
  'id' : bigint,
  'activitySlug' : [] | [string],
  'scope' : string,
  'imageUrl' : [] | [Uint8Array | number[]],
  'mediaType' : [] | [string],
}
export interface ContactInfo {
  'id' : bigint,
  'email' : string,
  'addressFa' : string,
  'addressSv' : string,
  'mapEmbedUrl' : [] | [string],
  'phone' : string,
}
export interface ContactSubmission {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'message' : string,
  'timestamp' : bigint,
  'phone' : [] | [string],
}
export interface ContactSubmissionInput {
  'name' : string,
  'email' : string,
  'message' : string,
  'phone' : [] | [string],
}
export interface FooterLink {
  'id' : bigint,
  'url' : string,
  'labelFa' : string,
  'labelSv' : string,
  'order' : bigint,
  'category' : string,
}
export interface HeroSlide {
  'id' : bigint,
  'topic' : Topic,
  'order' : bigint,
  'isActive' : boolean,
  'imageUrl' : [] | [Uint8Array | number[]],
  'subtitleFa' : string,
  'subtitleSv' : string,
  'titleFa' : string,
  'titleSv' : string,
}
export interface RegistrationInput {
  'nameFa' : [] | [string],
  'nameSv' : [] | [string],
  'activityId' : bigint,
  'email' : string,
  'message' : [] | [string],
  'phone' : [] | [string],
}
export interface RegistrationSubmission {
  'id' : bigint,
  'status' : SubmissionStatus,
  'nameFa' : [] | [string],
  'nameSv' : [] | [string],
  'activityId' : bigint,
  'submittedAt' : bigint,
  'email' : string,
  'message' : [] | [string],
  'phone' : [] | [string],
}
export interface SiteSettings {
  'id' : bigint,
  'landingSubtitleFa' : string,
  'landingSubtitleSv' : string,
  'primaryColor' : string,
  'topicsBgVideo' : [] | [Uint8Array | number[]],
  'accentColor' : string,
  'logoUrl' : [] | [Uint8Array | number[]],
  'adminPassword' : string,
  'secondaryColor' : string,
  'topicsBgImage' : [] | [Uint8Array | number[]],
  'titleFa' : string,
  'titleSv' : string,
}
export type SubmissionStatus = { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'Pending' : null };
export type Topic = string;
export interface _SERVICE {
  'addActivity' : ActorMethod<
    [string, Activity],
    { 'ok' : Activity } |
      { 'err' : string }
  >,
  'addArea' : ActorMethod<
    [string, AreaInput],
    { 'ok' : Area } |
      { 'err' : string }
  >,
  'addFooterLink' : ActorMethod<
    [string, FooterLink],
    { 'ok' : FooterLink } |
      { 'err' : string }
  >,
  'addHeroSlide' : ActorMethod<
    [string, HeroSlide],
    { 'ok' : HeroSlide } |
      { 'err' : string }
  >,
  'adminLogin' : ActorMethod<[string], [] | [string]>,
  'adminLogout' : ActorMethod<[string], undefined>,
  'deleteActivity' : ActorMethod<
    [string, bigint],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'deleteArea' : ActorMethod<
    [string, bigint],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'deleteContactSubmission' : ActorMethod<
    [string, bigint],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'deleteFooterLink' : ActorMethod<
    [string, bigint],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'deleteHeroSlide' : ActorMethod<
    [string, bigint],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'deleteSubmission' : ActorMethod<
    [string, bigint],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'getAbout' : ActorMethod<[], AboutContent>,
  'getActivities' : ActorMethod<[[] | [Topic]], Array<Activity>>,
  'getActivityBySlug' : ActorMethod<[string], [] | [Activity]>,
  'getAllActivitiesAdmin' : ActorMethod<[[] | [Topic]], Array<Activity>>,
  'getAllHeroSlides' : ActorMethod<[], Array<HeroSlide>>,
  'getAreas' : ActorMethod<[], Array<Area>>,
  'getBackgrounds' : ActorMethod<[], Array<Background>>,
  'getContactInfo' : ActorMethod<[], [] | [ContactInfo]>,
  'getContactSubmissions' : ActorMethod<
    [string],
    { 'ok' : Array<ContactSubmission> } |
      { 'err' : string }
  >,
  'getFooterLinks' : ActorMethod<[], Array<FooterLink>>,
  'getHeroSlides' : ActorMethod<[Topic], Array<HeroSlide>>,
  'getRegistrationSubmissions' : ActorMethod<
    [[] | [bigint]],
    Array<RegistrationSubmission>
  >,
  'getSiteSettings' : ActorMethod<[], [] | [SiteSettings]>,
  'reorderAreas' : ActorMethod<
    [string, Array<bigint>],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'reorderFooterLinks' : ActorMethod<
    [string, Array<bigint>],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'reorderHeroSlides' : ActorMethod<
    [string, Array<bigint>],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'resetAdminPassword' : ActorMethod<
    [string],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'seedSampleData' : ActorMethod<[], boolean>,
  'setAbout' : ActorMethod<
    [string, AboutContent],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'setAreaBackground' : ActorMethod<
    [string, bigint, Uint8Array | number[]],
    { 'ok' : [] | [Area] } |
      { 'err' : string }
  >,
  'setAreaBackgroundVideo' : ActorMethod<
    [string, bigint, Uint8Array | number[]],
    { 'ok' : [] | [Area] } |
      { 'err' : string }
  >,
  'setAreaCardBackground' : ActorMethod<
    [string, bigint, Uint8Array | number[]],
    { 'ok' : [] | [Area] } |
      { 'err' : string }
  >,
  'setBackground' : ActorMethod<
    [string, Background],
    { 'ok' : Background } |
      { 'err' : string }
  >,
  'setContactInfo' : ActorMethod<
    [string, ContactInfo],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'setSiteSettings' : ActorMethod<
    [string, SiteSettings],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'submitContactForm' : ActorMethod<
    [ContactSubmissionInput],
    ContactSubmission
  >,
  'submitRegistration' : ActorMethod<
    [RegistrationInput],
    RegistrationSubmission
  >,
  'updateActivity' : ActorMethod<
    [string, Activity],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'updateAdminPassword' : ActorMethod<
    [string, string, string],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'updateArea' : ActorMethod<
    [string, bigint, AreaInput],
    { 'ok' : [] | [Area] } |
      { 'err' : string }
  >,
  'updateFooterLink' : ActorMethod<
    [string, FooterLink],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'updateHeroSlide' : ActorMethod<
    [string, HeroSlide],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
  'updateSubmissionStatus' : ActorMethod<
    [string, bigint, SubmissionStatus],
    { 'ok' : boolean } |
      { 'err' : string }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
