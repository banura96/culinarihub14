import { useContext, useState } from "react";
import "./MealIteam.css";
import { Button } from "../components/UIs/Button";
import CartContext from "../store/CartContext";
import { getAuthToken } from "../utils/auth";
import { currencyFormater } from "../utils/numberFormatting";
import { default as Buttonb } from "react-bootstrap/Button";
import { default as Modalb } from "react-bootstrap/Modal";
export default function MealIteam({ meal, customer }) {
  const cartCtx = useContext(CartContext);
  const [proccessing, setProccesseing] = useState(false);
  const [show, setShow] = useState(null);


  const handleClose = () => {
    setShow('');
  };
  const handleShow = (error) => {
    setShow(error);
  };


  async function handelAddMealToCart() {
    setProccesseing(true);
    const c = cartCtx.items.find((item) => item.id === meal.id);
    if (c) {
      await addItemToCart(c.cartId, meal);
    } else {
      const newCart = await saveCartInDB({
        customerId: customer.id,
        productId: meal.id,
        quantity: 1,
        price: meal.sellingPrice,
      });
      cartCtx.addItem({ ...meal, cartId: newCart.id }, customer.id);
    }
    setProccesseing(false);
  }

  async function saveCartInDB(data) {
    const res = await fetch(`http://54.179.42.252:8080/api/v1/cart/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!res.ok) {
      handleShow(resData.message || "Something went wrong");
      setProccesseing(false);
      throw new Error(res.message || "Something went wrong");
    }
    return resData;
  }

  async function addItemToCart(cartId, meal) {
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
    const resData = await response.json();

    if (!response.ok) {
      handleShow(resData.message || "Something went wrong");
      setProccesseing(false);
      // throw new Error(response.message || "Something went wrong");
    }
    cartCtx.addItem(meal, customer.id);
  }

  return (
    <li className="meal-item">
      <Modalb show={show} onHide={handleClose}>
        <Modalb.Header closeButton>
          <Modalb.Title>Error Occured</Modalb.Title>
        </Modalb.Header>
        <Modalb.Body>
          <p>
            {show}
          </p>
        </Modalb.Body>
        <Modalb.Footer>
          <Buttonb variant="secondary" onClick={handleClose}>
            Close
          </Buttonb>
        </Modalb.Footer>
      </Modalb>
      <article>
        <img src={meal.imageBase64String} alt={meal.productName} />
        <div>
          <h3>{meal.productName}</h3>
          <p className="meal-item-price">
            LKR {currencyFormater.format(meal.sellingPrice)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          {meal.availableQuantity > 0 ? (
            <Button disabled={proccessing} onClick={handelAddMealToCart}>
              {proccessing && <i className="fa fa-spinner fa-spin"></i>} Add to
              Cart
            </Button>
          ) : (
            <Button disabled>Out of Stock</Button>
          )}
        </p>
      </article>
    </li>
  );
}
