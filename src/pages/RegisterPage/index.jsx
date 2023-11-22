import React from 'react'
import { SignUp, Header } from "../../components"

function RegisterPage() {
  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
      <Header
        heading="Register to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
       />
       <SignUp />
  </div>
  )
}

export default RegisterPage