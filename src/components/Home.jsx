import { CartContextProvider } from "../store/CartContext";
import { UserProgressContextProvider } from "../store/UserProgressContext";
import EventsNavigation from "./EventsNavigation";
import Meals from "./Meals";
import {Cart} from '../components/Cart';

export default function Home() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <EventsNavigation />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}
