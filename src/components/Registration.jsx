import "./Registration.css";
import {
  userRegister,
  userLogin,
  userRegisterAsCustomer,
} from "../httpServices/userService";
import { useNavigate } from "react-router-dom";
import Input from "./UIs/Input";

export default function Registration() {
  const navigate = useNavigate();

  //   const [regForm, setRegForm] = useState({
  //     username: "",
  //     password: "",
  //     confirmpassword: "",
  //   });

  async function formSubmitted(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const regFormData = Object.fromEntries(formData.entries());

    try {
      let response = await userRegister({
        username: regFormData.email,
        password: regFormData.password,
        userRole: ["USER"],
      });
      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Something went wrong");
      }

      let tokenResponse = await userLogin({
        username: regFormData.email,
        password: regFormData.password,
      });
      const resTokenData = await tokenResponse.json();
      if (!tokenResponse.ok) {
        throw new Error(resTokenData.message || "Something went wrong");
      }

      let tempRegData = { ...regFormData };
      delete tempRegData.password;
      delete tempRegData.confirmpassword;

      let customerReg = await userRegisterAsCustomer(
        tempRegData,
        resTokenData.token
      );
      const resCustomerData = await customerReg.json();
      if (!customerReg.ok) {
        throw new Error(resCustomerData.message || "Something went wrong");
      }
      return navigate(`/login`);
    } catch (e) {
      console.log(e);
    }
    // console.log("submitted", loginForm);
  }

  //   function handleForm(input, event) {
  //     setRegForm((preVer) => ({
  //       ...preVer,
  //       [input]: event.target.value,
  //     }));
  //   }

  return (
    <div className="registration-form">
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
          <Input placeholder="Password" type="password" name="password"></Input>
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
