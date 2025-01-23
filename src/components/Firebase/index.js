/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyATjhVzWP4FXt-e6g54BUwCeWB2XXu_PYg',
  authDomain: 'jobs-portal-158ae.firebaseapp.com',
  projectId: 'jobs-portal-158ae',
  storageBucket: 'jobs-portal-158ae.firebasestorage.app',
  messagingSenderId: '1070743274330',
  appId: '1:1070743274330:web:2bad882663209e29c6a963',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export Firebase services
export const auth = getAuth(app) // Pass the app instance here
export const db = getFirestore(app)
export default app
