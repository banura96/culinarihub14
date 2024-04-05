import { useEffect, useContext, useState } from "react";
// import { getAllMeals } from "../httpServices/mealService";
import MealIteam from "./MealIteam";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/auth";
import Error from "./UIs/Error";
import CartContext from "../store/CartContext";
import Input from "./UIs/Input";


const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ",
  },
};

export default function Meals({customer}) {

  const [mealMaster, setMealMaster] = useState([]);
  const cartCtx = useContext(CartContext);


  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(`http://54.179.42.252:8080/api/v1/product`, requestConfig, []);


  useEffect(() => {
    async function getCartData() {
      if(customer && loadedMeals.length > 0) {
        // console.log(customer)
        const cartResponse = await fetch(`http://54.179.42.252:8080/api/v1/cart/get-customer-cart?customerId=${customer.id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getAuthToken(),
          },
        } );
        setMealMaster(loadedMeals);
        const resCartData = await cartResponse.json();
        // console.log(cartResponse)
        if(loadedMeals.length > 0 && resCartData.length > 0) { 
          try {
            let cartA = [];
            resCartData.forEach((item) => {
              let findItem = loadedMeals.find((meal) => meal.id === item.productId);
              if(findItem) {
              cartA.push({...findItem, quantity: item.quantity, cartId: item.id});
              }
            });
            cartCtx.setInitialCart(cartA);
          } catch(e) {
            cartCtx.setInitialCart([]);
          }
        }
      }
    }
    getCartData();
  }, [customer, loadedMeals]);

  if (isLoading) {
    return <div className="dotted-loader"></div>;
  }

  if(error) {
    return <Error title='Faild to fetch meals' message={error} ></Error>
  }


  function handleSearch(event) {
    let t = loadedMeals.filter((item) => String(item.productName).toLowerCase().includes(event.target.value.toLowerCase()));
    setMealMaster(t);
    // console.log(mealMaster);
  }


  return (
    <div>
      <div>
        <Input classN='align-items' placeholder='Search by Food Name' onChange={handleSearch} />
      </div>
      {
        mealMaster.length === 0 &&<div> <p>No Food Items Found!</p></div>
      }
      
    <ul id="meals">
      {mealMaster.map((item) => (
        <MealIteam key={item.id} meal={item} customer={customer} />
      ))}
    </ul>
    </div>
  );
}
