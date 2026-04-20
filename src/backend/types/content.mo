import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Topic = {
    #Cultural;
    #Educational;
    #Sport;
  };

  public type HeroSlide = {
    id : Nat;
    topic : Topic;
    titleFa : Text;
    titleSv : Text;
    subtitleFa : Text;
    subtitleSv : Text;
    imageUrl : ?Storage.ExternalBlob;
    order : Nat;
    isActive : Bool;
  };

  public type Activity = {
    id : Nat;
    topic : Topic;
    slug : Text;
    titleFa : Text;
    titleSv : Text;
    descriptionFa : Text;
    descriptionSv : Text;
    contentFa : Text;
    contentSv : Text;
    imageUrl : ?Storage.ExternalBlob;
    isActive : Bool;
    hasRegistrationForm : Bool;
    createdAt : Int;
    updatedAt : Int;
  };

  public type BackgroundScope = {
    #Landing;
    #Cultural;
    #Educational;
    #Sport;
    #Activity;
  };

  public type Background = {
    id : Nat;
    scope : BackgroundScope;
    activitySlug : ?Text;
    imageUrl : ?Storage.ExternalBlob;
    mediaType : ?Text;
  };

  public type FooterLink = {
    id : Nat;
    labelFa : Text;
    labelSv : Text;
    url : Text;
    order : Nat;
    category : Text;
  };

  public type AboutContent = {
    id : Nat;
    contentFa : Text;
    contentSv : Text;
    imagePath : ?Text;
  };
};
