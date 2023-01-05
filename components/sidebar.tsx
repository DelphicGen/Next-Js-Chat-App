import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import BaseInput from "./baseInput";
import { Search as SearchIcon } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Chat from "./chat";

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

  useEffect(() => {
    async function getUserChatBuddies() {
      const userChatBuddiesQuery = query(chatsRef, where('users', 'array-contains', email));
      const userChatBuddiesQuerySnapshot = await getDocs(userChatBuddiesQuery);
      const tempChatBuddies: IChatBuddy[] = [];
      userChatBuddiesQuerySnapshot.forEach(chatBuddy => {
        const [firstEmail, secondEmail] = chatBuddy.data().users;
        tempChatBuddies.push({
          email: firstEmail === email ? secondEmail : firstEmail,
          chatId: chatBuddy.id
        });
      });
      setChatBuddies(tempChatBuddies);
      setFilteredChatBuddies(tempChatBuddies);
    }
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

  return (
      <div className='w-80 h-full border-r-1'>
        <div className='p-4 border-b-1 border-secondary bg-primary flex items-center'>
          {
            photoURL ? (
              <Avatar src={photoURL} className='cursor-pointer' onClick={() => auth.signOut()} />
            ) : (
              <Avatar className='cursor-pointer' onClick={() => auth.signOut()}>{email?.[0] || ''}</Avatar>
            )
          }
          <p className='ml-2 font-bold'>{email}</p>
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
        <div>
          {
            filteredChatBuddies?.map(chatBuddy => <Chat key={chatBuddy.chatId} chatBuddy={chatBuddy} />)
          }
        </div>
      </div>
  )
}

export default Sidebar;