import Head from "next/head";
import styles from './login.module.css';
import BaseButton from "../components/baseButton";
import { auth, provider } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
      }).catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={`h-screen ${styles.login}`}>
        <div className='h-full bg-gray-800/50 flex justify-center items-center'>
          <BaseButton
            handleClick={signIn}
          >
            Sign in with Google
          </BaseButton>
        </div>
      </div>
    </>
  )
}

export default Login;