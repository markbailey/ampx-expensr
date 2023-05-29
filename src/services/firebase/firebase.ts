// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4Zn-Lkn7QOzgGw3eVkeBh6HkIbjDHYlA',
  authDomain: 'expensr-d2dcb.firebaseapp.com',
  databaseURL: 'https://expensr-d2dcb-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'expensr-d2dcb',
  storageBucket: 'expensr-d2dcb.appspot.com',
  messagingSenderId: '167337572896',
  appId: '1:167337572896:web:3e639cf343b8195929da45',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Ldsyz0mAAAAAJgRu0l_wi7YWi-lzL6aU582_Nmj'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});
