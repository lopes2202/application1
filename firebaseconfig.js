import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCCAh1OC6Dk7bRjeBpeg_zqq8r2hzGeD8Y",
  authDomain: "application-1-bddac.firebaseapp.com",
  projectId: "application-1-bddac",
  storageBucket: "application-1-bddac.appspot.com",
  messagingSenderId: "510266072516",
  appId: "1:510266072516:web:XXXXXXXXXXXX"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
