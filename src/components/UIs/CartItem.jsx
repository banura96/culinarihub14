import { getAuthToken } from "../../utils/auth"
export function CartItem({cartId, name, price, quenty, onDescresed, onIncresed}) {



    async function addItemToCart() {
        const token = getAuthToken()
        const response = await fetch(`http://54.179.42.252:8080/api/v1/cart/alter-cart-quantity?cartId=27&alter=UP`,
        {  method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': "Bearer " + token
        }
    });
        if(response.ok) {
            onIncresed();
        }
    }


    return (<li className="cart-item">
        <p>
            {name} - {price}*{quenty}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDescresed}>-</button>
            <span> {quenty}</span>
            <button onClick={addItemToCart}>+</button>
        </p>
    </li>)
}