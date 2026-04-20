import List "mo:core/List";
import AuthLib "../lib/auth";
import RegLib "../lib/registration";
import RegTypes "../types/registration";

mixin (
  sessionState : AuthLib.SessionState,
  submissions : List.List<RegTypes.RegistrationSubmission>,
  nextSubmissionId : { var value : Nat },
) {
  // Public: anyone can query their own submissions (filtered by activityId)
  public query func getRegistrationSubmissions(activityId : ?Nat) : async [RegTypes.RegistrationSubmission] {
    RegLib.getRegistrationSubmissions(submissions, activityId);
  };

  // Public: anyone can submit a registration
  public shared func submitRegistration(input : RegTypes.RegistrationInput) : async RegTypes.RegistrationSubmission {
    RegLib.submitRegistration(submissions, nextSubmissionId, input);
  };

  // Admin-only: update submission status
  public shared func updateSubmissionStatus(token : Text, id : Nat, status : RegTypes.SubmissionStatus) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(RegLib.updateSubmissionStatus(submissions, id, status));
  };

  // Admin-only: delete a submission
  public shared func deleteSubmission(token : Text, id : Nat) : async { #ok : Bool; #err : Text } {
    if (not AuthLib.isValidSession(sessionState, token)) return #err("Unauthorized");
    #ok(RegLib.deleteSubmission(submissions, id));
  };
};
