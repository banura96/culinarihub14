import { getAuthToken } from "../../utils/auth";
import { currencyFormater } from "../../utils/numberFormatting";
import { useState } from "react";
export default function CartItem({
  cartId,
  name,
  price,
  quenty,
  onDescresed,
  onIncresed,
}) {

  const [proccessing, setProccessing] = useState(false);

  async function addItemToCart() {
    setProccessing(true);
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
      setProccessing(false);
    }
    setProccessing(false);
  }

  async function removeItemFromCart() {
    setProccessing(true);
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
      setProccessing(false);
    }
    setProccessing(false);
  }

  return (
    <li className="cart-item">
      <p>
        {name} - {currencyFormater.format(price)} * {quenty}
      </p>
      <p className="cart-item-actions">
        <button disabled={quenty === 1 || proccessing} onClick={removeItemFromCart}>-</button>
        { proccessing && <i className="fa fa-spinner fa-spin"></i>}
        <span hidden={proccessing}> {quenty}</span>
        <button disabled={proccessing} onClick={addItemToCart}>+</button>
      </p>
    </li>
  );
}
