// import { useEffect, useState } from "react";
// import { getAllMeals } from "../httpServices/mealService";
import MealIteam from "./MealIteam";
import useHttp from "../hooks/useHttp";
import { getAuthToken } from "../utils/auth";
import Error from "./UIs/Error";

const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAuthToken(),
  },
};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(`http://54.179.42.252:8080/api/v1/product`, requestConfig, []);

  if (isLoading) {
    console.log("working");
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
