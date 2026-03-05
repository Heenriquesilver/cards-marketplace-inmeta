import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { MarketPlacePage } from "../pages/market-place/MarketPlacePage";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { MyCardsPage } from "../pages/my-cards/MyCardsPage";
import { AddCardsPage } from "../pages/add-cards/AddCardsPage";
import { CreateTradePage } from "../pages/create-trade/CreateTradePage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MarketPlacePage />,
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
      {
        path: "/create-trade",
        element: <CreateTradePage />,
      },
    ],
  },
]);
