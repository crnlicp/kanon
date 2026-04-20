import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Area = {
    id : Nat;
    icon : Text;
    titleFa : Text;
    titleSv : Text;
    subtitleFa : Text;
    subtitleSv : Text;
    cardBackground : ?Storage.ExternalBlob;
    areaBackground : ?Storage.ExternalBlob;
    areaBackgroundVideo : ?Storage.ExternalBlob;
    order : Nat;
  };

  public type AreaInput = {
    icon : Text;
    titleFa : Text;
    titleSv : Text;
    subtitleFa : Text;
    subtitleSv : Text;
  };
};
