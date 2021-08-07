import {Api, HTTP_METHOD} from '../api/Api'


export class AuthService {
  private static token?: string

  public static getToken(): string {
    return AuthService.token!!
  }

  public static login(email: string, password: string): Promise<any> {

    return Api.fetchFromAPI(
      HTTP_METHOD.POST,
      '/auth/login',
      new Headers(),
      {
        email: email,
        password: btoa(password)
      }
    ).then(token => AuthService.token = token?.token)

  }

  public static logout() {

  }

  public static signup(username: string, email: string, password: string): Promise<any> {

    return Api.fetchFromAPI(
      HTTP_METHOD.POST,
      '/auth/signup',
      new Headers(),
      {
        username: username,
        email: email,
        password: btoa(password)
      }
    )
  }

  public static confirmSignup(token: string): Promise<any> {
    return Api.fetchFromAPI(HTTP_METHOD.POST, `/auth/confirm-signup?token=${token}`)
  }
}