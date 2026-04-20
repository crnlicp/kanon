import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type SiteSettings = {
    id : Nat;
    logoUrl : ?Storage.ExternalBlob;
    titleFa : Text;
    titleSv : Text;
    landingSubtitleFa : Text;
    landingSubtitleSv : Text;
    primaryColor : Text;
    secondaryColor : Text;
    accentColor : Text;
    adminPassword : Text;
    topicsBgImage : ?Storage.ExternalBlob;
    topicsBgVideo : ?Storage.ExternalBlob;
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
