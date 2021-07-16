import {useRef, useState} from "react"
import UserCredentials from '../UserCredentials'
import './Login.css'


import {Redirect, useHistory} from 'react-router-dom'


export interface AuthPageProps {
  session?: UserCredentials,
}

function Login(props: AuthPageProps) {
  const history = useHistory()

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [loginError, setLoginError] = useState('')

  async function handleSubmit() {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    console.log(`Email: ${username}`)
    console.log(`Password: ${password}`)

    if (!username || !password) {
      setLoginError('Missing credentials!')
      return
    }

    props.session?.login(username!!, password!!, true)
      .then(async (creds) => {
        if (creds.hasToken())
          history.push(`home?token=${creds.token!!.token}`)
        else setLoginError('Login failed!')
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
  }

  return props.session?.token
    ? <Redirect to='/'/>
    : <div className={"login-page"}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" ref={usernameRef}
                 placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleFormControlInput1" ref={passwordRef}
                 placeholder="*************"/>
        </div>
        <div className={"login-form-bottom"}>
          <div className={"login-message"}>
            { loginError && <span>{loginError}</span>}
          </div>
          <button type="button" className="btn btn-primary" id="login-button" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
}

export default Login