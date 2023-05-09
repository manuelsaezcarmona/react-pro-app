import {
  ProductButtons,
  ProductCard,
  ProductImage,
  ProductTitle,
} from "../components";

import "../styles/custom-styles.css";
import { products } from "../data/products";

import { useShoppingCart } from "../hooks/useShoppingCart";

/* Como plantilla para realizar el interface , el ProductInCart seria de la siguiente
manera 
      {
    "1": { ...product1, count: 10 },
    "2": { ...product2, count: 2 },
  }
*/

export const ShoppingPage = () => {
  const { onProductCountChange, shoppingCart } = useShoppingCart();
  /*   Antiguo onChange 

const onProductCountChange = ({
    count,
    product,
  }: {
    count: number;
    product: Product;
  }) => {
    setShoppingCard((oldShopingCart) => {
      //  console.log("count", count);
      if (count === 0) {
        // Eliminacion de objetos mediante desuctructuracion, por un lado la propiedad (objeto que quiero eliminar)
        // y el resto del objeto
        const { [product.id]: toDelete, ...rest } = oldShopingCart;
        // console.log("deleted", toDelete);

        return rest;
      }

      return {
        ...oldShopingCart,
        [product.id]: { ...product, count },
      };
    });
    // console.log("onProdcutCountChange", count, product);
  }; */

  // console.log("shoppingCart", Object.entries(shoppingCart));
  return (
    <div>
      <h1>Shopping Store</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            className="bg-dark text-white"
            product={product}
            onChange={onProductCountChange}
            value={shoppingCart[product.id]?.count || 0}
          >
            <ProductImage className="custom-image" />
            <ProductTitle className="text-bold" />
            <ProductButtons className="custom-buttons" />
          </ProductCard>
        ))}
      </div>
      <div className="shopping-cart">
        {Object.entries(shoppingCart).length > 0 &&
          Object.entries(shoppingCart).map(([key, product]) => (
            <ProductCard
              key={key}
              className="bg-dark text-white"
              product={product}
              style={{
                width: "100px",
              }}
              value={product.count}
              onChange={onProductCountChange}
            >
              <ProductImage className="custom-image" />

              <ProductButtons
                className="custom-buttons"
                style={{ display: "flex", justifyContent: "center" }}
              />
            </ProductCard>
          ))}
      </div>
    </div>
  );
};
