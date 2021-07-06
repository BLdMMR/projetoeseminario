import { useRef } from "react"
import UserCredentials from './UserCredentials'
import './AuthPage.css'


import { Redirect, useHistory } from 'react-router-dom'


export interface AuthPageProps {
      session?: UserCredentials,
}

function AuthPage(props: AuthPageProps) {
      const history = useHistory()

      const usernameRef = useRef<HTMLInputElement>(null)
      const passwordRef = useRef<HTMLInputElement>(null)
/*       const api = new Api()
 */
      

async function handleSubmit() {
      const username = usernameRef.current?.value
      const password = passwordRef.current?.value
      
      console.log(`Email: ${username}`)
      console.log(`Password: ${password}`)
      console.log('Slam Banana')
      props.session?.login(username!!, password!!, true)
      .then(async (creds) => {
            history.push(`home?token=${creds.token!!.token}`)
                  }
      )
      .catch((err) => {
            console.log(err)
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
            
      return props.session?.token
        ? <Redirect to='/'/>
        :   <div className={"login-page"}>
                  <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" ref={usernameRef} placeholder="name@example.com"/>
                  </div>
                  <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" ref={passwordRef} placeholder="*************"/>
                  </div>
                  <div className="login-button">
                        <button type="button" className="btn btn-primary" id="login-btn-auth-page" onClick={handleSubmit}>Login</button>
                  </div>
                
            </div>

      
}

export default AuthPage