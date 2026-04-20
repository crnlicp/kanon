import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Text "mo:core/Text";

module {
  // Session token storage: token -> expiry timestamp (nanoseconds)
  public type SessionState = {
    tokens : Map.Map<Text, Int>;
    adminPassword : { var value : Text };
  };

  let SESSION_DURATION_NS : Int = 86_400_000_000_000; // 24 hours in nanoseconds
  public let DEFAULT_PASSWORD : Text = "kanonGolYasAdminPassword";

  public func newSessionState() : SessionState {
    {
      tokens = Map.empty<Text, Int>();
      adminPassword = { var value = DEFAULT_PASSWORD };
    };
  };

  /// Generate a unique session token from current time.
  func generateToken(now : Int) : Text {
    let t1 = now.toText();
    let t2 = (now * 1337 + 42).toText();
    t1 # "-" # t2
  };

  /// Attempt admin login with password. Returns ?token on success, null on failure.
  public func login(state : SessionState, password : Text) : ?Text {
    if (password != state.adminPassword.value) return null;
    let now = Time.now();
    let token = generateToken(now);
    state.tokens.add(token, now + SESSION_DURATION_NS);
    ?token
  };

  /// Invalidate a session token.
  public func logout(state : SessionState, token : Text) : () {
    state.tokens.remove(token);
  };

  /// Check if a session token is valid and not expired.
  public func isValidSession(state : SessionState, token : Text) : Bool {
    switch (state.tokens.get(token)) {
      case null false;
      case (?expiry) {
        let now = Time.now();
        if (now > expiry) {
          state.tokens.remove(token);
          false
        } else {
          true
        }
      };
    };
  };

  /// Update the admin password. Returns false if empty.
  public func updatePassword(state : SessionState, newPassword : Text) : Bool {
    if (newPassword.size() == 0) return false;
    state.adminPassword.value := newPassword;
    true
  };

  /// Reset password to the factory default.
  public func resetPassword(state : SessionState) : () {
    state.adminPassword.value := DEFAULT_PASSWORD;
  };
};
