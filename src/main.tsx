import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import "styles/reset.css";
import "styles/globals.css";
import "styles/table.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
