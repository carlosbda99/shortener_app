import {CustomRoute} from "../Types/Route";
import Dashboard from "../Views/Dashboard/Dashboard";
import Ranking from "../Views/Ranking/Ranking";
import Shortener from "../Views/Shortener/Shortener";
import About from "../Views/About/About";
import Home from "../Views/Home";
import Profile from "../Views/Profile/Profile";

const routesConf: CustomRoute[] = [
  {
    path: "/profile",
    component: Profile,
    page: "Perfil",
  },

  {
    path: "/dashboard",
    component: Dashboard,
    page: "Dashboard",
  },

  {
    path: "/ranking",
    component: Ranking,
    page: "Ranking",
  },

  {
    path: "/shorting",
    component: Shortener,
    page: "Encurtador",
  },

  {
    path: "/about",
    component: About,
    page: "Sobre",
  },

  {
    path: "/",
    component: Home,
    page: "Página inicial",
  }
];
export default routesConf;
