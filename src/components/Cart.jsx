import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { Button } from "../components/UIs/Button";
import { Modal } from "../components/UIs/Modal";
import CartItem from "./UIs/CartItem.jsx";
import { currencyFormater } from "../utils/numberFormatting";
import { getAuthToken } from "../utils/auth.js";

export function Cart({ customer }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [processing, setProcessing] = useState(false);

  // console.log(cartCtx)

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.sellingPrice,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.showCheckout("checkout");
  }

  async function handleClearCart() {
    setProcessing(true);
    const res = await fetch(
      `http://54.179.42.252:8080/api/v1/cart/clear-cart?customerId=${customer.id}`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getAuthToken(),
        },
      }
    );
    // const resData = res.json();
    if (res.ok) {
      cartCtx.clearCart();
      handleCloseCart();
    }
    setProcessing(false);
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            cartId={item.cartId}
            name={item.productName}
            price={item.sellingPrice}
            quenty={item.quantity}
            customerId={customer.id}
            prodId={item.id}
            onDescresed={() => cartCtx.removeItem(item.id)}
            onIncresed={() => cartCtx.addItem(item)}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">LKR {currencyFormater.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button
          textOnly
          disabled={processing ? true : false}
          onClick={handleCloseCart}
        >
          Close
        </Button>
        {cartCtx.items.length > 0 && (
           <Button onClick={handleClearCart}>
           {processing && <i className="fa fa-spinner fa-spin"></i>}Clear Cart
         </Button>
        )}
        {cartCtx.items.length > 0 && (
          <Button
            onClick={handleCheckout}
            disabled={cartTotal <= 0 || processing ? true : false}
          >
            Goto Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
