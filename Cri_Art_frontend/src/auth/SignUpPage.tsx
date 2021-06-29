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
            <input className={'signup-text-input'} type="text" ref={usernameRef} placeholder="Username"/>
            <input className={'signup-text-input'} type="text" ref={emailRef} placeholder="Email"/>
            <input className={'signup-text-input'} type="password" ref={passwordRef} placeholder="Password"/>
            <div>
                <label htmlFor="">
                    <input type="radio" value="Artist" name="type" onClick={artistOnclick} ref={optionArtistRef}/>Artist
                </label>
                <label htmlFor="" className={'client-label'}>
                    <input type="radio" value="Client" name="type" onClick={clientOnclick} ref={optionClientRef}/>Client
                </label>                
            </div>
            <button className={'signup-button'} type="button" onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

export default SignUpPage