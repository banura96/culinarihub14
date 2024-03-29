import { getAuthToken } from "../../utils/auth";
import { currencyFormater } from "../../utils/numberFormatting";
export default function CartItem({
  cartId,
  name,
  price,
  quenty,
  onDescresed,
  onIncresed,
}) {
  async function addItemToCart() {
    const token = getAuthToken();
    const response = await fetch(
      `http://54.179.42.252:8080/api/v1/cart/alter-cart-quantity?cartId=${cartId}&alter=UP`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      onIncresed();
    }
  }

  async function removeItemFromCart() {
    const token = getAuthToken();
    const response = await fetch(
      `http://54.179.42.252:8080/api/v1/cart/alter-cart-quantity?cartId=${cartId}&alter=DOWN`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      onDescresed();
    }
  }

  return (
    <li className="cart-item">
      <p>
        {name} - {currencyFormater.format(price)} * {quenty}
      </p>
      <p className="cart-item-actions">
        <button onClick={removeItemFromCart}>-</button>
        <span> {quenty}</span>
        <button onClick={addItemToCart}>+</button>
      </p>
    </li>
  );
}
