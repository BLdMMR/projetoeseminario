import {useState} from "react"
import './Login.css'


import {Redirect, useHistory} from 'react-router-dom'
import {AuthService} from "../../api/AuthService";


function Login(props: any) {
  const history = useHistory()
  const [loginError, setLoginError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    setLoginError('')
    console.log(`Email: ${email}\nPassword: ${password}`)

    if (!email || !password) {
      setLoginError('Missing credentials!')
      return
    }

    AuthService.login(email!!, password!!)
      .then(() => {
        if (AuthService.getToken())
          history.push(`home?token=${AuthService.getToken()}`)
        else setLoginError('Login failed!')
      })
      .catch((err) => {
        console.log('Error: ' + err)
        setLoginError('Login failed!')
      })
  }

  return AuthService.getToken()
    ? <Redirect to='/'/>
    : <div className={"login-form"}>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control"
               onChange={event => setEmail(event.target.value)}
               placeholder="name@example.com"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control"
               onChange={event => setPassword(event.target.value)}
               placeholder="*************"/>
      </div>
      <div className={"login-form-bottom"}>
        <div className={"login-error-message"}>
          {loginError && <span>{loginError}</span>}
        </div>
        <div className={"login-button-wrapper"}>
          <button type="button" className="btn btn-primary"onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
}

export default Login