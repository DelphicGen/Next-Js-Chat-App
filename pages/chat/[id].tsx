import Head from "next/head";
import Sidebar from "../../components/sidebar";
import { DocumentData, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getChatBuddyEmail } from "../../utils/getChatBuddyEmail";
import ChatScreen from "../../components/chatScreen";

const Chat = ({ messages, users }: { 
  messages: DocumentData[];
  users: string[];
}) => {

  const [user, _] = useAuthState(auth);
  const {email} = user || {};

  return (
    <>
      <Head>
        <title>Chat with {getChatBuddyEmail(users, email || '')}</title>
      </Head>
      <div className='overflow-x-scroll min-w-screen h-screen flex'>
        <Sidebar />
        <ChatScreen messages={messages} users={users}  />
      </div>
    </>
  );
}

export default Chat;

export const getServerSideProps = async (context: { query: { id: string; }; }) => {
  const chatsRef = doc(db, 'chats', context.query.id);
  const chatsSnapshot = await getDoc(chatsRef);
  const users = chatsSnapshot?.data()?.users;

  const messagesRef = collection(db, 'chats', context?.query?.id, 'messages');
  const messagesQuery = query(messagesRef);
  const messagesSnapshot = await getDocs(messagesQuery);
  const messages: DocumentData[] = [];
  messagesSnapshot?.forEach(message => {
    const tempMessage = message.data();
    tempMessage.timestamp = JSON.stringify(tempMessage.timestamp);
    messages.push(tempMessage);
  })
  return {
    props: {
      users,
      messages
    },
  } 
}