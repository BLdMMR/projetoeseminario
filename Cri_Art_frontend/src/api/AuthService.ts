import {Api, HTTP_METHOD} from './Api'
import {MessageService} from "./MessageService";
import Cookies from "universal-cookie";


export class AuthService {

  private static readonly CRI_ART_USER_COOKIE_NAME = 'CRI_ART_USER_INFO';

  private static readonly cookies = new Cookies();

  private static get user(): User | undefined {
    const user = AuthService.cookies.get(AuthService.CRI_ART_USER_COOKIE_NAME);
    if (user) {
      return user;
    }
  }

  private static set user(user: User | undefined) {
    if (!user) {
      AuthService.cookies.remove(AuthService.CRI_ART_USER_COOKIE_NAME)
      AuthService.cookies.set(AuthService.CRI_ART_USER_COOKIE_NAME, null)
    } else {
      AuthService.cookies.set(AuthService.CRI_ART_USER_COOKIE_NAME, user);
    }
  }


  public static getToken(): string | undefined {
    return AuthService.user?.token
  }

  public static getUser() {
    return AuthService.user
  }

  public static getType(): string | undefined {
    return AuthService.user?.type
  }

  public static getId(): string | undefined {
    return AuthService.user?.id
  }

  public static getConfirmed(): boolean | undefined {
    return AuthService.user?.enabled
  }

  public static async hasProfile(): Promise<boolean> {
    return await Api.fetchFromAPI(
      HTTP_METHOD.GET,
      `/auth/profile-info?token=${AuthService.getToken()}`
    ).then(result => {
      console.log(result)
      return result.hasProfile
    })
  }

  public static login(email: string, password: string): Promise<any> {

    return Api.fetchFromAPI(
      HTTP_METHOD.POST,
      '/auth/login',
      {
        email: email,
        password: btoa(password)
      }
    ).then(loginResponse => {
      AuthService.user = loginResponse
      console.log('User logged in: ', AuthService.user)
      return loginResponse.type
    }).catch(err => {
      console.log("Error")
      console.error(err)
    })

  }

  public static logout() {
    return Api.fetchFromAPI(
      HTTP_METHOD.DELETE,
      `/auth/logout?token=${AuthService.getToken()}`
    ).then((res) => {
      console.log("Response from API")
      console.log(res)
      MessageService.finalize()
      AuthService.removeInfo()
      return Promise.resolve(res)
    })
  }

  public static signup(username: string, email: string, password: string, type: string): Promise<any> {

    return Api.fetchFromAPI(
      HTTP_METHOD.POST,
      '/auth/signup',
      {
        username: username,
        email: email,
        password: btoa(password),
        type: type
      }
    )
  }

  public static confirmSignup(token: string): Promise<any> {
    return Api.fetchFromAPI(HTTP_METHOD.POST, `/auth/confirm-signup?token=${token}`)
  }

  public static removeInfo() {
    AuthService.user = undefined
  }

}

export class User {

  private _id: string | undefined;
  private _name: string | undefined;
  private _emailAddress: string | undefined;
  private _type: string | undefined;
  private _hasProfile: boolean | undefined;
  private _listOfFollows: string[] | undefined;
  private _enabled: boolean | undefined;
  private _token: string | undefined;


  get token(): string {
    return this._token!!;
  }

  get id(): string {
    return this._id!!;
  }


  get name(): string {
    return this._name!!;
  }


  get emailAddress(): string {
    return this._emailAddress!!;
  }

  get type(): string {
    return this._type!!;
  }


  get hasProfile(): boolean {
    return this._hasProfile!!;
  }


  get listOfFollows(): string[] {
    return this._listOfFollows!!;
  }

  get enabled(): boolean {
    return this._enabled!!;
  }

  constructor(id: string, name: string, emailAddress: string, type: string, hasProfile: boolean, listOfFollows: string[], enabled: boolean, token: string) {
    this._id = id;
    this._name = name;
    this._emailAddress = emailAddress;
    this._type = type;
    this._hasProfile = hasProfile;
    this._listOfFollows = listOfFollows;
    this._enabled = enabled;
    this._token = token
  }
}