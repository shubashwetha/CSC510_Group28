import { initializeApp, getApps } from "firebase/app";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, GoogleAuthProvider,
  signInWithPopup, signInWithRedirect, getRedirectResult,
  updateProfile, getIdToken
} from "firebase/auth";

// Prevent double init in Vite
const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    });

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Finalize redirect 
(async () => {
  try {
    await getRedirectResult(auth);
  } catch (_) {
    // No-op if there wasn't a redirect
  }
})();

async function googleLogin() {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    // Common: popup blocked/closed -> use redirect
    const popupIssues = new Set([
      "auth/popup-blocked",
      "auth/popup-closed-by-user",
      "auth/cancelled-popup-request",
    ]);
    if (popupIssues.has(e?.code)) {
      await signInWithRedirect(auth, provider);
      return;
    }
    // Surface other errors so UI can show e.code
    throw e;
  }
}

export default {
  onAuthStateChanged: (cb) =>
    onAuthStateChanged(auth, (u) => cb(u ? { uid: u.uid, email: u.email, displayName: u.displayName } : null)),
  login: (email, password) => signInWithEmailAndPassword(auth, email, password),
  signup: async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
  },
  loginWithGoogle: () => googleLogin(),
  logout: () => signOut(auth),
  getToken: async () => (auth.currentUser ? getIdToken(auth.currentUser) : null),
};
