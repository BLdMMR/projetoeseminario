import { Session } from 'inspector'
import { useRef } from 'react'
import Credentials from './UserCredentials'
import { Redirect, useHistory } from 'react-router-dom'
import './SignUpPage.css'


export interface SignUpProps {
    session?: Credentials
}

function SignUpPage(props: SignUpProps) {
    const history = useHistory()

    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    let accountType = ""
    const optionArtistRef = useRef<HTMLInputElement>(null)
    const optionClientRef = useRef<HTMLInputElement>(null)

    async function handleSignUp() {
        props.session?.signUp(usernameRef.current!!.value, passwordRef.current!!.value, emailRef.current!!.value)
            .then((creds) => {
                if (accountType == "Client")
                history.push(`home?token=${creds.token!!.token}`)
                if (accountType == "Artist")
                history.push(`createartist?token=${creds.token!!.token}`)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    
    function clientOnclick() {
        accountType = "Client"
    }

    function artistOnclick() {
        accountType = "Artist"
    }

    return (
        <div className={'signup-form'}>
						<label className="form-label">Username</label>
					  <input type="text" className="form-control" id="email-address-login" ref={usernameRef} placeholder="Ex.: Example123"/>
						<label className="form-label">Email address</label>
						<input type="email" className="form-control" id="password-login" ref={emailRef} placeholder="Ex.: name@example.com"/>
						<label className="form-label">Password</label>
						<input type="password" className="form-control" id="Password" ref={passwordRef} placeholder="***********"/>
            <div className={"radio-btns"}>
                <label htmlFor="">
                    <input type="radio" value="Artist" name="type" onClick={artistOnclick} ref={optionArtistRef}/> Artist
                </label>
                <label htmlFor="" className={'client-label'}>
                    <input type="radio" value="Client" name="type" onClick={clientOnclick} ref={optionClientRef} /> Customer
                </label>                
            </div>
						<button type="button" id='signup-button' className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

export default SignUpPage