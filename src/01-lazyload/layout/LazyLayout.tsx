import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { LazyPage1, LazyPage2, LazyPage3 } from "../pages";

export const LazyLayout = () => {
  /* Este componente contendra el "cascaron" con el que a partir de aqui se renderizaran 
    dentro de este, otros componentes, como por ejemplo un dashboard una sidebar etc.. actua 
    a mode de plantilla. Para que renderice el contenido este Layout debe de contener los 
    routes que dirijan a esos componentes.  */

  return (
    <div>
      <h1>Lazy Layout</h1>
      <ul>
        <li>
          <NavLink
            to={"lazy1"}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
          >
            Lazy 1
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"lazy2"}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
          >
            Lazy 2
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"lazy3"}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
          >
            Lazy 3
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="lazy1" element={<LazyPage1 />} />
        <Route path="lazy2" element={<LazyPage2 />} />
        <Route path="lazy3" element={<LazyPage3 />} />
        <Route path="*" element={<Navigate replace to="lazy1" />} />
      </Routes>
    </div>
  );
};

export default LazyLayout;
