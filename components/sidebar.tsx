import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import BaseInput from "./baseInput";
import { Search as SearchIcon } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Chat from "./chat";
import { getChatBuddyEmail } from "../utils/getChatBuddyEmail";
import * as EmailValidator from 'email-validator';
import BaseButton from "./baseButton";

export interface IChatBuddy {
  email: string;
  chatId: string;
}

const Sidebar = () => {
  const [chatBuddies, setChatBuddies] = useState<IChatBuddy[]>([]);
  const [filteredChatBuddies, setFilteredChatBuddies] = useState<IChatBuddy[]>([]);
  const [chatBuddiesQuery, setChatBuddiesQuery] = useState('');
  const [user, _] = useAuthState(auth);
  const { email, photoURL } = user || {};
  const chatsRef = collection(db, 'chats');


  const getUserChatBuddies = async () => {
    const userChatBuddiesQuery = query(chatsRef, where('users', 'array-contains', email));
    const userChatBuddiesQuerySnapshot = await getDocs(userChatBuddiesQuery);
    const tempChatBuddies: IChatBuddy[] = [];
    userChatBuddiesQuerySnapshot.forEach(chatBuddy => {
      tempChatBuddies.push({
        email: getChatBuddyEmail(chatBuddy.data().users, email || ''),
        chatId: chatBuddy.id
      });
    });
    setChatBuddies(tempChatBuddies);
    setFilteredChatBuddies(tempChatBuddies);
  }

  useEffect(() => {
    getUserChatBuddies();
  }, []);

  useEffect(() => {
    const tempChatBuddies: IChatBuddy[] = [];
    const lowerCasedChatBuddiesQuery = chatBuddiesQuery.toLowerCase();
    chatBuddies.forEach(chatBuddy => {
      const lowerCasedChatBuddyEmail = chatBuddy.email.toLowerCase();
      if (lowerCasedChatBuddyEmail.includes(lowerCasedChatBuddiesQuery)) {
        tempChatBuddies.push(chatBuddy);
      }
    });
    setFilteredChatBuddies(tempChatBuddies);
  }, [chatBuddiesQuery]);

  const createNewChat = async () => {
    const input = prompt('Please enter an email address for the user you wish to chat with');
    if (!input) {
      return;
    }
    if (EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== email) {
      await addDoc(collection(db, 'chats'), {
        users: [email, input]
      });
      getUserChatBuddies();
    }
  };

  const chatAlreadyExist = (newChatBuddyEmail: string) => {
    chatBuddies.forEach(chatBuddy => {
      if (chatBuddy.email === newChatBuddyEmail) {
        return true;
      }
    });
    return false;
  }

  return (
      <div className='w-80 h-full border-r-1 max-h-screen overflow-y-scroll'>
        <div className='p-4 border-b-1 border-secondary bg-primary flex items-center'>
          {
            photoURL ? (
              <Avatar src={photoURL} className='cursor-pointer' onClick={() => auth.signOut()} />
            ) : (
              <Avatar className='cursor-pointer' onClick={() => auth.signOut()}>{email?.[0] || ''}</Avatar>
            )
          }
          <p className='ml-2 font-bold break-all'>{email}</p>
        </div>
        <div className='flex items-center border-b-1 border-secondary px-2'>
          <SearchIcon />
          <BaseInput
            customClassName='p-4 flex-1'
            name='chatBuddiesQuery'
            value={chatBuddiesQuery}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatBuddiesQuery(e.target.value)}
          />
        </div>
        <div className='border-b-1 border-secondary'>
          <BaseButton
            customClassName='w-full'
            handleClick={createNewChat}
          >
            Start a new chat
          </BaseButton>
        </div>
        <div>
          {
            filteredChatBuddies?.map(chatBuddy => <Chat key={chatBuddy.chatId} chatBuddy={chatBuddy} />)
          }
        </div>
      </div>
  )
}

export default Sidebar;