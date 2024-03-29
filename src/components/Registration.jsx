import "./Registration.css";
import { useState } from "react";
import {
  userRegister
} from "../httpServices/userService";
import { useNavigate } from "react-router-dom";
import Input from "./UIs/Input";

export default function Registration() {
  const navigate = useNavigate();
  const [proccessing, setProccessing] = useState();


  async function formSubmitted(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const regFormData = Object.fromEntries(formData.entries());

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
      console.log(e);
    }
    setProccessing(false);
  }

  //   function handleForm(input, event) {
  //     setRegForm((preVer) => ({
  //       ...preVer,
  //       [input]: event.target.value,
  //     }));
  //   }

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
              ></Input>
            </div>
            <div className="col-6">
              <Input placeholder="Mobile No" type="text" name="mobile"></Input>
            </div>
          </div>
          <div>
            <Input placeholder="Address" type="text" name="address"></Input>
          </div>
          <div>
            <Input
              placeholder="Enter Your Email"
              type="email"
              name="email"
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
            ></Input>
            {/* <label>Password</label>
                    <input  /> */}
          </div>
          <div>
            <Input
              placeholder="Confirm Password"
              type="password"
              name="confirmpassword"
            ></Input>
            {/* <label>Confirm Password</label>
                    <input  /> */}
          </div>
          <div>
            <button className="mt-2 btn" type="submit">
            { proccessing && <i className="fa fa-spinner fa-spin"></i>} Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
