import { ProductProvider } from "./products";
import { CartProvider } from "./cart";

const Providers = ({ children }) => {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  );
};

export default Providers;
