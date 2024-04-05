import "./Registration.css";
import { useState } from "react";
import { userRegister } from "../httpServices/userService";
import { useNavigate } from "react-router-dom";
import Input from "./UIs/Input";

export default function Registration() {
  const navigate = useNavigate();
  const [proccessing, setProccessing] = useState();
  const [error, setError] = useState();
  const [passwordError, setPasswordError] = useState('');


  function passwordCheck(text = '') {

    if(text.length === 0) {
      setPasswordError('');
      return;
    }
    console.log(text)

    let upperCase = false;
    let lowerCase = false;
    let number = false;
    let specialChar = false;
    let textLength = null;
    if(/[A-Z]+/.exec(text)) {
      upperCase = true;
    }
    if(/[0-9]+/.exec(text)) {
      number = true;
    }
    if(/[a-z]+/.exec(text)) {
      lowerCase = true;
    }
    if(/[^a-zA-Z0-9\s]+/.exec(text)) {
      specialChar = true;
    }
    if(text.length >= 8) {
      textLength = true;
    }
    console.log(textLength, text.length)

    if(upperCase && lowerCase && number && specialChar && textLength) {
      console.log()
      setPasswordError('');
      return;
    }

    const result = [];
      if (!textLength) {
        result.push(` ${8 - text.length} more characters`);
      }
      if (!upperCase) {
        result.push(` at least 1 Uppercase`);
      }
      if (!lowerCase) {
        result.push(` at least 1 Lowercase`);
      }
      if (!number) {
        result.push(` at least 1 Number`);
      }
      if (!specialChar) {
        result.push(` at least 1 Special Character`);
      }
      if (result.length === 1) {
        setPasswordError(`Require ${result[0]}.`);
      } else {
        let text = `Require`;
        result.forEach((item, i) => {
          if (i === 0) {
            text += `${item}`;
          } else if (result.length === i + 1) {
            text += ` and ${item}`;
          } else {
            text += `, ${item}`;
          }
        });
        setPasswordError(text);
      }
  }

  async function formSubmitted(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const regFormData = Object.fromEntries(formData.entries());

    if(String(regFormData.password) !== String(regFormData.confirmpassword)) {
      setError('Passwords not match!');
      return;
    }

    if(passwordError) {
      return;
    }

    try {
      let tempRegData = { ...regFormData };
      delete tempRegData.password;
      delete tempRegData.confirmpassword;
      setProccessing(true);
      let response = await userRegister({
        user: {
          username: regFormData.email,
          password: regFormData.password,
          userRole: ["USER", "CUSTOMER"],
        },
        customer: { ...tempRegData },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Something went wrong");
      }
      return navigate(`/login`);
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
    setProccessing(false);
  }

  function handleForm() {
    if (error) {
      setError("");
    }
    // setRegForm((preVer) => ({
    //   ...preVer,
    //   [input]: event.target.value,
    // }));
  }

  return (
    <div className="reg-page">
      {/* <p className="text-center brand-name-position">
          <h3>CulinaryHub14</h3>

          <p>Foodie adventures are the best adventures.</p>
        </p> */}
      <div className="registration-form">
        <div className="text-center">
          <h3>Sign Up</h3>
          <p>Start your food journey with us!</p>
        </div>
        <form onSubmit={formSubmitted}>
          <div className="row">
            <div className="col-6">
              <Input
                placeholder="Enter Your Full Name"
                type="text"
                name="fullName"
                onChange={handleForm}
              ></Input>
            </div>
            <div className="col-6">
              <Input
                placeholder="Mobile No"
                type="text"
                name="mobile"
                onChange={handleForm}
              ></Input>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <Input
              placeholder="Address"
              type="text"
              name="address"
              onChange={handleForm}
            ></Input>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <Input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              onChange={handleForm}
            ></Input>
            </div>      
            {/* <label>Enter Your Email</label>
                    <input  /> */}
          </div>
          <div className="row">
            <div className="col-12">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={($event) =>passwordCheck($event.target.value)}
            ></Input>
                <p style={{'margin-bottom': '0px'}}>Password must be at least 8 characters in length containing at least one upper case, 
              one numeric and one special character</p>
              {passwordError && (
              <p
                style={{
                  background: "#fba0a0",
                  color: "#8b0a0a;",
                }}
                className="mt-2"
              >
                {passwordError}
              </p>
            )}
            </div>
        
            {/* <label>Password</label>
                    <input  /> */}
          </div>

          <div className="row">
            <div className="col-12">
            <Input
              placeholder="Confirm Password"
              type="password"
              name="confirmpassword"
              onChange={handleForm}
              onPaste={(e)=>{
                e.preventDefault()
                return false;
              }}
            ></Input>
            </div>
            {/* <label>Confirm Password</label>
                    <input  /> */}
          </div>
          <div>
          {error && (
              <p
                style={{
                  background: "#fba0a0",
                  "text-align": "center",
                  color: "#8b0a0a;",
                }}
                className="mt-2"
              >
                {error}
              </p>
            )}
            <button disabled={passwordError} className="mt-2 btn" type="submit">
              {proccessing && <i className="fa fa-spinner fa-spin"></i>}{" "}
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
