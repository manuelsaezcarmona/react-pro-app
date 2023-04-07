import styles from "../styles/styles.module.css";
import { CSSProperties, ReactElement } from "react";

import { useProduct } from "../hooks/useProduct";
import { createContext } from "react";
import { Product, ProductContextProps } from "../interfaces/interfaces";
// import { ProductTitle, ProductImage, ProductButtons } from "./index";
// 1.1 Definir en la interface que reciba children
// 1.2 children, puede tener un elemento o varios , por eso tambien indicamos que puede ser un array de children

export const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

/* El objetivo a conseguir es que el usuario componga un componente a traves de piezas 
que son otros componentes que se puedan añadir a este.
Para conseguir esto debemos de realizar:
1 - Que nuestro componente se convierta en un High Order Component (HOC) y reciba hijos (children)
 1.1 Definir en la interface que reciba children
*/

export interface ProductCardProps {
  children?: ReactElement | ReactElement[];
  product: Product;
  className?: string;
  style?: CSSProperties;
}

export const ProductCard = ({
  children,
  product,
  className,
  style,
}: ProductCardProps) => {
  const { counter, increaseBy } = useProduct();

  return (
    <Provider value={{ counter, increaseBy, product }}>
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children}
        {/* <ProductImage img={product.img} />

      <ProductTitle title={product.title} />

      <ProductButtons counter={counter} increaseBy={increaseBy} /> */}
      </div>
    </Provider>
  );
};

// Aqui añadimos una Nueva propiedad a ProductCard, que es Title, apuntando al componente ProductTitle etc...

// ProductCard.Title = ProductTitle;
// ProductCard.Image = ProductImage;
// ProductCard.Buttons = ProductButtons;
