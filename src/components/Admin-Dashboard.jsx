import EventsNavigation from "./EventsNavigation";
import { useNavigation } from "react-router-dom";

export default function AdminDashboard() {
    const nv = useNavigation();
    console.log(nv)

    return(<>
    <EventsNavigation hidden/>
    </>)
}