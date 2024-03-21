import { useState } from "react";
import './Registration.css'
import { userRegister } from "../httpServices/userService";
import { useNavigate } from "react-router-dom";


export default function Registration() {
    const navigate = useNavigate();

    const [regForm, setRegForm] = useState({
        username: '',
        password: '',
        confirmpassword: '',
    });

    async function formSubmitted(event) {
        event.preventDefault();
        const data = {
            username: regForm.username,
            password: regForm.password,
            userRole: ['USER']
        }
        try {
            let response = await userRegister(data);
            if(response?.id) {
                // localStorage.setItem('token', response.token);
                return navigate(`/login`);
            }
            console.log(response);
        } catch(e) {
    
        }
        // console.log("submitted", loginForm);
      }
    
      function handleForm(input, event) {
        setRegForm((preVer) => ({
          ...preVer,
          [input]: event.target.value,
        }));
      }

    return (
        <div className="registration-form">
            <form onSubmit={formSubmitted}>
                <div>
                    <label>Enter Your Email</label>
                    <input type="email" name="username" onChange={(event) => handleForm('username', event)} />
                </div>
                <div>
                <label>Password</label>
                    <input type="password" name="password" onChange={(event) => handleForm('password', event)} />
                </div>
                <div>
                <label>Confirm Password</label>
                    <input type="password" name='confirmpassword' onChange={(event) => handleForm('password', event)} />
                </div>
                <div>
                  <button className="mt-2 btn" type="submit">Register</button>  
                </div>
            </form>
        </div>
    )
}