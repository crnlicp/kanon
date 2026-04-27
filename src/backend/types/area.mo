module {
  public type Area = {
    id : Nat;
    icon : Text;
    titleFa : Text;
    titleSv : Text;
    subtitleFa : Text;
    subtitleSv : Text;
    cardBackground : ?[Nat8];
    areaBackground : ?[Nat8];
    areaBackgroundVideo : ?[Nat8];
    order : Nat;
    topic : Text;
  };

  public type AreaInput = {
    icon : Text;
    titleFa : Text;
    titleSv : Text;
    subtitleFa : Text;
    subtitleSv : Text;
    topic : Text;
  };
};
