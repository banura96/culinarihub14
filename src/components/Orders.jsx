import { useLoaderData, redirect } from "react-router-dom";
import EventsNavigation from "./EventsNavigation";
import { useState } from "react";
import { getAuthToken, checkOutLoader } from "../utils/auth";
import './Orders.css';
import OrderManagement from "./OrderManagement";
import ProductManagement from "./ProductManagement";

export default function () {

  const [activeTab, setActiveTab] = useState('order');

  const data = useLoaderData();

  function changeTab(tab) {
    setActiveTab(tab);
  }

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
      if (!customerData.ok) {
        if(resCustomerData.message === 'Unauthorized') {
          localStorage.clear();
          return redirect("/login");
        }
        throw new Error(customerData.message || "Something went wrong");
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

      return {...resCustomerData}
}
