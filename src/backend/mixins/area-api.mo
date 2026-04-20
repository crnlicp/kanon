import List "mo:core/List";
import AuthLib "../lib/auth";
import AreaLib "../lib/area";
import AreaTypes "../types/area";
import Storage "mo:caffeineai-object-storage/Storage";

mixin (
  sessionState : AuthLib.SessionState,
  areas : List.List<AreaTypes.Area>,
  nextAreaId : { var value : Nat },
) {
  public query func getAreas() : async [AreaTypes.Area] {
    AreaLib.getAreas(areas);
  };

  public shared func addArea(token : Text, input : AreaTypes.AreaInput) : async { #ok : AreaTypes.Area; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(AreaLib.addArea(areas, nextAreaId, input));
  };

  public shared func updateArea(token : Text, id : Nat, input : AreaTypes.AreaInput) : async { #ok : ?AreaTypes.Area; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(AreaLib.updateArea(areas, id, input));
  };

  public shared func deleteArea(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(AreaLib.deleteArea(areas, id));
  };

  public shared func reorderAreas(token : Text, ids : [Nat]) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(AreaLib.reorderAreas(areas, ids));
  };

  public shared func setAreaCardBackground(token : Text, areaId : Nat, blob : Storage.ExternalBlob) : async { #ok : ?AreaTypes.Area; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(AreaLib.setAreaCardBackground(areas, areaId, blob));
  };

  public shared func setAreaBackground(token : Text, areaId : Nat, blob : Storage.ExternalBlob) : async { #ok : ?AreaTypes.Area; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(AreaLib.setAreaBackground(areas, areaId, blob));
  };

  public shared func setAreaBackgroundVideo(token : Text, areaId : Nat, blob : Storage.ExternalBlob) : async { #ok : ?AreaTypes.Area; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(AreaLib.setAreaBackgroundVideo(areas, areaId, blob));
  };
};
