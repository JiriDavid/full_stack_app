import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../features/HomePage.jsx";
import Login from "../features/login/Login.jsx";
import Register from "../features/register/Register.jsx";
import ActivationPage from "../features/activation/ActivationPage.jsx";
import ForgotPassword from "../features/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "../features/resetPassword/ResetPassword.jsx";
import ProductDetails from "../features/products/ProductDetails.jsx";
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
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <ActivationPage />,
        path: "/activation",
      },
      {
        element: <ForgotPassword />,
        path: "/forgotPassword",
      },
      {
        element: <ResetPassword />,
        path: "/resetPassword/:resetToken",
      },
      {
        element: <ProductDetails />,
        path: "/:id",
      },
    ],
  },
]);

export default router;
