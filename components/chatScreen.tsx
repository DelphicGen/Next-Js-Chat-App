import { DocumentData, addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { getChatBuddyEmail } from "../utils/getChatBuddyEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import BaseInput from "./baseInput";
import { Send as SendIcon } from "@mui/icons-material";
import BaseButton from "./baseButton";
import { useRouter } from "next/router";
import Message from "./message";
import TimeAgo from "timeago-react";

const ChatScreen = ({ users }: {
  // messages: DocumentData[];
  users: string[];
}) => {
  const router = useRouter();
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const endOfMessageRef = useRef<HTMLDivElement>(null);

  const [loggedInUser, _] = useAuthState(auth);
  const {email, photoURL} = loggedInUser || {};
  const chatBuddyEmail = getChatBuddyEmail(users, email || '');
  
  const usersRef = collection(db, 'users');
  const messagesRef = collection(db, 'chats', (Array.isArray(router?.query?.id) ? router?.query?.id?.[0] : router?.query?.id) || '', 'messages');

  const [chatBuddy, setChatBuddy] = useState<DocumentData>({
    email: chatBuddyEmail,
    lastSeen: {},
    photoUrl: ''
  });

  const sendMessage = async () => {
    await addDoc(messagesRef, {
      message: messageInput,
      photoURL,
      timestamp: serverTimestamp(),
      user: email,
    });

    renderMessages();
    setMessageInput('');
    scrollToBottom();
    updateLoggedInUserLastSeen();
  }

  const updateLoggedInUserLastSeen = async () => {
    await updateDoc(doc(db, 'users', loggedInUser?.uid || ''), {
      lastSeen: serverTimestamp(),
    });
  }

  const scrollToBottom = () => {
    endOfMessageRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  useEffect(() => {
    getChatBuddy();
    renderMessages();
  }, [chatBuddyEmail]);

  useEffect(() => {
    setTimeout(() => scrollToBottom(), 0);
  }, [messages]);


  const getChatBuddy = async () => {
    const usersQuery = query(usersRef, where('email', '==', chatBuddyEmail));
    const userSnapshot = await getDocs(usersQuery);
    if (userSnapshot.empty) {
      setChatBuddy({
        email: chatBuddyEmail,
        lastSeen: {},
        photoUrl: ''
      });
    } else {
      userSnapshot?.forEach(chatBuddy => {
        setChatBuddy(chatBuddy.data());
      });
    }
  }

  const renderMessages = async () => {
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
    const messagesSnapshot = await getDocs(messagesQuery);
    const tempMessages: DocumentData[] = [];
    messagesSnapshot?.forEach(message => {
      console.log(message.data())
      tempMessages.push(message.data());
    });
    setMessages(tempMessages);
  }

  return (
    <div className='h-screen flex-1 flex flex-col min-w-96'>
      <div className='p-4 border-b-1 border-secondary bg-primary flex items-center'>
        {
          chatBuddy?.photoURL ? (
            <Avatar src={chatBuddy?.photoURL} />
          ) : (
            <Avatar>{chatBuddy?.email?.[0] || ''}</Avatar>
          )
        }
        <div className='ml-2'>
          <p className='font-bold break-all'>{chatBuddy?.email}</p>
          {
            chatBuddy?.lastSeen?.seconds && (
              <small>Last Seen: <TimeAgo datetime={new Date(chatBuddy.lastSeen?.seconds * 1000)} /></small>
            )
          }
        </div>
      </div>
      <div className='flex-1 overflow-y-scroll p-2'>
        {
          messages?.map(message => <Message message={message} />)
        }
        <div ref={endOfMessageRef}></div>
      </div>
      <div className='flex items-center border-t-1 border-secondary px-2 bg-primary'>
        <BaseInput
          customClassName='p-4 flex-1 text-secondary'
          name='messageInput'
          value={messageInput}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageInput(e.target.value)}
          handleKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }} 
        />
        <BaseButton
          customClassName='bg-transparent'
          handleClick={sendMessage}
          disabled={!messageInput}
        >
          <SendIcon className='text-secondary' />
        </BaseButton>
      </div>
    </div>
  );
}

export default ChatScreen;