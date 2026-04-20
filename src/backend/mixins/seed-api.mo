import List "mo:core/List";
import SeedLib "../lib/seed";
import ContentTypes "../types/content";
import SettingsTypes "../types/settings";
import AreaTypes "../types/area";

mixin (
  siteSettingsHolder : { var value : ?SettingsTypes.SiteSettings },
  contactInfoHolder : { var value : ?SettingsTypes.ContactInfo },
  heroSlides : List.List<ContentTypes.HeroSlide>,
  activities : List.List<ContentTypes.Activity>,
  backgrounds : List.List<ContentTypes.Background>,
  footerLinks : List.List<ContentTypes.FooterLink>,
  areas : List.List<AreaTypes.Area>,
  nextHeroSlideId : { var value : Nat },
  nextActivityId : { var value : Nat },
  nextBackgroundId : { var value : Nat },
  nextFooterLinkId : { var value : Nat },
  nextAreaId : { var value : Nat },
  seeded : { var value : Bool },
) {
  public shared func seedSampleData() : async Bool {
    if (seeded.value) return false;
    SeedLib.seedSampleData(
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
      seeded,
    );
  };
};
