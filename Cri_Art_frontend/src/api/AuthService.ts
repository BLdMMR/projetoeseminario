import {Api, HTTP_METHOD} from '../api/Api'


export class AuthService {
  private static token?: string
  private static type?: string

  public static getToken(): string {
    return AuthService.token!!
  }

  public static getType(): string {
      return AuthService.type!!
  }

  public static async hasProfile(): Promise<boolean> {
      return await Api.fetchFromAPI(
          HTTP_METHOD.GET,
          `/auth/profile-info?token=${AuthService.getToken()}`,
          new Headers()
      ).then(result => {
          console.log(result)
          return result.hasProfile
      })
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
    ).then(loginResponse => {
        AuthService.token = loginResponse?.token
        AuthService.type = loginResponse?.type
        //return loginResponse.type
    }).catch(err => {
        console.log("Error Occured")
        console.log(err)
    })

  }

  public static logout() {

  }

  public static signup(username: string, email: string, password: string, type: string): Promise<any> {

    return Api.fetchFromAPI(
      HTTP_METHOD.POST,
      '/auth/signup',
      new Headers(),
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
}