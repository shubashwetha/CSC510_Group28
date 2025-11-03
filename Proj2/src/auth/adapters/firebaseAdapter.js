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
      apiKey: "AIzaSyAVG3Ad6hE07tP87SYitoA4QPewGcAJyBg",
      authDomain: "neighborhoodpool-c70d1.firebaseapp.com",
      projectId: "neighborhoodpool-c70d1",
      storageBucket: "neighborhoodpool-c70d1.firebasestorage.app",
      messagingSenderId: "897778788671",
      appId: "1:897778788671:web:af16dd37efb4ea51e6cb8a",
      measurementId: "G-EQBSHV0849"
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
