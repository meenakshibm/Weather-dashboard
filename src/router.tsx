import { createBrowserRouter } from "react-router-dom";
import ForecastPage from "./pages/ForecastPage";
import DayDetailsPage from "./pages/DayDetailsPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ForecastPage />,
  },
  {
    path: "/day/:date",
    element: <DayDetailsPage />,
  },
]);