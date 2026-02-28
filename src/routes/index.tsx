import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { MarketplacePage } from "../pages/market-place/marketPlacePage";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { MyCardsPage } from "../pages/my-cards/MyCardsPage";
import { AddCardsPage } from "../pages/add-cards/AddCardsPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MarketplacePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/my-cards",
        element: <MyCardsPage />,
      },
      {
        path: "/add-cards",
        element: <AddCardsPage />,
      },
    ],
  },
]);
