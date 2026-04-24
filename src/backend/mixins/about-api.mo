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

  public shared func setAbout(token : Text, input : ContentTypes.AboutContent) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    AboutLib.setAbout(aboutHolder, input);
    #ok(true);
  };
};
