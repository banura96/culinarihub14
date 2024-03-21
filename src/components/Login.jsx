import { useState } from "react";
import { Button } from 'react-bootstrap';
import './Login.css';
import {userLogin} from '../httpServices/userService.js'
import { redirect, useNavigate } from "react-router-dom";

export default function Login() {
  // const [enteredEmail, setEmail] = useState();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });


  async function formSUbmitted(event) {
    event.preventDefault();
    const data = {
        username: loginForm.email,
        password: loginForm.password
    }
    try {
        let response = await userLogin(data);
        if(response?.token) {
            localStorage.setItem('token', response.token);
            return navigate(`/`);
        }
        console.log(response);
    } catch(e) {

    }
    // console.log("submitted", loginForm);
  }

  function handleForm(input, event) {
    setLoginForm((preVer) => ({
      ...preVer,
      [input]: event.target.value,
    }));
  }
  return (
    <>
      <p>this this loging</p>
      <div className="login-form">
        <form onSubmit={formSUbmitted}>
          <div className="">
            <label>Enter Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={loginForm.email}
              onChange={(event) => handleForm("email", event)}
            />
          </div>
          <div className="">
          <label>Enter Your Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={loginForm.password}
              onChange={(event) => handleForm("password", event)}
            />
          </div>
          <button className="btn mt-2" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
