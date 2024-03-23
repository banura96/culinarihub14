import { useState } from "react";
import "./Login.css";
import { userLogin } from "../httpServices/userService.js";
import { useNavigate } from "react-router-dom";

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
      password: loginForm.password,
    };
    try {
      let response = await userLogin(data);
      const resTokenData = await response.json();
      if (!response.ok) {
        throw new Error(resTokenData.message || "Something went wrong");
      }
      if (resTokenData?.token) {
        localStorage.setItem("token", resTokenData.token);
        return navigate(`/`);
      }
      console.log(response);
    } catch (e) {}
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
      <div className="login-page">
        <p className="brand-name">
          <h3>CulinaryHub14</h3>
          
            <p>Foodie adventures are the best adventures.</p>
          
        </p>
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
            <button className="btn mt-2" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
