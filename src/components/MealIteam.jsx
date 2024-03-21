import { useContext } from 'react';
import './MealIteam.css';
import pizza from '../assets/meal-images/beef-tacos.jpg'
import {Button} from '../components/UIs/Button'
import CartContext from '../store/CartContext';
export default function MealIteam({meal}) {
    const cartCtx = useContext(CartContext);
    function handelAddMealToCart() {
        cartCtx.addItem(meal)
    }


    return (
        <li className='meal-item'>
            <article>
                <img src={meal.imageBase64String}/>
            <div>
                <h3>{meal.productName}</h3>
                <p className='meal-item-price'>LKR {meal.sellingPrice}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-actions'>
                <Button onClick={handelAddMealToCart}>Add to Cart</Button>
            </p>
            </article>
        </li>
    )
}