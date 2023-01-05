import { Avatar } from "@mui/material";
import { IChatBuddy } from "./sidebar";

const Chat = ({ chatBuddy: { email, chatId } }: { chatBuddy: IChatBuddy}) => {
  return (
    <div className='px-2 py-4 flex items-center cursor-pointer hover:bg-secondary border-b-1 border-secondary'>
      <Avatar>{email?.[0] || ''}</Avatar>
      <p className='ml-2 font-bold'>{email}</p>
    </div>
  )
}

export default Chat;