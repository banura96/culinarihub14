import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Registration";
import Root from "./components/Root";
import { checkOutLoader as authloader } from "./utils/auth";
import AdminDashboard from "./components/Admin-Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index:true, path: "/", element: <Home />, loader: authloader},
      { path: "/dashboard", element: <AdminDashboard />, loader: authloader},
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Registration /> }
]);

function App() {
  return (

    <RouterProvider router={router} />

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/" element={<Home />} />
    //     <Route path="/signup" element={<Registration />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
