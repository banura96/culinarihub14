import { useLoaderData } from "react-router-dom";
import EventsNavigation from "./EventsNavigation";
import { useState } from "react";
import { getAuthToken, checkOutLoader } from "../utils/auth";
import './Orders.css';
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";

export default function () {

  const [activeTab, setActiveTab] = useState('order');

  const data = useLoaderData();
  console.log(data);

  function changeTab(tab) {
    setActiveTab(tab);
  }
  // useEffect(() => {
  //   async function getCustomerData() {
  //     const customerData = await fetch(
  //       "http://54.179.42.252:8080/api/v1/customer/me",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + getAuthToken(),
  //         },
  //       }
  //     );
  //     const resCustomerData = await customerData.json();
  //     if (customerData.ok) {
  //       setCustomer(resCustomerData);
  //     }
  //     const userData = await fetch(
  //       `http://54.179.42.252:8080/api/v1/user/${resCustomerData.id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + getAuthToken(),
  //         },
  //       }
  //     );
  //     const resUserData = await userData.json();
  //     if (userData.ok) {
  //       setUserRole([...resUserData.userRole]);
  //     }
  //   }
  //   getCustomerData();
  // }, []);

  return (
    <>
      <EventsNavigation hidden customer={data} />
      <div>
        <nav>
          <ul className="n-barc">
            <li>
              <span onClick={() => changeTab('order')} className={activeTab === 'order' && 'active'}>
                Orders Management
              </span>
            </li>
            <li>
              <span onClick={() => changeTab('product')} className={activeTab === 'product' && 'active'}>
                Product Management
              </span>
            </li>
          </ul>
        </nav>
      </div>
      {activeTab === 'order' ? <OrderManagement/> : <ProductManagement/>}
    </>
  );
}

export async function loadingLogedInUserData() {
    checkOutLoader();
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
      console.log('works')
        console.log(customerData)
      if (!customerData.ok) {
        if(resCustomerData.message === 'Unauthorized') {
          console.log('works')
          localStorage.clear();
          console.log('works')
          try {
            checkOutLoader();

          } catch(e) {
            console.log(e)
          }
        }
        throw new Error(customerData.message || "Something went wrong");
      }
      const userData = await fetch(
        `http://54.179.42.252:8080/api/v1/user/${resCustomerData.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAuthToken(),
          },
        }
      );
      const resUserData = await userData.json();

      return {...resCustomerData, ...resUserData}
}
