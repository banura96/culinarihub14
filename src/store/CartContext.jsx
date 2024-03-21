import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    console.log('workd', state)
    console.log('workd', action)

    const exsitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    console.log(exsitingCartItemIndex);

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
    return {...state, items: updatedItems}
  }

  if (action.type === "REMOVE_ITEM") {
    const exsitingCartItemIndex = state.item.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.item[exsitingCartItemIndex];
      const updatedItems = [...state.items];
      if(existingCartItem.quentity === 1) {
        updatedItems.splice(existingCartItem, 1);
      } else {
        const updatedItem = {
            ...existingCartItem,
            quentity: existingCartItem.quentity - 1
        }
        updatedItems[exsitingCartItemIndex] = updatedItem;
      }

      return {...state, items: updatedItems};
  }

  return state;
}

export function CartContextProvider({ children }) {
 const [cart, dispathCartAction] = useReducer(cartReducer, { items: [] });

function addItem(item) {
    dispathCartAction({type: 'ADD_ITEM', item })
}

function removeItem(id) {
    dispathCartAction({type: 'REMOVE_ITEM', id })
}

const cartContext = {
    items: cart.items,
    addItem,
    removeItem
}

console.log(cartContext)

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;
