import AuthLib "../lib/auth";
import SettingsLib "../lib/settings";
import SettingsTypes "../types/settings";

mixin (
  sessionState : AuthLib.SessionState,
  siteSettingsHolder : { var value : ?SettingsTypes.SiteSettings },
  contactInfoHolder : { var value : ?SettingsTypes.ContactInfo },
) {
  let DEFAULT_ADMIN_PASSWORD : Text = "kanonGolYasAdminPassword";
  /// Resolve the effective admin password — always syncs siteSettings → sessionState.
  /// Falls back to DEFAULT_ADMIN_PASSWORD if nothing is set.
  func syncAndGetEffectivePassword() : Text {
    switch (siteSettingsHolder.value) {
      case (?s) {
        let pwd = if (s.adminPassword.size() > 0) s.adminPassword else DEFAULT_ADMIN_PASSWORD;
        sessionState.adminPassword.value := pwd;
        pwd
      };
      case null {
        // No site settings yet — use sessionState value (persisted default)
        let pwd = if (sessionState.adminPassword.value.size() > 0) sessionState.adminPassword.value else DEFAULT_ADMIN_PASSWORD;
        sessionState.adminPassword.value := pwd;
        pwd
      };
    };
  };

  /// Public: attempt admin login with password. Returns ?sessionToken or null.
  public shared func adminLogin(password : Text) : async ?Text {
    // Always sync effective password before comparing
    ignore syncAndGetEffectivePassword();
    AuthLib.login(sessionState, password)
  };

  /// Public: invalidate a session token.

  public query func getSiteSettings() : async ?SettingsTypes.SiteSettings {
    SettingsLib.getSiteSettings(siteSettingsHolder.value);
  };

  public shared func setSiteSettings(token : Text, input : SettingsTypes.SiteSettings) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    // Preserve existing adminPassword if the incoming one is empty
    let safeInput : SettingsTypes.SiteSettings = if (input.adminPassword.size() == 0) {
      let existingPwd = switch (siteSettingsHolder.value) {
        case (?s) if (s.adminPassword.size() > 0) s.adminPassword else DEFAULT_ADMIN_PASSWORD;
        case null DEFAULT_ADMIN_PASSWORD;
      };
      { input with adminPassword = existingPwd }
    } else {
      input
    };
    SettingsLib.setSiteSettings(siteSettingsHolder, safeInput);
    // Keep sessionState in sync
    sessionState.adminPassword.value := safeInput.adminPassword;
    #ok(true);
  };

  public query func getContactInfo() : async ?SettingsTypes.ContactInfo {
    SettingsLib.getContactInfo(contactInfoHolder.value);
  };

  public shared func setContactInfo(token : Text, input : SettingsTypes.ContactInfo) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    SettingsLib.setContactInfo(contactInfoHolder, input);
    #ok(true);
  };

  public shared func updateAdminPassword(token : Text, currentPassword : Text, newPassword : Text) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    // Verify current password before updating
    if (currentPassword != sessionState.adminPassword.value) return #err("Current password is incorrect");
    if (newPassword.size() == 0) return #ok(false);
    let ok = AuthLib.updatePassword(sessionState, newPassword);
    if (ok) {
      switch (siteSettingsHolder.value) {
        case (?s) {
          siteSettingsHolder.value := ?{ s with adminPassword = newPassword };
        };
        case null {
          // No settings yet — just keep sessionState updated (already done by AuthLib.updatePassword)
        };
      };
    };
    #ok(ok);
  };

  /// Reset admin password back to the factory default.
  public shared func resetAdminPassword(token : Text) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    sessionState.adminPassword.value := DEFAULT_ADMIN_PASSWORD;
    switch (siteSettingsHolder.value) {
      case (?s) {
        siteSettingsHolder.value := ?{ s with adminPassword = DEFAULT_ADMIN_PASSWORD };
      };
      case null {};
    };
    #ok(true);
  };


};
