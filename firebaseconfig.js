import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'localhost/8000.firebaseapp.com',
  projectId: 'application-1-bddac',
  storageBucket: 'SEU_BUCKET',
  messagingSenderId: 'SEU_SENDER_ID',
  appId: 'SEU_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
