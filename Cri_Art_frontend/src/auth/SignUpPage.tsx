import { Session } from 'inspector'
import { useEffect, useRef, useState } from 'react'
import Credentials from './UserCredentials'
import { Redirect, useHistory } from 'react-router-dom'
import './SignUpPage.css'


export interface SignUpProps {
    session?: Credentials
}

async function getTags(props: SignUpProps) {
    return await props.session?.api?.fetchFromAPI("GET", "/public/tags", undefined, undefined)
}

function SignUpPage(props: SignUpProps) {
    const history = useHistory()
    const [type, setType] = useState<string>("CLIENT")
    let tags = Array<string>()
    
    useEffect(()=>{
        console.log("effect")
        getTags(props)
        .then(data => {
            tags = data
        })
    }, [type, setType])

    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    let accountType = ""

    async function handleSignUp() {
        props.session?.signUp(usernameRef.current!!.value, passwordRef.current!!.value, emailRef.current!!.value, type)
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
        console.log("Type: CLIENT")
        setType("CLIENT")
    }

    function artistOnclick() {
        console.log("Type: ARTIST")
        console.log(tags)
        setType("ARTIST")
    }

    /* function renderTags(tag: string) {
        console.log(`rendering tag: ${tag}`)
        return (
            <div>
            <label htmlFor={tag}>{tag}
            <input type="checkbox" name="tags" id={tag} />
            </label>
            </div>
        )
    } */

    /* if(type === "CLIENT") { */
        return (
        <div className={'signup-form'}>
            <div className={"radio-btns"}>
                <label htmlFor="">
                    <input type="radio" value="Artist" name="type" onClick={artistOnclick}/> Artist
                </label>
                <label htmlFor="" className={'client-label'}>
                    <input type="radio" value="Client" name="type" onClick={clientOnclick} default-checked="true"/> Customer
                </label>                
            </div>
                <label className="form-label">Username</label>
                <input type="text" className="form-control" id="email-address-login" ref={usernameRef} placeholder="Ex.: Example123"/>
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="password-login" ref={emailRef} placeholder="Ex.: name@example.com"/>
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" ref={passwordRef} placeholder="***********"/>
                <button type="button" id='signup-button' className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
        </div>
        )
    /* }
     else if (type === "ARTIST") {
        return (
        
        <div className={'signup-form'}>
            <div className={"radio-btns"}>
                <label htmlFor="">
                    <input type="radio" value="Artist" name="type" onClick={artistOnclick} default-checked="true"/> Artist
                </label>
                <label htmlFor="" className={'client-label'}>
                    <input type="radio" value="Client" name="type" onClick={clientOnclick}/> Customer
                </label>                
            </div>
                <label className="form-label">Username</label>
                <input type="text" className="form-control" id="email-address-login" ref={usernameRef} placeholder="Ex.: Example123"/>
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="password-login" ref={emailRef} placeholder="Ex.: name@example.com"/>
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" ref={passwordRef} placeholder="***********"/>
                <p>Tags</p>
                <Tags {...tags}/>
                {tags.map(renderTags)}
                <button type="button" id='signup-button' className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
        </div>
        
        )
    }
    else return <div/> */
}

export default SignUpPage


/* function Tags(props :Array<string>) {
    const tagsElems = Array<JSX.Element>()
    const tags :Array<string> = props
    props.map(pushElem)

    

    function pushElem(tag: string) {
        tagsElems.push(
            <label htmlFor={tag}>{tag}
            <input type="checkbox" name="tags" id={tag} />
            </label>
        )
    }
    return (
        <div>
            {tagsElems}
        </div>
    )
} */