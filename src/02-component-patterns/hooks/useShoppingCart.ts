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
      const productInCard: ProductInCart = oldShopingCart[product.id] || {
        ...product,
        count: 0,
      };

      // funcion incrementar
      if (Math.max(productInCard.count + count, 0) > 0) {
        productInCard.count += count;
        return { ...oldShopingCart, [product.id]: productInCard };
      }

      // Borrar el producto
      const { [product.id]: toDelete, ...rest } = oldShopingCart;
      return { ...rest };
    });
  };

  return { shoppingCart, onProductCountChange };
};
