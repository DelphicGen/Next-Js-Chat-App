import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import Login from './login';
import Loading from '../components/loading';


export default function App({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading] = useAuthState(auth);

  useEffect(() => {
    async function addUserToUsersCollection() {
      const { email, photoURL, uid = '' } = loggedInUser || {};
      await setDoc(doc(db, 'users', uid), {
        email,
        photoURL,
        lastSeen: serverTimestamp()
      });
    }
    if (loggedInUser?.uid) {
      addUserToUsersCollection();
    }
  }, [loggedInUser]);

  if (loading) {
    return <Loading />
  }

  if (!loggedInUser) {
    return <Login />;
  }

  return <Component {...pageProps} />
}
