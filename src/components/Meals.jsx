import { useEffect, useState } from "react";
import { getAllMeals } from "../httpServices/mealService";
import MealIteam from "./MealIteam";
export default function Meals() {
  useEffect(() => {
    async function getMealItems() {
      let response = await getAllMeals();
      if (response) {
        console.log(response);
        setMealItems(response);
      }
    }
    getMealItems();
  }, []);


  const [mealItems, setMealItems] = useState([]);
  return (
      <ul id="meals">
        {mealItems.map(item => (
            <MealIteam key={item.productName} meal={item}/>
        ))}
      </ul>
  );
}
