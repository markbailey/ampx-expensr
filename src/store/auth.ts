import { AnyAction, ThunkDispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutOfFirebase,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const initialState: AuthState = {
  token: null,
  isAuthenticating: true,
  user: null,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: SignInParams) =>
    await signInWithEmailAndPassword(auth, email, password)
);

export const signOut = createAsyncThunk('auth/signOut', async () => await signOutOfFirebase(auth));
export const verifyAuth = createAsyncThunk('auth/verifyAuth', async (user: User | null) => {
  if (user === null) return { token: null, user: null };

  const { displayName, email, uid, emailVerified, metadata } = user;
  const { creationTime, lastSignInTime } = metadata;
  const createdAt = creationTime ?? null;
  const lastSignedInAt = lastSignInTime ?? null;
  const token = await user.getIdToken();
  const newUser: UserState = {
    uid,
    email,
    emailVerified,
    displayName,
    createdAt,
    lastSignedInAt,
  };

  return { token, user: newUser };
});

export function onAuthChanged(
  dispatch: ThunkDispatch<AuthState, undefined, AnyAction>,
  onlyOnce = false
) {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    dispatch(verifyAuth(user));
    if (onlyOnce) unsubscribe();
  });

  return unsubscribe;
}

// Store slice
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.error = null;
      state.isAuthenticating = true;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isAuthenticating = false;
    });

    // Sign Out
    builder.addCase(signOut.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isAuthenticating = false;
    });

    // Verify Auth
    builder.addCase(verifyAuth.fulfilled, (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user as UserState | null;
      state.isAuthenticating = false;
      state.error = null;
    });

    builder.addCase(verifyAuth.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.isAuthenticating = false;
    });
  },
});

// export const {} = slice.actions;
export const reducer = slice.reducer;
