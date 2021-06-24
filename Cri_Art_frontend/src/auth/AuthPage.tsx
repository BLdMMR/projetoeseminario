import { useRef } from "react"
import { Api } from '../api/Api'
/* import { Redirect } from 'react-router-dom'
 */
function AuthPage() {
      const usernameRef = useRef<HTMLInputElement>(null)
      const passwordRef = useRef<HTMLInputElement>(null)
      const api = new Api()

      async function handleSubmit() {
            const username = usernameRef.current?.value
            const password = passwordRef.current?.value

            console.log(`Username: ${username}`)
            console.log(`Password: ${password}`)

            const headers = new Headers()
            headers.append('Content-Type', 'application/json')
            //Fetch to the API With these credentials
            const token = api.fetchFromAPI(
                  'POST',
                  '/auth/login',
                  headers, 
                  {
                        email: username,
                        password: btoa(password!!)
                  }
            )
            console.log(await token)
      }

      return (
            <div>
                 <input type="text" ref={usernameRef} placeholder='Username'/>
                 <input type="password" ref={passwordRef} placeholder='Password'/>
                 <button type="button" onClick={handleSubmit}>Login</button>
            </div>
      )
      
}

export default AuthPage