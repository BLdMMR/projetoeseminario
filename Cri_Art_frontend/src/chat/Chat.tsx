import './Chat.css'
import {AuthService} from "../api/AuthService";
import {useEffect, useState} from "react";
import {MessageService, TextMessage} from "../api/MessageService";
import ChatWrapperHeader from "./ChatWrapperHeader";
import ChatMessaging from "./ChatMessaging";
import ChatContacts from "./ChatContacts";


export default function Chat(props: any) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<TextMessage>>([])
  const [selectedUsername, setSelectedUsername] = useState<string>('')
  /* The purpose of the following state variable
   is to trigger re-rendering at will */
  const [randomNumber, setRandomNumber] = useState<number>(0)


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

  const handleSelectUsername = (newUsername: string) => setSelectedUsername(newUsername)

  return <div className={"chat-wrapper " + (open ? "chat-wrapper-open" : "chat-wrapper-closed")}>
    <ChatWrapperHeader open={open} onOpen={setOpen}></ChatWrapperHeader>
    {selectedUsername !== ''
      ? <ChatMessaging selectedUsername={selectedUsername}
                       selectUsername={handleSelectUsername}
                       messages={messages}></ChatMessaging>
      : <ChatContacts selectedUsername={selectedUsername}
                      selectUsername={handleSelectUsername}
                      messages={messages}></ChatContacts>}
  </div>

}