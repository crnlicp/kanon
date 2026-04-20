import ContentTypes "../types/content";

module {
  public func defaultAbout() : ContentTypes.AboutContent {
    {
      id = 1;
      contentFa = "";
      contentSv = "";
      imagePath = null;
    };
  };

  public func getAbout(holder : { var value : ?ContentTypes.AboutContent }) : ContentTypes.AboutContent {
    switch (holder.value) {
      case (?about) about;
      case null defaultAbout();
    };
  };

  public func setAbout(
    holder : { var value : ?ContentTypes.AboutContent },
    input : ContentTypes.AboutContent,
  ) : () {
    holder.value := ?input;
  };
};
