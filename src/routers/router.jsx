import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Income from "../components/Income";
import Expense from "../components/Expense";
import App from "../App";
import Home from "../home/Home";
import AllTransactions from "../components/AllTransactions";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/income",
          element: <Income/>
        },
        {
          path: "/expense",
          element: <Expense/>
        },
        {
          path: "/alltransactions",
          element: <AllTransactions/>
        }
      ]
    }]);

export default router