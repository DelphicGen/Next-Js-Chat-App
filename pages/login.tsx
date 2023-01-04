import Head from "next/head";
import styles from './login.module.css';
import BaseButton from "../components/baseButton";
import { auth, provider } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('hahaha ', result)
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
          <BaseButton text='Sign in with Google' handleClick={signIn} />
        </div>
      </div>
    </>
  )
}

export default Login;