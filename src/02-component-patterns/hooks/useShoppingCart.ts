import { useState } from "react";

import { ProductInCart, Product } from "../interfaces/interfaces";

export const useShoppingCart = () => {
  /* Voy usar un estado del carrito, lo defino como un objeto 
    con la id del producto como propiedad en vez de un array para poder acceder
    a las propiedades */

  const [shoppingCart, setShoppingCard] = useState<{
    [key: string]: ProductInCart;
  }>({});

  const onProductCountChange = ({
    count,
    product,
  }: {
    count: number;
    product: Product;
  }) => {
    setShoppingCard((oldShopingCart) => {
      if (count === 0) {
        const { [product.id]: toDelete, ...rest } = oldShopingCart;
        return rest;
      }

      return {
        ...oldShopingCart,
        [product.id]: { ...product, count },
      };
    });
  };

  return {
    shoppingCart,
    onProductCountChange,
  };
};
