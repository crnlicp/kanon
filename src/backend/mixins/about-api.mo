import AuthLib "../lib/auth";
import AboutLib "../lib/about";
import ContentTypes "../types/content";

mixin (
  sessionState : AuthLib.SessionState,
  aboutHolder : { var value : ?ContentTypes.AboutContent },
) {
  public query func getAbout() : async ContentTypes.AboutContent {
    AboutLib.getAbout(aboutHolder);
  };

  public shared func setAbout(token : Text, input : ContentTypes.AboutContent) : async Bool {
    if (not AuthLib.isValidSession(sessionState, token)) return false;
    AboutLib.setAbout(aboutHolder, input);
    true;
  };
};
