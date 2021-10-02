import './Chat.css'
import {AuthService} from "../api/AuthService";
import {useEffect, useState} from "react";
import {MessageService, TextMessage} from "../api/MessageService";
import ChatWrapperHeader from "./ChatWrapperHeader";
import ChatMessaging from "./ChatMessaging";
import ChatContacts from "./ChatContacts";


export default function Chat(props: any) {
  const [open, setOpen] = useState(false)
  const [messages] = useState<Array<TextMessage>>([])
  const [selectedUser, setSelectedUser] = useState<string>()
  //the following variable is just to trigger re-rendering at will
  const [randomNumber, setRandomNumber] = useState<number>()

  useEffect(() => {
    const sub = MessageService.getMessageStream().subscribe(message => {
      console.log("New message: ", message)
      if (!messages.some(msg => msg.messageId === message.messageId)) {
        messages.push(message)
        setRandomNumber(Math.random())
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
    <ChatWrapperHeader open={open} onOpen={setOpen}></ChatWrapperHeader>
    {selectedUser
      ? <ChatMessaging onSelectedUser={setSelectedUser} messages={messages}></ChatMessaging>
      : <ChatContacts onSelectUser={setSelectedUser} messages={messages}></ChatContacts>}
  </div>
}