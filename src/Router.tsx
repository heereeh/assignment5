import { createBrowserRouter } from "react-router-dom";
import Layout from "./views/Layout";
import TV from "./Routes/TV";
import Home from "./Routes/Home";
import Search from "./Routes/Search";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
          children: [
            {
              path: "movies/:movieId",
              element: <></>,
            },
          ],
        },
        {
          path: "search",
          element: <Search />,
          children: [
            {
              path: ":type/:id",
              element: <></>,
            },
          ],
        },
        {
          path: "tv",
          element: <TV />,
          children: [
            {
              path: ":tvId",
              element: <></>,
            },
          ],
        },
      ],
    },
  ],
  { basename: "/assignment5" }
);

export default router;
