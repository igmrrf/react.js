import { useRoutes } from "react-router-dom";
// import MainRoutes from "./main.routes";
import routes from "./main.routes";

export default function ThemeRoutes() {
  return useRoutes(routes);
}
