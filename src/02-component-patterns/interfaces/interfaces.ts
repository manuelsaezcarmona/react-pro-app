import { ProductCardProps } from "../components/ProductCard";
import { Props as ProductTitleProps } from "../components/ProductTitle";
import { Props as ProductImageProps } from "../components/ProductImage";
import { Props as ProcuctButtonProps } from "../components/ProductButtons";
export interface Product {
  id: string;
  title: string;
  img?: string;
}

export interface ProductContextProps {
  counter: number;
  increaseBy: (value: number) => void;
  product: Product;
}

/* Para no tener que estar duplicando interfaces , 
   tanto si es cuando usamos el patron <ProductTitle, como para cuando usamos 
   hijos <ProductTitle /> o "subcomponentes" <Product.Title />  vamos a importar
   las interfaces Props de los componentes al High Order Component (HOC)  y se las
   pasamos a los subcomponentes como todas las hemos llamado Props pues usamos los
   alias para renombrarla*/

/* export interface ProductCardHOCProps {
  ({ children, product }: ProductCardProps): JSX.Element;
  Title: (Props: { title?: string; className?: string }) => JSX.Element;
  Image: (Props: { img?: string; className?: string }) => JSX.Element;
  Buttons: (Props: { className?: string }) => JSX.Element;
} */
export interface ProductCardHOCProps {
  ({ children, product }: ProductCardProps): JSX.Element;
  Title: (Props: ProductTitleProps) => JSX.Element;
  Image: (Props: ProductImageProps) => JSX.Element;
  Buttons: (Props: ProcuctButtonProps) => JSX.Element;
}
