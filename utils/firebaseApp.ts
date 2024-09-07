import { FirebaseApp, getApp, initializeApp } from "firebase/app"
import { getAnalytics, isSupported } from "firebase/analytics"
import { getStorage } from "firebase/storage"

export let app: FirebaseApp

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

try {
  app = getApp("app")
} catch (e) {
  app = initializeApp(firebaseConfig, "app")
}

let analytics
if (typeof window !== "undefined") {
  // 클라이언트 측에서만 실행
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  })
}

export const storage = getStorage(app)
