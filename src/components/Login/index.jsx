import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import Input from "../Input";
import FormAction from '../FormAction';
import FormExtra from '../FormExtra';
import { useNavigate } from "react-router-dom"


const fields = loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

function Login(){
  const navigate = useNavigate()
  const [loginState,setLoginState]=useState(fieldsState);

  const handleChange=(e)=>{
      setLoginState({...loginState,[e.target.id]:e.target.value})
  }

    //Handle Login API Integration here
  const authenticateUser = async () =>{
      const options = {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(loginState)
    }

    try {
      const response = await fetch("http://localhost:3001/users/login", options);

      if(response.status == 200) {
          alert("Correct!"); 
          navigate("/user")
      } else {
          alert("Incorrect credentials");
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  const handleSubmit = (e) => {
      e.preventDefault();
      authenticateUser();

  }


    return(
        <form onSubmit={handleSubmit} className="w-4/5 space-y-6">
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction text="Login"/>
       

      </form>
    )
}

export default Login