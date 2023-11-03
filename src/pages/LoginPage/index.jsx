import React from 'react'
import { Login, Header } from "../../components"

function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
    <Header
       heading="Login to your account"
       paragraph="Don't have an account yet? "
       linkName="Sign up"
       linkUrl="/signup"
       />
       <Login />
  </div>
  )
}

export default LoginPage