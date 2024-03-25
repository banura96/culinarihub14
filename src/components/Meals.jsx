import { useEffect, useState, useContext } from "react";
// import { getAllMeals } from "../httpServices/mealService";
import MealIteam from "./MealIteam";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/auth";
import Error from "./UIs/Error";
import CartContext from "../store/CartContext";


const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ",
  },
};

export default function Meals({customer}) {

  // const [cart, setCart] = useState([]);
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
        const resCartData = await cartResponse.json();
        // console.log(cartResponse)
        if(loadedMeals.length > 0 && resCartData.length > 0) { 
          let cartA = [];
          resCartData.forEach((item) => {
            let findItem = loadedMeals.find((meal) => meal.id === item.productId);
            if(findItem) {
            cartA.push({...findItem, quantity: item.quantity});
            }
          });
          cartCtx.setInitialCart(cartA); 
        }
      }
  
    }
    getCartData();
  }, [customer, loadedMeals]);



  // useEffect(() => {
  //   console.log('mmmm')
  //   if(loadedMeals.length > 0 && cart.length > 0) { 
  //     let cartA = [];
  //     cart.forEach((item) => {
  //       let findItem = loadedMeals.find((meal) => meal.id === item.productId);
  //       if(findItem) {
  //       cartA.push({...findItem, quantity: item.quantity});
  //       }
  //     });
  //     cartCtx.setInitialCart(cartA); 
  //   }
  // }, [])


  // console.log('cart data', cart)

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if(error) {
    return <Error title='Faild to fetch meals' message={error} ></Error>
  }

 

  // useEffect(() => {
  //   async function getMealItems() {
  //     let response = await getAllMeals();
  //     if (response) {
  //       setMealItems(response);
  //     }
  //   }
  //   getMealItems();
  // }, []);

  // const [mealItems, setMealItems] = useState([]);
  // console.log("working2");

  return (
    <ul id="meals">
      {loadedMeals.map((item) => (
        <MealIteam key={item.productName} meal={item} />
      ))}
    </ul>
  );
}
