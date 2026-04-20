import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/content";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // --- HeroSlide ---

  public func getHeroSlides(slides : List.List<Types.HeroSlide>, topic : Types.Topic) : [Types.HeroSlide] {
    let filtered = slides.filter(func(s) { s.topic == topic and s.isActive });
    let sorted = filtered.sort(func(a, b) {
      if (a.order < b.order) #less
      else if (a.order > b.order) #greater
      else #equal
    });
    sorted.toArray();
  };

  public func getAllHeroSlides(slides : List.List<Types.HeroSlide>) : [Types.HeroSlide] {
    slides.toArray();
  };

  public func addHeroSlide(
    slides : List.List<Types.HeroSlide>,
    nextId : { var value : Nat },
    input : Types.HeroSlide,
  ) : Types.HeroSlide {
    let slide : Types.HeroSlide = { input with id = nextId.value };
    nextId.value += 1;
    slides.add(slide);
    slide;
  };

  public func updateHeroSlide(
    slides : List.List<Types.HeroSlide>,
    updated : Types.HeroSlide,
  ) : Bool {
    var found = false;
    slides.mapInPlace(
      func(s) {
        if (s.id == updated.id) { found := true; updated } else { s };
      }
    );
    found;
  };

  public func deleteHeroSlide(slides : List.List<Types.HeroSlide>, id : Nat) : Bool {
    let before = slides.size();
    let kept = slides.filter(func(s) { s.id != id });
    slides.clear();
    slides.append(kept);
    slides.size() < before;
  };

  public func reorderHeroSlides(
    slides : List.List<Types.HeroSlide>,
    orderedIds : [Nat],
  ) : () {
    slides.mapInPlace(
      func(s) {
        var newOrder = s.order;
        var i = 0;
        label search for (id in orderedIds.values()) {
          if (id == s.id) { newOrder := i; break search };
          i += 1;
        };
        { s with order = newOrder };
      }
    );
  };

  // --- Activity ---

  public func getActivities(
    activities : List.List<Types.Activity>,
    topic : ?Types.Topic,
  ) : [Types.Activity] {
    switch (topic) {
      case (?t) {
        let filtered = activities.filter(func(a) { a.topic == t and a.isActive });
        filtered.toArray();
      };
      case null {
        let filtered = activities.filter(func(a) { a.isActive });
        filtered.toArray();
      };
    };
  };

  public func getAllActivities(
    activities : List.List<Types.Activity>,
    topic : ?Types.Topic,
  ) : [Types.Activity] {
    switch (topic) {
      case (?t) {
        let filtered = activities.filter(func(a) { a.topic == t });
        filtered.toArray();
      };
      case null { activities.toArray() };
    };
  };

  public func getActivityBySlug(
    activities : List.List<Types.Activity>,
    slug : Text,
  ) : ?Types.Activity {
    activities.find(func(a) { a.slug == slug });
  };

  public func addActivity(
    activities : List.List<Types.Activity>,
    nextId : { var value : Nat },
    input : Types.Activity,
  ) : Types.Activity {
    let now = Time.now();
    let activity : Types.Activity = {
      input with
      id = nextId.value;
      createdAt = now;
      updatedAt = now;
    };
    nextId.value += 1;
    activities.add(activity);
    activity;
  };

  public func updateActivity(
    activities : List.List<Types.Activity>,
    updated : Types.Activity,
  ) : Bool {
    var found = false;
    let now = Time.now();
    activities.mapInPlace(
      func(a) {
        if (a.id == updated.id) {
          found := true;
          { updated with updatedAt = now };
        } else { a };
      }
    );
    found;
  };

  public func deleteActivity(activities : List.List<Types.Activity>, id : Nat) : Bool {
    let before = activities.size();
    let kept = activities.filter(func(a) { a.id != id });
    activities.clear();
    activities.append(kept);
    activities.size() < before;
  };

  // --- Background ---

  public func getBackgrounds(backgrounds : List.List<Types.Background>) : [Types.Background] {
    backgrounds.toArray();
  };

  public func setBackground(
    backgrounds : List.List<Types.Background>,
    nextId : { var value : Nat },
    input : Types.Background,
  ) : Types.Background {
    // Check if a background for this scope+slug already exists; if so, replace it
    var existing = false;
    backgrounds.mapInPlace(
      func(b) {
        if (b.scope == input.scope and b.activitySlug == input.activitySlug) {
          existing := true;
          { input with id = b.id };
        } else { b };
      }
    );
    if (existing) {
      let found = switch (backgrounds.find(func(b) {
        b.scope == input.scope and b.activitySlug == input.activitySlug
      })) {
        case (?b) b;
        case null { Runtime.trap("unreachable") };
      };
      found;
    } else {
      let bg : Types.Background = { input with id = nextId.value };
      nextId.value += 1;
      backgrounds.add(bg);
      bg;
    };
  };

  // --- FooterLink ---

  public func getFooterLinks(links : List.List<Types.FooterLink>) : [Types.FooterLink] {
    let sorted = links.sort(func(a, b) {
      if (a.order < b.order) #less
      else if (a.order > b.order) #greater
      else #equal
    });
    sorted.toArray();
  };

  public func addFooterLink(
    links : List.List<Types.FooterLink>,
    nextId : { var value : Nat },
    input : Types.FooterLink,
  ) : Types.FooterLink {
    let link : Types.FooterLink = { input with id = nextId.value };
    nextId.value += 1;
    links.add(link);
    link;
  };

  public func updateFooterLink(
    links : List.List<Types.FooterLink>,
    updated : Types.FooterLink,
  ) : Bool {
    var found = false;
    links.mapInPlace(
      func(l) {
        if (l.id == updated.id) { found := true; updated } else { l };
      }
    );
    found;
  };

  public func deleteFooterLink(links : List.List<Types.FooterLink>, id : Nat) : Bool {
    let before = links.size();
    let kept = links.filter(func(l) { l.id != id });
    links.clear();
    links.append(kept);
    links.size() < before;
  };

  public func reorderFooterLinks(
    links : List.List<Types.FooterLink>,
    orderedIds : [Nat],
  ) : () {
    links.mapInPlace(
      func(l) {
        var newOrder = l.order;
        var i = 0;
        label search for (id in orderedIds.values()) {
          if (id == l.id) { newOrder := i; break search };
          i += 1;
        };
        { l with order = newOrder };
      }
    );
  };
};
