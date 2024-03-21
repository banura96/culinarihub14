import { NavLink } from "react-router-dom";
import "./EventsNavigation.css";
import logo from "../assets/pizza3.svg";
import { Button } from "../components/UIs/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";

function EventsNavigation() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <ul>
      <li className="company-name">
        <img className="image-svg" src={logo} />
        <span>CulinaryHub14</span>
      </li>
      <li>
        <NavLink to="/" className="nav__link" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/events/new" className="nav__link">
          Menu
        </NavLink>
      </li>
      <li>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </li>
    </ul>
  );
}

export default EventsNavigation;
