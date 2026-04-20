import List "mo:core/List";
import Time "mo:core/Time";
import RegTypes "../types/registration";

module {
  public func getContactSubmissions(
    submissions : List.List<RegTypes.ContactSubmission>,
  ) : [RegTypes.ContactSubmission] {
    submissions.toArray();
  };

  public func addContactSubmission(
    submissions : List.List<RegTypes.ContactSubmission>,
    nextId : { var value : Nat },
    input : RegTypes.ContactSubmissionInput,
  ) : RegTypes.ContactSubmission {
    let id = nextId.value;
    nextId.value += 1;
    let submission : RegTypes.ContactSubmission = {
      id;
      name = input.name;
      email = input.email;
      phone = input.phone;
      message = input.message;
      timestamp = Time.now();
    };
    submissions.add(submission);
    submission;
  };

  public func deleteContactSubmission(
    submissions : List.List<RegTypes.ContactSubmission>,
    id : Nat,
  ) : Bool {
    let sizeBefore = submissions.size();
    let kept = submissions.filter(func(s : RegTypes.ContactSubmission) : Bool { s.id != id });
    submissions.clear();
    submissions.append(kept);
    submissions.size() < sizeBefore;
  };
};
