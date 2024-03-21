import { useContext } from "react"
import CartContext from "../store/CartContext"
import UserProgressContext from "../store/UserProgressContext";
import {Button} from "../components/UIs/Button";
import {Modal} from "../components/UIs/Modal";

export function Cart() {
    try {

    } catch(e) {
console.log(e)
    }
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => (totalPrice + (item.quantity*item.sellingPrice)), 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }
   
    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>  
            <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id}>{item.productName} - {item.quantity}</li>
                ))}
            </ul>
            <p className="cart-total">{cartTotal}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button>Goto Checkout</Button>
            </p>
        </Modal>
    )
}