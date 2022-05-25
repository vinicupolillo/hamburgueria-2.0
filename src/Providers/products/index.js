import { createContext, useState } from "react";
import { products } from "./products";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product] = useState(products);

  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
};
