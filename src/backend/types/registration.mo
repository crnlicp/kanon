module {
  public type SubmissionStatus = {
    #Pending;
    #Approved;
    #Rejected;
  };

  public type RegistrationSubmission = {
    id : Nat;
    activityId : Nat;
    nameFa : ?Text;
    nameSv : ?Text;
    email : Text;
    phone : ?Text;
    message : ?Text;
    submittedAt : Int;
    status : SubmissionStatus;
  };

  public type RegistrationInput = {
    activityId : Nat;
    nameFa : ?Text;
    nameSv : ?Text;
    email : Text;
    phone : ?Text;
    message : ?Text;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : ?Text;
    message : Text;
    timestamp : Int;
  };

  public type ContactSubmissionInput = {
    name : Text;
    email : Text;
    phone : ?Text;
    message : Text;
  };
};
