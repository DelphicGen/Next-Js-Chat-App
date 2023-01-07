import { DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment-timezone";

const Message  = ({ message: { user, timestamp, message: messageContent } }: { message: DocumentData }) => {
  const [loggedInUser] = useAuthState(auth);
  const { email } = loggedInUser || {};

  return (
    <div className={`p-2 rounded-md max-w-96 my-2 break-all ${email === user ? 'bg-primary mr-0 ml-auto': 'bg-gray-300'}`}>
      <p>{messageContent}</p>
      <small>{timestamp && moment(new Date(timestamp.seconds * 1000)).tz('Asia/Singapore').format('LT')}</small>
    </div>
  )
};

export default Message;