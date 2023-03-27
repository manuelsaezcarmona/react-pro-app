import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";
import { lazy, LazyExoticComponent } from "react";

/*  En cel interface mi component puede ser de 2 tipos: 
 () => JSX.Element o React.LazyExoticComponent<() => JSX.Element> 
 podria meterlo en el interface Route indicando uno u otro en la linea:
 Component: () => JSX.Element | React.LazyExoticComponent<() => JSX.Element>

 Pero queda mas claro y legible si me defino un tipo que sea una funcion

 */

export type JSXComponent = () => JSX.Element;

export interface Route {
  to: string;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}

/* LazyLoad: Se trata de un componente que el navegador va a cargar solo si se le pide
esto es bueno para que las aplicaciones muy grandes solo cargen del servidor aquellas partes que 
se usan. Por ejemplo: Solo cargara la aplicación si el usuario se ha logeado , si no está logeado 
el navegador solo cargara el modulo del login.
Una buena estrategia de implementacion es realizar esta "carga perezosa" por moldulos por ejemplo:
en compras, ventas, usuarios etc... */

/* Para realizar eso React nos proporciona un metodo llamado lazy()  */

// 1 - creacmos una funcion que Importe este componente con el metodo lazy de React.
// Nota para trabajar con lazy los componentes se deben de exportar por defecto
// Para cambiar los nombres de los chunks debes de usar el patron de los asteriscos para que los
// interprete webpack
const Lazy1 = lazy(
  () =>
    import(/*webpackChunkName: "LazyPage1"*/ "../01-lazyload/pages/LazyPage1")
);
const Lazy2 = lazy(
  () =>
    import(/*webpackChunkName: "LazyPage2"*/ "../01-lazyload/pages/LazyPage2")
);
const Lazy3 = lazy(
  () =>
    import(/*webpackChunkName: "LazyPage3"*/ "../01-lazyload/pages/LazyPage3")
);

// Ahora el componente lazy es un LazyComponent React.LazyExoticComponent<() => JSX.Element>

export const routes: Route[] = [
  {
    to: "/lazy1",
    path: "lazy1",
    Component: Lazy1,
    name: "Lazy - 1",
  },
  {
    to: "/lazy2",
    path: "lazy2",
    Component: Lazy2,
    name: "Lazy - 2",
  },
  {
    to: "/lazy3",
    path: "lazy3",
    Component: Lazy3,
    name: "Lazy - 3",
  },
];
