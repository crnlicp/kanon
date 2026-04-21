module {
  public type SiteSettings = {
    id : Nat;
    logoUrl : ?[Nat8];
    titleFa : Text;
    titleSv : Text;
    landingSubtitleFa : Text;
    landingSubtitleSv : Text;
    primaryColor : Text;
    secondaryColor : Text;
    accentColor : Text;
    adminPassword : Text;
    topicsBgImage : ?[Nat8];
    topicsBgVideo : ?[Nat8];
  };

  public type ContactInfo = {
    id : Nat;
    addressFa : Text;
    addressSv : Text;
    phone : Text;
    email : Text;
    mapEmbedUrl : ?Text;
  };
};
