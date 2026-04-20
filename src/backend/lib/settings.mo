import Runtime "mo:core/Runtime";
import SettingsTypes "../types/settings";

module {
  public func getSiteSettings(settings : ?SettingsTypes.SiteSettings) : ?SettingsTypes.SiteSettings {
    settings;
  };

  public func setSiteSettings(
    settingsHolder : { var value : ?SettingsTypes.SiteSettings },
    input : SettingsTypes.SiteSettings,
  ) : () {
    settingsHolder.value := ?input;
  };

  public func getContactInfo(info : ?SettingsTypes.ContactInfo) : ?SettingsTypes.ContactInfo {
    info;
  };

  public func setContactInfo(
    infoHolder : { var value : ?SettingsTypes.ContactInfo },
    input : SettingsTypes.ContactInfo,
  ) : () {
    infoHolder.value := ?input;
  };

  public func updateAdminPassword(
    settingsHolder : { var value : ?SettingsTypes.SiteSettings },
    newPassword : Text,
  ) : Bool {
    if (newPassword.size() == 0) return false;
    switch (settingsHolder.value) {
      case (?s) {
        settingsHolder.value := ?{ s with adminPassword = newPassword };
        true;
      };
      case null {
        Runtime.trap("Site settings not initialized");
      };
    };
  };
};
