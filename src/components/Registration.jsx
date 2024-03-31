import "./Registration.css";
import { useState } from "react";
import { userRegister } from "../httpServices/userService";
import { useNavigate } from "react-router-dom";
import Input from "./UIs/Input";

export default function Registration() {
  const navigate = useNavigate();
  const [proccessing, setProccessing] = useState();
  const [error, setError] = useState();

  async function formSubmitted(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const regFormData = Object.fromEntries(formData.entries());

    if(String(regFormData.password) !== String(regFormData.confirmpassword)) {
      setError('Passwords not match!');
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
          <div>
            <Input
              placeholder="Address"
              type="text"
              name="address"
              onChange={handleForm}
            ></Input>
          </div>
          <div>
            <Input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              onChange={handleForm}
            ></Input>
            {/* <label>Enter Your Email</label>
                    <input  /> */}
          </div>
          <div></div>
          <div>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleForm}
            ></Input>
            {/* <label>Password</label>
                    <input  /> */}
          </div>
          <div>
            <Input
              placeholder="Confirm Password"
              type="password"
              name="confirmpassword"
              onChange={handleForm}
            ></Input>
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
            <button className="mt-2 btn" type="submit">
              {proccessing && <i className="fa fa-spinner fa-spin"></i>}{" "}
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
