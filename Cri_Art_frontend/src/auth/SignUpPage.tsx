import { Session } from 'inspector'
import { useRef } from 'react'
import Credentials from './UserCredentials'
import { Redirect, useHistory } from 'react-router-dom'



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
        <div>
            <div>
                <input type="text" ref={usernameRef} placeholder="Username"/>
            </div>
            <div>
                <input type="text" ref={emailRef} placeholder="Email"/>
            </div>
            <div>
                <input type="password" ref={passwordRef} placeholder="Password"/>
            </div>
            <div>
                <label htmlFor="">
                    <input type="radio" value="Artist" name="Artist" onClick={artistOnclick} ref={optionArtistRef}/>Artist
                </label>
                <label htmlFor="">
                    <input type="radio" value="Client" name="Client" onClick={clientOnclick} ref={optionClientRef}/>Client
                </label>                
            </div>
            <div>
                <button type="button" onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUpPage