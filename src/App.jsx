import "./App.css";
import { useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";

function App() {
  let routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
      ],
    },
  ]);
  return <div className="home">{routes}</div>;
}

export default App;
