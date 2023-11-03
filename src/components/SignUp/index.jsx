import { useState } from 'react';
import { signupFields } from "../../constants/formFields"
import FormAction from "../FormAction";
import Input from "../Input";
import { useNavigate } from "react-router-dom"

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
    const navigate = useNavigate()


    const [signupState,setSignupState]=useState(fieldsState);

    const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

    const createAccount = async ()=>{
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(signupState)
    }

    try {
        const response = await fetch("https://kanban-server-sont.onrender.com/users/register", options);


        if(response.status == 201) {
            alert("Correct!"); 
            navigate("/")
        } else {
            alert("Incorrect credentials");
        }
    } catch (error) {
        console.log(error.message)
    }
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    createAccount()
    }

    console.log(signupState)


    return(
        <div className='flex justify-center items-center w-[33%]'>
            <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col">
            {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={signupState[field.id]}
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
            <FormAction text="Register" />
            </div>

            

        </form>

        </div>
    )
}
