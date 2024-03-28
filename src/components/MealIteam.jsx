import { useContext } from "react";
import "./MealIteam.css";
import { Button } from "../components/UIs/Button";
import CartContext from "../store/CartContext";
export default function MealIteam({ meal }) {
  const cartCtx = useContext(CartContext);
  function handelAddMealToCart() {
    cartCtx.addItem(meal, 10);
  }

  return (
    <li className="meal-item">
      <article>
        <img src={meal.imageBase64String} alt={meal.productName} />
        <div>
          <h3>{meal.productName}</h3>
          <p className="meal-item-price">LKR {meal.sellingPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {meal.availableQuantity > 0 ? (
            <Button onClick={handelAddMealToCart}>Add to Cart</Button>
          ) : (
            <Button disabled>Out of Stock</Button>
          )}
        </p>
      </article>
    </li>
  );
}
