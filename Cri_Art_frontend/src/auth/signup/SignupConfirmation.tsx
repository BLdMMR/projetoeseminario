import './SignupConfirmation.css'
import {useLocation} from 'react-router-dom'
import React, {useState} from 'react'
import {AuthService} from "../../api/AuthService";


export default function SignupConfirmation(props: any) {
  const [message, setMessage] = useState('')

  const successMessage = 'Account registered successfully!'
  const errorMessage = 'Failed to register your account!'

  const search = useLocation().search
  const signupToken = new URLSearchParams(search).get('token') || ''

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

  const loadingMessage = 'Loading...'

  return (
    <div className={'confirmation-message'}>
      {message ?? {loadingMessage}}
    </div>
  )
}
