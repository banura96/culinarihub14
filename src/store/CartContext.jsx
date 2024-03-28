import { createContext, useReducer } from "react";
import { getAuthToken } from "../utils/auth";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

async function saveCartInDB(data) {
  await fetch(`http://54.179.42.252:8080/api/v1/cart/save`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
      body: JSON.stringify(data),
    }
  );
}

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const exsitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (exsitingCartItemIndex > -1) {
      const existingItem = state.items[exsitingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[exsitingCartItemIndex] = updatedItem;
    } else {
      saveCartInDB({
        customerId: action.customerId,
        productId: action.item.id,
        quantity: 1,
        price: action.item.sellingPrice,
      });
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const exsitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[exsitingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItem, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[exsitingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  if(action.type === "SET_INITIAL_CART") {
    console.log(action)
    return {...state, items: action.items}
  }

  // Warning: Maximum update depth exceeded. 
  // This can happen when a component calls setState inside useEffect,
  //  but useEffect either doesn't have a dependency array, 
  //  or one of the dependencies changes on every render.

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispathCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item, customerId) {
    dispathCartAction({ type: "ADD_ITEM", item, customerId });
  }

  function removeItem(id) {
    dispathCartAction({ type: "REMOVE_ITEM", id });
  }

  function setInitialCart(items) {
    dispathCartAction({ type: "SET_INITIAL_CART", items});
  }

  function clearCart() {
    dispathCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
    setInitialCart
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
