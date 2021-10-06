import {Observable, Subject} from "rxjs";


export class UserActionService {

  private static readonly selectUsernameChatEmitter = new Subject<string>();

  private static readonly selectUsernameChatStream = UserActionService.selectUsernameChatEmitter.asObservable();

  public static getSelectUsernameChatStream(): Observable<string> {
    return UserActionService.selectUsernameChatStream;
  }

  public static selectUsernameChat(username: string) {
    this.selectUsernameChatEmitter.next(username);
  }
}