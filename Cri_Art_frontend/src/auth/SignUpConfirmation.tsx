
import './SignUpConfirmation.css'
import { useLocation } from 'react-router-dom'
import React from 'react'
//import { URLSearchParams } from 'url';
import { Api } from '../api/Api'


function SignUpConfirmation() {

  const successMessage = "Account registered successfully!";
  const errorMessage = "Failed to register your account!";

  const search = useLocation().search
  const token = new URLSearchParams(search).get('token')

  const api = new Api()

  let message: String = successMessage;

  api.fetchFromAPI('POST', '/auth/confirm-signup?token=' + token, new Headers(), {})

  return (
    <div className={'confirmation-message'}>
      { message }
    </div>
  )
};

export default SignUpConfirmation