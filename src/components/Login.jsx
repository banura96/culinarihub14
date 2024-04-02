import { useState } from "react";
import "./Login.css";
import { userLogin } from "../httpServices/userService.js";
import { useNavigate } from "react-router-dom";
import Input from "./UIs/Input.jsx";

export default function Login() {
  // const [enteredEmail, setEmail] = useState();
  const [proccessing, setProccessing] = useState();
  const [error, setError] = useState("");
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
      setProccessing(true);
      let response = await userLogin(data);
      const resTokenData = await response.json();
      if (!response.ok) {
        throw new Error(resTokenData.message || "Something went wrong");
      }
      if (resTokenData?.token) {
        localStorage.setItem("token", resTokenData.token);
        // setTimeout(() => {
        //   console.log(localStorage.getItem('token'))
        navigate(`/`);
        // }, 5000)
      }
      // console.log(response);
    } catch (e) {
      setError("Username or Password incorrect!");
    }
    // console.log("submitted", loginForm);
    setProccessing(false);
  }

  function handleForm(input, event) {
    if (error) {
      setError("");
    }
    setLoginForm((preVer) => ({
      ...preVer,
      [input]: event.target.value,
    }));
  }
  return (
    <>
      <div className="login-page">
        <div className="login-form">
        <p className="brand-name text-center">
          <h3>CulinaryHub14</h3>

          <p>Foodie adventures are the best adventures.</p>
        </p>
          <div className="text-center">
            <h3>Sign In</h3>
            <p>Welcome back, lets taste a food!</p>
          </div>
          <form onSubmit={formSUbmitted}>
            <Input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={loginForm.email}
              onChange={(event) => handleForm("email", event)}
            ></Input>
            <Input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={loginForm.password}
              onChange={(event) => handleForm("password", event)}
            ></Input>
            {/* <label>Enter Your Email</label>
              <input
               
              />
            </div>
            <div className="">
              <label>Enter Your Password</label>
              <input
              />
            </div> */}
            <button className="btn mt-2" type="submit">
              {proccessing && <i className="fa fa-spinner fa-spin"></i>} Submit
            </button>
            {error && (
              <p
                style={{
                  'background': '#fba0a0',
                  "text-align": "center",
                  'color': '#8b0a0a'
                }}
                className="mt-2"
              >
                {error}
              </p>
            )}
          </form>
          <p className="mt-2">
            Don't you have a account,{" "}
            <span className="link-text" onClick={() => navigate(`/signup`)}>
              Register
            </span>{" "}
            here!
          </p>
        </div>
      </div>
    </>
  );
}
