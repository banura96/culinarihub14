import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

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

  if(action.type === 'CLEAR_CART') {
    return {...state, items: []};
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispathCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispathCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispathCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispathCartAction({type: "CLEAR_CART"});
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
