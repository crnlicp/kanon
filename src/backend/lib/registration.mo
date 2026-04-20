import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/registration";

module {
  public func getRegistrationSubmissions(
    submissions : List.List<Types.RegistrationSubmission>,
    activityId : ?Nat,
  ) : [Types.RegistrationSubmission] {
    switch (activityId) {
      case (?aid) {
        let filtered = submissions.filter(func(s) { s.activityId == aid });
        filtered.toArray();
      };
      case null { submissions.toArray() };
    };
  };

  public func submitRegistration(
    submissions : List.List<Types.RegistrationSubmission>,
    nextId : { var value : Nat },
    input : Types.RegistrationInput,
  ) : Types.RegistrationSubmission {
    let submission : Types.RegistrationSubmission = {
      id = nextId.value;
      activityId = input.activityId;
      nameFa = input.nameFa;
      nameSv = input.nameSv;
      email = input.email;
      phone = input.phone;
      message = input.message;
      submittedAt = Time.now();
      status = #Pending;
    };
    nextId.value += 1;
    submissions.add(submission);
    submission;
  };

  public func updateSubmissionStatus(
    submissions : List.List<Types.RegistrationSubmission>,
    id : Nat,
    status : Types.SubmissionStatus,
  ) : Bool {
    var found = false;
    submissions.mapInPlace(
      func(s) {
        if (s.id == id) { found := true; { s with status = status } } else { s };
      }
    );
    found;
  };

  public func deleteSubmission(
    submissions : List.List<Types.RegistrationSubmission>,
    id : Nat,
  ) : Bool {
    let before = submissions.size();
    let kept = submissions.filter(func(s) { s.id != id });
    submissions.clear();
    submissions.append(kept);
    submissions.size() < before;
  };
};
