import { NavLink, useNavigate } from "react-router-dom";
import "./EventsNavigation.css";
import logo from "../assets/pizza3.svg";
import { Button } from "../components/UIs/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";

function EventsNavigation({hidden = false, userRoles = []}) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const navigate = useNavigate();

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  function handleLogOut() {
    localStorage.clear();
    navigate('/login', {replace: true})
  }

  return (
    <ul className="n-bar"> 
      <li className="company-name">
        <img className="image-svg" src={logo} alt="" />
        <span>CulinaryHub14</span>
      </li>
      <li>
        <NavLink to="/" className="nav__link" end>
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink to="/orders" className="nav__link" end>

        {(!userRoles.find((role) => role ==='ADMIN') &&  'My Orders') || 'Admin Dashboard'}
         
        </NavLink>
      </li>
      {/* <li hidden={!userRoles.find((role) => role ==='ADMIN')}>
        <NavLink to="/dashboard" className="nav__link">
          Admin Dashboard
        </NavLink>
      </li> */}
      <li hidden={hidden}>
        <Button onClick={handleShowCart} className="margin-t-b" textOnly>
          Cart ({totalCartItems})
        </Button>
      </li>
      <li className="log-out">
      <Button onClick={handleLogOut} textOnly>
          Logout
        </Button>
      </li>
    </ul>
    );
}

export default EventsNavigation;
