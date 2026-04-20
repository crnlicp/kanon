import AuthLib "../lib/auth";
import ContactLib "../lib/contact";
import List "mo:core/List";
import RegTypes "../types/registration";

mixin (
  sessionState : AuthLib.SessionState,
  contactSubmissions : List.List<RegTypes.ContactSubmission>,
  nextContactSubmissionId : { var value : Nat },
) {
  // Admin-only: view all contact submissions
  public shared func getContactSubmissions(token : Text) : async { #ok : [RegTypes.ContactSubmission]; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContactLib.getContactSubmissions(contactSubmissions));
  };

  // Public: anyone can submit the contact form
  public shared func submitContactForm(input : RegTypes.ContactSubmissionInput) : async RegTypes.ContactSubmission {
    ContactLib.addContactSubmission(contactSubmissions, nextContactSubmissionId, input);
  };

  // Admin-only: delete a contact submission
  public shared func deleteContactSubmission(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(ContactLib.deleteContactSubmission(contactSubmissions, id));
  };
};
