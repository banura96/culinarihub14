import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showSuccessError: () => {},
  hideSuccessError: () => {}
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("chekout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  function showSuccessError() {
    setUserProgress("showsuccesserror");
  }
  const useProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={useProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
export default UserProgressContext;

