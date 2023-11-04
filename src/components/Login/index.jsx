import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import Input from "../Input";
import FormAction from '../FormAction';
import FormExtra from '../FormExtra';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast';


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
      const response = await fetch("https://kanban-server-sont.onrender.com/users/login", options);
      
      if(response.status == 200) {
          toast.success("Successfully logged in!"); 
          navigate("/user")
      } else {
          toast.error("Incorrect credentials");
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
        <form onSubmit={handleSubmit} className="w-1/3 space-y-8">
        <div className="">
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