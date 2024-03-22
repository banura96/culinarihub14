export function CartItem({name, price, quenty, onDescresed, onIncresed}) {
    return (<li className="cart-item">
        <p>
            {name} - {price}*{quenty}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDescresed}>-</button>
            <span>LKR {quenty}</span>
            <button onClick={onIncresed}>+</button>
        </p>
    </li>)
}