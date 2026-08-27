import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { 
  getFirestore,
  initializeFirestore, 
  enableMultiTabIndexedDbPersistence,
  enableIndexedDbPersistence,
  doc, 
  getDoc, 
  setDoc,
  getDocFromServer
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with experimentalAutoDetectLongPolling for robust sandbox connectivity
let firestoreDb;
try {
  firestoreDb = firebaseConfig.firestoreDatabaseId
    ? initializeFirestore(app, { experimentalAutoDetectLongPolling: true }, firebaseConfig.firestoreDatabaseId)
    : initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch (e) {
  firestoreDb = firebaseConfig.firestoreDatabaseId
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);
}

// Enable offline caching via IndexedDB persistence
if (typeof window !== "undefined") {
  enableMultiTabIndexedDbPersistence(firestoreDb).catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled in one tab at a time or single-tab fallback
      enableIndexedDbPersistence(firestoreDb).catch((e) => console.warn("Single tab persistence warning:", e.message));
    } else if (err.code === "unimplemented") {
      console.warn("The current browser does not support offline persistence.");
    }
  });
}

export const db = firestoreDb;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

// Validate connection on boot as per Firebase integration guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && (error.message.includes('offline') || error.message.includes('unavailable'))) {
      console.warn("Firestore connection check: client operating in offline/resilient mode.");
    }
  }
}
testConnection();

export interface UserProgressData {
  bookmarks: string[];
  masteredWords: string[];
  unknownWords?: string[];
  totalXP: number;
  streakDays: number;
  longestStreakDays?: number;
  lastFlashcardIndex?: number;
  lastFlashcardWord?: string;
  updatedAt: string;
}

export interface UserProfileData {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  country?: string;
  createdAt: string;
}

// User registration
export async function registerWithEmail(
  email: string, 
  pass: string, 
  name: string,
  phoneNumber?: string,
  country?: string
) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  if (name && userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  
  // Create user profile in Firestore
  const userId = userCredential.user.uid;
  const path = `users/${userId}`;
  try {
    await setDoc(doc(db, "users", userId), {
      uid: userId,
      email: userCredential.user.email,
      displayName: name || userCredential.user.email?.split("@")[0] || "Learner",
      phoneNumber: phoneNumber || "",
      country: country || "",
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }

  return userCredential.user;
}

// User login
export async function loginWithEmail(email: string, pass: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
}

// Google Sign In
export async function loginWithGoogle() {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;
  
  // Ensure profile doc exists
  const userRef = doc(db, "users", user.uid);
  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split("@")[0] || "Learner",
        createdAt: new Date().toISOString()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
  }
  
  return user;
}

// Logout
export async function logoutUser() {
  await firebaseSignOut(auth);
}

// Password reset
export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

// Fetch User Profile from Firestore
export async function getUserProfile(userId: string): Promise<UserProfileData | null> {
  if (!userId) return null;
  const path = `users/${userId}`;
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfileData;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
  return null;
}

// Save User Progress to Firestore
export async function saveUserProgress(userId: string, data: UserProgressData) {
  if (!userId) return;
  const path = `userProgress/${userId}`;
  try {
    const progressRef = doc(db, "userProgress", userId);
    await setDoc(progressRef, {
      userId,
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Fetch User Progress from Firestore
export async function getUserProgress(userId: string): Promise<UserProgressData | null> {
  if (!userId) return null;
  const path = `userProgress/${userId}`;
  try {
    const progressRef = doc(db, "userProgress", userId);
    const snap = await getDoc(progressRef);
    if (snap.exists()) {
      return snap.data() as UserProgressData;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
  return null;
}

export { onAuthStateChanged };
export type { User };
