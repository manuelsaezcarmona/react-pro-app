import styles from "../styles/styles.module.css";
import noImage from "../assets/no-image.jpg";

import { useProduct } from "../hooks/useProduct";
import { createContext, ReactElement, useContext } from "react";
// 1.1 Definir en la interface que reciba children
// 1.2 children, puede tener un elemento o varios , por eso tambien indicamos que puede ser un array de children
interface Props {
  children?: ReactElement | ReactElement[];
  product: Product;
}

interface Product {
  id: string;
  title: string;
  img?: string;
}

interface ProductContextProps {
  counter: number;
  increaseBy: (value: number) => void;
  product: Product;
}

const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

export const ProductImage = ({ img = "" }) => {
  const { product } = useContext(ProductContext);

  let imgToShow: string;

  if (img) {
    imgToShow = img;
  } else if (product.img) {
    imgToShow = product.img;
  } else {
    imgToShow = noImage;
  }

  return <img className={styles.productImg} src={imgToShow} alt="Product" />;
};

export const ProductTitle = ({ title }: { title?: string }) => {
  const { product } = useContext(ProductContext);

  return (
    <span className={styles.productDescription}>
      {title ? title : product.title}
    </span>
  );
};

export const ProductButtons = () => {
  const { counter, increaseBy } = useContext(ProductContext);

  return (
    <div className={styles.buttonsContainer}>
      <button className={styles.buttonMinus} onClick={() => increaseBy(-1)}>
        {" "}
        -{" "}
      </button>
      <div className={styles.countLabel}>{counter}</div>
      <button className={styles.buttonAdd} onClick={() => increaseBy(+1)}>
        {" "}
        +{" "}
      </button>
    </div>
  );
};

/* El objetivo a conseguir es que el usuario componga un componente a traves de piezas 
que son otros componentes que se puedan añadir a este.
Para conseguir esto debemos de realizar:
1 - Que nuestro componente se convierta en un High Order Component (HOC) y reciba hijos (children)
 1.1 Definir en la interface que reciba children
*/

export const ProductCard = ({ children, product }: Props) => {
  const { counter, increaseBy } = useProduct();

  return (
    <Provider value={{ counter, increaseBy, product }}>
      <div className={styles.productCard}>
        {children}
        {/* <ProductImage img={product.img} />

      <ProductTitle title={product.title} />

      <ProductButtons counter={counter} increaseBy={increaseBy} /> */}
      </div>
    </Provider>
  );
};

// Aqui añadimos una Nueva propiedad a ProductCard, que es Title, apuntando al componente ProductTitle etc...

ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Buttons = ProductButtons;
