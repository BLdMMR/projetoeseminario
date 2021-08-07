import './SignupConfirmation.css'
import {useHistory, useLocation} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {AuthService} from "../../api/AuthService";


export default function SignupConfirmation(props: any) {
  const [message, setMessage] = useState('')

  const successMessage = 'Account registered successfully!'
  const errorMessage = 'Failed to register your account!'

  const search = useLocation().search
  const history = useHistory()
  const signupToken = new URLSearchParams(search).get('token') || ''

  useEffect(() => {
    if (!(message!!)) {
    AuthService.confirmSignup(signupToken)
      .then(() => {
        setMessage(successMessage)
      })
      .catch(error => {
        console.log(error)
        setMessage(errorMessage)
      })
    }
    else {
      setTimeout(() => {
        history.push("/login")
      }, 5000)
      console.log("Redirecting...")
    }
  }, [message, setMessage])  

  const loadingMessage = 'Loading...'

  return (
    <div className={'confirmation-message'}>
      <h1>{message ?? {loadingMessage}}</h1>
      <h2>{message == successMessage?"Redirecting to login page...":""}</h2>
    </div>
  )
}
