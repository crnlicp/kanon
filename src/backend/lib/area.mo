import List "mo:core/List";
import AreaTypes "../types/area";

module {
  public func getAreas(areas : List.List<AreaTypes.Area>) : [AreaTypes.Area] {
    let sorted = areas.sort(func(a, b) {
      if (a.order < b.order) #less
      else if (a.order > b.order) #greater
      else #equal
    });
    sorted.toArray();
  };

  public func addArea(
    areas : List.List<AreaTypes.Area>,
    nextId : { var value : Nat },
    input : AreaTypes.AreaInput,
  ) : AreaTypes.Area {
    let area : AreaTypes.Area = {
      id = nextId.value;
      icon = input.icon;
      titleFa = input.titleFa;
      titleSv = input.titleSv;
      subtitleFa = input.subtitleFa;
      subtitleSv = input.subtitleSv;
      cardBackground = null;
      areaBackground = null;
      areaBackgroundVideo = null;
      order = areas.size();
      topic = input.topic;
    };
    nextId.value += 1;
    areas.add(area);
    area;
  };

  public func updateArea(
    areas : List.List<AreaTypes.Area>,
    id : Nat,
    input : AreaTypes.AreaInput,
  ) : ?AreaTypes.Area {
    var result : ?AreaTypes.Area = null;
    areas.mapInPlace(
      func(a) {
        if (a.id == id) {
          let updated : AreaTypes.Area = {
            a with
            icon = input.icon;
            titleFa = input.titleFa;
            titleSv = input.titleSv;
            subtitleFa = input.subtitleFa;
            subtitleSv = input.subtitleSv;
            topic = input.topic;
          };
          result := ?updated;
          updated;
        } else { a };
      }
    );
    result;
  };

  public func deleteArea(areas : List.List<AreaTypes.Area>, id : Nat) : Bool {
    let before = areas.size();
    let kept = areas.filter(func(a) { a.id != id });
    areas.clear();
    areas.append(kept);
    areas.size() < before;
  };

  public func reorderAreas(areas : List.List<AreaTypes.Area>, ids : [Nat]) : Bool {
    areas.mapInPlace(
      func(a) {
        var newOrder = a.order;
        var i = 0;
        label search for (id in ids.values()) {
          if (id == a.id) { newOrder := i; break search };
          i += 1;
        };
        { a with order = newOrder };
      }
    );
    true;
  };

  public func setAreaCardBackground(
    areas : List.List<AreaTypes.Area>,
    areaId : Nat,
    blob : [Nat8],
  ) : ?AreaTypes.Area {
    var result : ?AreaTypes.Area = null;
    areas.mapInPlace(
      func(a) {
        if (a.id == areaId) {
          let updated : AreaTypes.Area = { a with cardBackground = ?blob };
          result := ?updated;
          updated;
        } else { a };
      }
    );
    result;
  };

  public func setAreaBackground(
    areas : List.List<AreaTypes.Area>,
    areaId : Nat,
    blob : [Nat8],
  ) : ?AreaTypes.Area {
    var result : ?AreaTypes.Area = null;
    areas.mapInPlace(
      func(a) {
        if (a.id == areaId) {
          let updated : AreaTypes.Area = { a with areaBackground = ?blob };
          result := ?updated;
          updated;
        } else { a };
      }
    );
    result;
  };

  public func setAreaBackgroundVideo(
    areas : List.List<AreaTypes.Area>,
    areaId : Nat,
    blob : [Nat8],
  ) : ?AreaTypes.Area {
    var result : ?AreaTypes.Area = null;
    areas.mapInPlace(
      func(a) {
        if (a.id == areaId) {
          let updated : AreaTypes.Area = { a with areaBackgroundVideo = ?blob };
          result := ?updated;
          updated;
        } else { a };
      }
    );
    result;
  };
};
