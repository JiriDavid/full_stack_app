import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../features/HomePage.jsx";
import Login from "../features/login/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
]);

export default router;
