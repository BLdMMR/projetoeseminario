import './Chat.css'
import {AuthService} from "../api/AuthService";
import {useEffect, useState} from "react";
import {MessageService, TextMessage} from "../api/MessageService";
import ChatWrapperHeader from "./ChatWrapperHeader";
import ChatMessaging from "./ChatMessaging";
import ChatContacts from "./ChatContacts";
import {UserActionService} from "../user/UserActionService";


export default function Chat(props: any) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<TextMessage>>([])
  const [selectedUsername, setSelectedUsername] = useState<string>('')
  /* The purpose of the following state variable
   is to trigger re-rendering at will */
  const [randomNumber, setRandomNumber] = useState<number>(0)
  const [usersNewMessages, setUsersNewMessages] = useState<Array<string>>([])


  useEffect(() => {
    const messageSub = MessageService.getMessageStream().subscribe(message => {

      const existingMsgIdx = messages.findIndex(msg => msg.id === message.id)
      if (existingMsgIdx === -1) {
        messages.push(message)
      } else {
        messages[existingMsgIdx] = message
      }
      const usersNewMsg = messages.filter(msg => !msg.hasBeenRead).map(msg => msg.senderUsername)
      setUsersNewMessages(usersNewMsg)

      setRandomNumber(Math.random())
    })
    const userSub = UserActionService.getSelectUsernameChatStream().subscribe(username => {
      setSelectedUsername(username);
      setOpen(true);
    })

    return () => {
      messageSub.unsubscribe()
      userSub.unsubscribe()
    }
  }, [])

  if (!AuthService.getToken()) {
    return null
  } else {
    MessageService.initialize()
  }

  const handleSelectUsername = (newUsername: string) => setSelectedUsername(newUsername)

  return <div className={"chat-wrapper " + (open ? "chat-wrapper-open" : "chat-wrapper-closed")}>
    <ChatWrapperHeader open={open} onOpen={setOpen} hasNewMessages={usersNewMessages.length > 0}>
    </ChatWrapperHeader>
    {selectedUsername !== ''
      ? <ChatMessaging selectedUsername={selectedUsername}
                       selectUsername={handleSelectUsername}
                       messages={messages}></ChatMessaging>
      : <ChatContacts selectedUsername={selectedUsername}
                      selectUsername={handleSelectUsername}
                      messages={messages}
                      usersNewMessages={usersNewMessages}></ChatContacts>
    }
  </div>

}