import { Suspense } from "react";
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

/*  una vez implementado mis rutas lazys en routes, debemos indicar a react que debemos esperar 
la respuesta a esa peticion , esto lo realizamos con el componente <Suspense /> que va a envolver 
a todo el componente. sus props mas relevantes:
  fallback: el componente a renderizar mientras esta carganado

 */

export const Navigation = () => {
  return (
    <Suspense fallback={<span>Cargando....</span>}>
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
    </Suspense>
  );
};
