declare interface UserState {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  lastSignedInAt: string | null;
  createdAt: string | null;
}

declare interface AuthState {
  token: string | null;
  isAuthenticating: boolean;
  user: UserState | null;
  error: string | null;
}

declare interface SignInParams {
  email: string;
  password: string;
}
