import { useEffect, useState } from "react";
import { CartContextProvider } from "../store/CartContext";
import { UserProgressContextProvider } from "../store/UserProgressContext";
import EventsNavigation from "./EventsNavigation";
import Meals from "./Meals";
import { Cart } from "../components/Cart";
import Checkout from "./UIs/Checkout";
import { getAuthToken } from "../utils/auth";

export default function Home() {
  const [customer, setCustomer] = useState(null);
  // const [userRole, setUserRole] = useState([]);
 

  useEffect(() => {
    async function getCustomerData() {
      const customerData = await fetch(
        "http://54.179.42.252:8080/api/v1/customer/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken(),
          },
        }
      );
      const resCustomerData = await customerData.json();

      if (customerData.ok) {
        setCustomer(resCustomerData);
      }
      // const userData = await fetch(
      //   `http://54.179.42.252:8080/api/v1/user/${resCustomerData.id}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + getAuthToken(),
      //     },
      //   }
      // );
      // const resUserData = await userData.json();
      // if (userData.ok) {
      //   setUserRole([...resUserData.userRole]);
      // }
    }
    getCustomerData();
  }, []);

  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <EventsNavigation customer={customer?.customer} userRoles={customer?.user.userRole} />

          <Meals customer={customer?.customer} />

          <Cart customer={customer?.customer} />

          <Checkout customer={customer?.customer} />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}
