import {useState} from 'react'
import './Signup.css'
import {AuthService} from "../../api/AuthService";

function Signup(props: any) {
  const [signedUp, setSignedUp] = useState<boolean>(false)
  const [signupError, setSignupError] = useState('')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  async function handleSignUp() {
    if (!username || !email || !password || !repeatPassword) {
      setSignupError('Missing credentials!')
    } else if (password !== repeatPassword) {
      setSignupError('Passwords\n dont match!')
    } else {
      AuthService.signup(username, email, password)
        .then(() => {
          setSignedUp(true)
        }).catch(error => {
        // Check response code here
        setSignupError('Signup failed!')
      })
    }

  }

  return signedUp
    ? <div>
        <p>Please Check your email to confirm Sign Up</p>
      </div>
    : <div className={'signup-form'}>
      <div className={"mb-3"}>
        <label className="form-label">Username</label>
        <input type="text" className="form-control" id="email-address-login"
               onChange={event => setUsername(event.target.value)}
               placeholder="Ex.: Example123"/>
      </div>
      <div className={"mb-3"}>
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" id="password-login"
               onChange={event => setEmail(event.target.value)}
               placeholder="Ex.: name@example.com"/>
      </div>
      <div className={"mb-3"}>
        <label className="form-label">Password</label>
        <input type="password" className="form-control" id="Password"
               onChange={event => setPassword(event.target.value)}
               placeholder="***********"/>
      </div>
      <div className={"mb-3"}>
        <label className="form-label">Repeat Password</label>
        <input type="password" className="form-control" id="RepeatPassword"
               onChange={event => setRepeatPassword(event.target.value)}
               placeholder="***********"/>
      </div>
      <div className={"signup-form-bottom"}>
        <div className={"signup-error-message"}>
          {signupError && <span>{signupError}</span>}
        </div>
        <div className={"signup-button-wrapper"}>
          <button type="button" className="btn btn-primary" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
}

export default Signup
