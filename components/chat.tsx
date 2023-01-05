import { Avatar } from "@mui/material";
import { IChatBuddy } from "./sidebar";
import { useRouter } from "next/router";

const Chat = ({ chatBuddy: { email, chatId } }: { chatBuddy: IChatBuddy}) => {
  const router = useRouter();

  return (
    <div
      className='px-2 py-4 flex items-center cursor-pointer hover:bg-secondary border-b-1 border-secondary'
      onClick={() => router.push(`/chat/${chatId}`)}
    >
      <Avatar>{email?.[0] || ''}</Avatar>
      <p className='ml-2 font-bold break-all'>{email}</p>
    </div>
  )
}

export default Chat;