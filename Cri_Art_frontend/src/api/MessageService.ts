import {Dispatch, SetStateAction} from "react";
import {AuthService} from "./AuthService";
import Chat from "../chat/Chat";
import {Observable, Subject} from "rxjs";


export class MessageService {

  //private static readonly WEBSOCKET_ADDRESS = "wss://cri-art.herokuapp.com/api/echo"

  private static readonly WEBSOCKET_ADDRESS = "ws://localhost:8080/api/message"

  //private static readonly WEBSOCKET_ADDRESS = "ws://localhost:3000/api/echo"

  private static websocket: WebSocket
  private static isInitialized: boolean

  private static readonly messageEmitter: Subject<string> = new Subject()
  private static readonly messageStream: Observable<string> = MessageService.messageEmitter.asObservable()

  public static initialize() {

    if ((this.websocket == null || this.websocket.readyState === WebSocket.CLOSED) && AuthService.getToken()) {
      this.websocket = new WebSocket(this.WEBSOCKET_ADDRESS + "?token=" + AuthService.getToken())
      console.log("Opened websocket with token: " + AuthService.getToken())
      this.websocket.onopen = () => {
        console.log("Websocket has been opened")
        this.isInitialized = true
      }

      this.websocket.onmessage = (message => {
        console.log("Websocket message received: " + JSON.stringify(message.data))
        this.messageEmitter.next(message.data)
      })

      this.websocket.onerror = (error) => console.error("An error happened: " + JSON.stringify(error))

      this.websocket.onclose = () => {
        console.log("Websocket has been closed")
        if(AuthService.getToken()) {
          this.isInitialized = false
          this.initialize()
        }
      }
    }
  }

  public static finalize() {
    this.websocket?.close()
  }

  public static sendMessage(message: string) {
    if (!message) {
      console.log("Empty message!")
      return
    } else if (this.isInitialized) {
      console.log("Sending message: " + message)
      this.websocket.send(message)
    } else {
      console.log("Websocket not initialized!")
    }
  }

  public static getMessageStream(): Observable<string> {
    return MessageService.messageStream
  }

}