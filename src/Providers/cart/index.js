import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const findProduct = cart.find((e) => item.id === e.id);
    if (!findProduct) {
      setCart([...cart, item]);
      localStorage.setItem("@Hamburgueria: cart", JSON.stringify(cart));
      toast.success("Produto adicionado com sucesso", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Produto repetido, tente outro", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const rmvToCart = (item) => {
    const newCart = cart.filter((itemInCart) => itemInCart.id !== item.id);
    localStorage.setItem("@Hamburgueria: cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, rmvToCart }}>
      {children}
    </CartContext.Provider>
  );
};
