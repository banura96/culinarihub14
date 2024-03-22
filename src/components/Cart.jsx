import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { Button } from "../components/UIs/Button";
import { Modal } from "../components/UIs/Modal";
import { CartItem } from "./UIs/CartItem";

export function Cart() {
  try {
  } catch (e) {
    console.log(e);
  }
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

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

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.productName}
            price={item.sellingPrice}
            quenty={item.quantity}
            onDescresed={() => cartCtx.removeItem(item.id)}
            onIncresed={() => cartCtx.addItem(item)}
          ></CartItem>
        ))}
      </ul>
      <p className="cart-total">{cartTotal}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Goto Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
