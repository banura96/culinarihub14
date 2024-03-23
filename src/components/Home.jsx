import { CartContextProvider } from "../store/CartContext";
import { UserProgressContextProvider } from "../store/UserProgressContext";
import EventsNavigation from "./EventsNavigation";
import Meals from "./Meals";
import {Cart} from '../components/Cart';
import Checkout from "./UIs/Checkout";

export default function Home() {
  console.log('Home');
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <EventsNavigation />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}
