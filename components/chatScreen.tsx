import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { getChatBuddyEmail } from "../utils/getChatBuddyEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const ChatScreen = ({ messages, users }: {
  messages: DocumentData[];
  users: string[];
}) => {
  const [user, _] = useAuthState(auth);
  const {email} = user || {};
  const chatBuddyEmail = getChatBuddyEmail(users, email || '');
  const usersRef = collection(db, 'users');

  useEffect(() => {
    async function getChatBuddy() {
      const usersQuery = query(usersRef, where('email', '==', chatBuddyEmail));
      const userSnapshot = await getDocs(usersQuery);
      console.log(userSnapshot)
      userSnapshot?.forEach(chatBuddy => {
        console.log(chatBuddy)
      });
    }
    getChatBuddy();
  }, []);


  return (
    <div className='h-screen flex-1'>
      {/* <div className='p-4 border-b-1 border-secondary bg-primary flex items-center'>
        {
          photoURL ? (
            <Avatar src={photoURL} className='cursor-pointer' onClick={() => auth.signOut()} />
          ) : (
            <Avatar className='cursor-pointer' onClick={() => auth.signOut()}>{email?.[0] || ''}</Avatar>
          )
        }
        <p className='ml-2 font-bold'>{email}</p>
      </div> */}
    </div>
  );
}

export default ChatScreen;