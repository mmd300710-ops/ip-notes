export type AuthUser = { uid: string; email?: string | null; displayName?: string | null };

// For initial bootstrap, we provide a mock sign-in so the UI works.
// Later, we will replace with Firebase Auth Google Sign-In end-to-end.
export function subscribeAuth(cb: (u: AuthUser | null) => void) {
  // Immediately emit a mock user for bootstrap UX
  const mock: AuthUser = { uid: "debug_user", email: "debug@local" };
  cb(mock);
  return () => {};
}

export async function signInWithGoogle(): Promise<AuthUser> {
  return { uid: "debug_user", email: "debug@local" };
}

export async function signOutFromApp() {}
