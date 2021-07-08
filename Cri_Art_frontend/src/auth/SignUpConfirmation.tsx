
import './SignUpConfirmation.css'
import { useLocation, Redirect, useHistory } from 'react-router-dom'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
//import { URLSearchParams } from 'url';
import { Api } from '../api/Api'
import { JsxElement } from 'typescript';
import UserCredentials from './UserCredentials'

export interface SignUpConfirmationProps {
  creds: UserCredentials
}

function SignUpConfirmation(props : SignUpConfirmationProps) {
  const history = useHistory()

  const descRef = useRef<HTMLTextAreaElement>(null)
  const confirmPassRef = useRef<HTMLInputElement>(null)
  
  const [token, setToken] = useState<string>("")
  const [user, setUser] = useState<User>()
  const [tags, setTags] = useState<Array<string>>()
  const [confirmed, setConfirmed] = useState<Boolean>(false)

  const tagStatus = new Map<string, boolean>()

  const successMessage = "Account registered successfully!";
  const errorMessage = "Failed to register your account!";
  
  const search = useLocation().search
  const signupToken = new URLSearchParams(search).get('token')||""
  let loginToken: string | undefined
  
  const api = new Api()
  
  let message: String = successMessage;
  
  useEffect(()=> {
    if (!confirmed) {
      api.fetchFromAPI('POST', `/auth/confirm-signup?token=${signupToken}`, new Headers(), {})
      .then((user: User) => {
        console.log("Account Confirmation in progress")
        console.log(user)
        console.log(`Sign up token: ${signupToken}`)
        setToken(signupToken)
        setUser(user) 
        setConfirmed(true)
      })
      .catch(err => {
        console.log(err)
      })
    }
    if (!tags && confirmed) {
      api.fetchFromAPI('GET', '/public/tags', new Headers(), undefined)
      .then((fetchedTags: Array<string>) => {
        setTags(fetchedTags)
      })
    }  
  }, [tags, setTags, confirmed, setConfirmed])
  
    
  function tagOnChange(tag: string) {
    tagStatus.set(tag, !(tagStatus.get(tag)))
  }
  
  function handleSubmit() {
    const username = user?.name
    const description = descRef.current?.value
    const currTags = new Array<String>()
    tagStatus.forEach((value, key) => {
      if (value) currTags.push(key)
    })
    props.creds.login(user!!.emailAddress, btoa(confirmPassRef.current!!.value), false)
        .then((lgntkn) => {
          console.log(lgntkn)
          loginToken = lgntkn.token?.token
          api.fetchFromAPI(
            "POST",
            `/artist?token=${loginToken}`, 
            new Headers(),
            {
              username: username,
              description: description,
              tags: currTags
            }

          ).catch(err => {
            console.log(err)
          })
          history.push(`/home?token=${props.creds.token}`)
        })
        .catch(err => {
          console.log(err)
        })
  }


  if(token === "" || (user?.type == "ARTIST" && !tags)) {
    console.log("Loading...")
    return (
      <div className={'confirmation-message'}>
        Loading...
      </div>
    )
  }
  else if (user?.type == "CLIENT") {
    console.log(`User Type: ${user?.type}`)
    return (
      <div className={'confirmation-message'}>
        <input type="password" name="confirm-password" id="" ref={confirmPassRef} placeholder="confirm-password"/>
        Costumer...
      </div>
    )
  }
  else if (user?.type == "ARTIST" && tags){
    console.log(`User Type: ${user?.type}`)
    return (
      <div className={'artist-signup-form'}>
        <input type="password" name="confirm-password" id="" ref={confirmPassRef} placeholder="Confirm Password"/>

        <label htmlFor="description">Description</label>
        <textarea name="description" id="description-input" ref={descRef} placeholder="Write here the description for your page. Feel free to include any references for your social networks and/or your work experience. Or do whatever you like, im a textbox, not a cop..."/>
        <div>
          {tags.map((tag) => {
            return (
              <label htmlFor="">
                    <input type="checkbox" name={tag} onClick={() => {tagOnChange(tag)}}/>{tag}
                    </label>
            )
          })}
          <div>
            <button type="button" onClick={handleSubmit}>Create Profile</button>
          </div>
        </div>
      </div>
    )
  }
  else {
    console.log(`Error`)
    return <h1>Error</h1>
  }
};

export default SignUpConfirmation

export class Token {
  public value : string;
  constructor(token : string) {
    this.value = token 
  }
}
class User{
  public name :string;
  public emailAddress : string;
  public type : string;
  public password: string;
  constructor(name: string, emailAddress: string, password: string, userType: string) {
    this.emailAddress = emailAddress;
    this.name = name;
    this.password = password;
    this.type = userType
  }
}
