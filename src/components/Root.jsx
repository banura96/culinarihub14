import { Outlet } from "react-router-dom";
import EventsNavigation from "./EventsNavigation";
import { CartContextProvider } from "../store/CartContext";
import { UserProgressContextProvider } from "../store/UserProgressContext";

function Root() {
  return (
    <>
          <Outlet />
    </>
  );
}

export default Root;
