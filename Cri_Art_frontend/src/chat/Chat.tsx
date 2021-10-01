import './Chat.css'
import {AuthService} from "../api/AuthService";
import {useEffect, useState} from "react";
import {MessageService} from "../api/MessageService";
import ChatWrapperHeader from "./ChatWrapperHeader";
import ChatMessaging from "./ChatMessaging";


export default function Chat(props: any) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<string>>([])
  const [selectedUser, setSelectedUser] = useState<string>()

  useEffect(() => {
    const sub = MessageService.getMessageStream().subscribe(message => {
      console.log("New message: " + message)
      if (message) {
        messages.push(message)
        const newArray = messages.slice()
        setMessages(newArray)
      }
    })

    return () => sub.unsubscribe()
  }, [])

  if (!AuthService.getToken()) {
    return null
  } else {
    MessageService.initialize()
  }

  return <div className={"chat-wrapper " + (open ? "chat-wrapper-open" : "chat-wrapper-closed")}>
    <ChatWrapperHeader open={open} onChange={setOpen}></ChatWrapperHeader>
    <ChatMessaging messages={messages}></ChatMessaging>
  </div>
}