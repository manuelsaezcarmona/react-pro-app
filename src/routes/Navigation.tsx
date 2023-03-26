import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

import logo from "../logo.svg";
import { routes, Route as RouteApp } from "./routes";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <nav>
          <img src={logo} alt="React Logo PRO app" />
          <ul>
            {routes.map((route: RouteApp) => (
              <li key={route.to}>
                <NavLink
                  to={route.to}
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Routes>
          {routes.map((route: RouteApp) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          ))}
          <Route path="/*" element={<Navigate to={routes[0].to} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
