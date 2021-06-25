import { useRef } from "react"
import Credentials from './UserCredentials'

import { Redirect, useHistory } from 'react-router-dom'


export interface AuthPageProps {
      session?: Credentials
}

function AuthPage(props: AuthPageProps) {
      const history = useHistory()

      const usernameRef = useRef<HTMLInputElement>(null)
      const passwordRef = useRef<HTMLInputElement>(null)
/*       const api = new Api()
 */
      
      if (props.session == null) return (
            <div>
            <input type="text" ref={usernameRef} placeholder='Username'/>
            <input type="password" ref={passwordRef} placeholder='Password'/>
            <button type="button" onClick={handleSubmit}>Login</button>
            <p style={{color: '#ff3d3d'}}>Text</p>
            </div>
      )

      async function handleSubmit() {
            const username = usernameRef.current?.value
            const password = passwordRef.current?.value

            console.log(`Email: ${username}`)
            console.log(`Password: ${password}`)

            props.session?.login(username!!, password!!)
                  .then(async (creds) => {
                        history.push(`home?token=${creds.token!!.token}`)
                  })


            /* const headers = new Headers()
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
            console.log(await token)*/
            
      }


      return props.session?.hasToken() ? <Redirect to='/'/> : (
            <div>
                 <input type="text" ref={usernameRef} placeholder='Username'/>
                 <input type="password" ref={passwordRef} placeholder='Password'/>
                 <button type="button" onClick={handleSubmit}>Login</button>
            </div>
      )

      
}

export default AuthPage