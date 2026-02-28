import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../shared/layouts/AppLayout";
import { MarketplacePage } from "../pages/market-place/marketPlacePage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MarketplacePage />,
      },
    ],
  },
]);
