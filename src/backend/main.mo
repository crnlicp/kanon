import List "mo:core/List";
import AuthLib "lib/auth";

import ContentTypes "types/content";
import SettingsTypes "types/settings";
import AreaTypes "types/area";
import RegTypes "types/registration";
import SettingsApi "mixins/settings-api";
import ContentApi "mixins/content-api";
import RegistrationApi "mixins/registration-api";
import AreaApi "mixins/area-api";
import SeedApi "mixins/seed-api";
import AboutApi "mixins/about-api";
import ContactApi "mixins/contact-api";

persistent actor {
  // --- Session / Auth State ---
  transient let sessionState = AuthLib.newSessionState();

  // --- Site Settings ---
  transient let siteSettingsHolder : { var value : ?SettingsTypes.SiteSettings } = { var value = null };
  transient let contactInfoHolder : { var value : ?SettingsTypes.ContactInfo } = { var value = null };

  // --- Content State ---
  transient let heroSlides = List.empty<ContentTypes.HeroSlide>();
  transient let activities = List.empty<ContentTypes.Activity>();
  transient let backgrounds = List.empty<ContentTypes.Background>();
  transient let footerLinks = List.empty<ContentTypes.FooterLink>();

  // --- Area State ---
  transient let areas = List.empty<AreaTypes.Area>();

  // --- Registration State ---
  transient let submissions = List.empty<RegTypes.RegistrationSubmission>();

  // --- About State ---
  transient let aboutHolder : { var value : ?ContentTypes.AboutContent } = { var value = null };

  // --- Contact Submissions State ---
  transient let contactSubmissions = List.empty<RegTypes.ContactSubmission>();

  // --- ID Counters ---
  transient let nextHeroSlideId : { var value : Nat } = { var value = 1 };
  transient let nextActivityId : { var value : Nat } = { var value = 1 };
  transient let nextBackgroundId : { var value : Nat } = { var value = 1 };
  transient let nextFooterLinkId : { var value : Nat } = { var value = 1 };
  transient let nextSubmissionId : { var value : Nat } = { var value = 1 };
  transient let nextAreaId : { var value : Nat } = { var value = 1 };
  transient let nextContactSubmissionId : { var value : Nat } = { var value = 1 };

  // --- Seed Flag ---
  transient let seededHolder : { var value : Bool } = { var value = false };

  // --- Mixin Includes ---
  include SettingsApi(
    sessionState,
    siteSettingsHolder,
    contactInfoHolder,
  );

  include ContentApi(
    sessionState,
    heroSlides,
    activities,
    backgrounds,
    footerLinks,
    nextHeroSlideId,
    nextActivityId,
    nextBackgroundId,
    nextFooterLinkId,
  );

  include RegistrationApi(
    sessionState,
    submissions,
    nextSubmissionId,
  );

  include AreaApi(
    sessionState,
    areas,
    nextAreaId,
  );

  include AboutApi(
    sessionState,
    aboutHolder,
  );

  include ContactApi(
    sessionState,
    contactSubmissions,
    nextContactSubmissionId,
  );

  include SeedApi(
    siteSettingsHolder,
    contactInfoHolder,
    heroSlides,
    activities,
    backgrounds,
    footerLinks,
    areas,
    nextHeroSlideId,
    nextActivityId,
    nextBackgroundId,
    nextFooterLinkId,
    nextAreaId,
    seededHolder,
  );
};
