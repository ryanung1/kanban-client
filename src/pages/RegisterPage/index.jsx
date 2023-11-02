import React from 'react'
import { SignUp, Header } from "../../components"

function RegisterPage() {
  return (
    <>
    <Header
        heading="Register to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
       />
       <SignUp />
  </>
  )
}

export default RegisterPage