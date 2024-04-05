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
  customerId,
  prodId
}) {

  const [proccessing, setProccessing] = useState(false);
  const [error, setError] = useState('');


  async function addItemToCart() {
    setProccessing(true);
    const token = getAuthToken();
    try {
      const response = await fetch(
        `http://54.179.42.252:8080/api/v1/cart/alter-cart-quantity?cartId=${cartId}&alter=UP`,
        {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await response.json();
      if (response.ok) {
        onIncresed();
        setProccessing(false);
      } else {
        throw new Error(resData.message || 'Something went wrong');
      }
    } catch(e) {
      setError(e.message);
      setTimeout(() => {
        setError('');
      }, 3000)
    }
    setProccessing(false);
  }

  async function removeItemFromCart() {
    setProccessing(true);
    const token = getAuthToken();
    if(quenty === 1) {
      const response = await fetch(`http://54.179.42.252:8080/api/v1/cart/remove-product?customerId=${customerId}&productId=${prodId}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log('quentyt 1')
    if (response.ok) {
      onDescresed();
      setProccessing(false);
    }
    } else {
      console.log('quentyt moree')

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
    }
    setProccessing(false);
  }

  return (
    <>
    <li className="cart-item">
      <p>
        {name} - {currencyFormater.format(price)} * {quenty}
      </p>
      <p className="cart-item-actions">
        <button disabled={proccessing} onClick={removeItemFromCart}>-</button>
        { proccessing && <i className="fa fa-spinner fa-spin"></i>}
        <span hidden={proccessing}> {quenty}</span>
        <button disabled={proccessing} onClick={addItemToCart}>+</button>
      </p>
    </li>
    {error && (
      <p
        style={{
          'background': '#fba0a0',
          "text-align": "center",
          'color': '#8b0a0a'
        }}
        className="mt-2"
      >
        {error}
      </p>
    )}
   </>
  );
}
