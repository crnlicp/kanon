import List "mo:core/List";
import AuthLib "../lib/auth";
import ContentLib "../lib/content";
import ContentTypes "../types/content";

mixin (
  sessionState : AuthLib.SessionState,
  heroSlides : List.List<ContentTypes.HeroSlide>,
  activities : List.List<ContentTypes.Activity>,
  backgrounds : List.List<ContentTypes.Background>,
  footerLinks : List.List<ContentTypes.FooterLink>,
  nextHeroSlideId : { var value : Nat },
  nextActivityId : { var value : Nat },
  nextBackgroundId : { var value : Nat },
  nextFooterLinkId : { var value : Nat },
) {
  // --- HeroSlides ---

  public query func getHeroSlides(topic : ContentTypes.Topic) : async [ContentTypes.HeroSlide] {
    ContentLib.getHeroSlides(heroSlides, topic);
  };

  public query func getAllHeroSlides() : async [ContentTypes.HeroSlide] {
    ContentLib.getAllHeroSlides(heroSlides);
  };

  public shared func addHeroSlide(token : Text, input : ContentTypes.HeroSlide) : async { #ok : ContentTypes.HeroSlide; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.addHeroSlide(heroSlides, nextHeroSlideId, input));
  };

  public shared func updateHeroSlide(token : Text, updated : ContentTypes.HeroSlide) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.updateHeroSlide(heroSlides, updated));
  };

  public shared func deleteHeroSlide(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.deleteHeroSlide(heroSlides, id));
  };

  public shared func reorderHeroSlides(token : Text, orderedIds : [Nat]) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    ContentLib.reorderHeroSlides(heroSlides, orderedIds);
    #ok(true);
  };

  // --- Activities ---

  public query func getActivities(topic : ?ContentTypes.Topic) : async [ContentTypes.Activity] {
    ContentLib.getActivities(activities, topic);
  };

  public query func getAllActivitiesAdmin(topic : ?ContentTypes.Topic) : async [ContentTypes.Activity] {
    ContentLib.getAllActivities(activities, topic);
  };

  public query func getActivityBySlug(slug : Text) : async ?ContentTypes.Activity {
    ContentLib.getActivityBySlug(activities, slug);
  };

  public shared func addActivity(token : Text, input : ContentTypes.Activity) : async { #ok : ContentTypes.Activity; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.addActivity(activities, nextActivityId, input));
  };

  public shared func updateActivity(token : Text, updated : ContentTypes.Activity) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.updateActivity(activities, updated));
  };

  public shared func deleteActivity(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.deleteActivity(activities, id));
  };

  // --- Backgrounds ---

  public query func getBackgrounds() : async [ContentTypes.Background] {
    ContentLib.getBackgrounds(backgrounds);
  };

  public shared func setBackground(token : Text, input : ContentTypes.Background) : async { #ok : ContentTypes.Background; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.setBackground(backgrounds, nextBackgroundId, input));
  };

  // --- FooterLinks ---

  public query func getFooterLinks() : async [ContentTypes.FooterLink] {
    ContentLib.getFooterLinks(footerLinks);
  };

  public shared func addFooterLink(token : Text, input : ContentTypes.FooterLink) : async { #ok : ContentTypes.FooterLink; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.addFooterLink(footerLinks, nextFooterLinkId, input));
  };

  public shared func updateFooterLink(token : Text, updated : ContentTypes.FooterLink) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.updateFooterLink(footerLinks, updated));
  };

  public shared func deleteFooterLink(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContentLib.deleteFooterLink(footerLinks, id));
  };

  public shared func reorderFooterLinks(token : Text, orderedIds : [Nat]) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    ContentLib.reorderFooterLinks(footerLinks, orderedIds);
    #ok(true);
  };
};
