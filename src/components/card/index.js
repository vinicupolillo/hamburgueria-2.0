import Button from "../button";
import { Container } from "./style";
import { CartContext } from "../../Providers/cart";
import { useContext, useState } from "react";
import api from "../../Services/api";
import { toast } from "react-toastify";

const Card = ({ productList, inCart = false, inEdit = false }) => {
  const { addToCart, rmvToCart } = useContext(CartContext);
  const token = useState(localStorage.getItem("@Hamburgueria: token") || "");

  function dltProduct(product) {
    api
      .delete(`/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((response) => toast.success("Produto deletado"))
      .catch((err) =>
        toast.error("Algo de inesperado aconteceu, tente novamente")
      );
  }

  return (
    <Container>
      {productList.length !== 0 &&
        productList.map((e) => {
          return (
            <li key={e.id}>
              <figure>
                <img src={e.image} alt={e.name} />
              </figure>
              <p>{e.name}</p>
              <p>R${e.price}</p>
              <Button
                onClick={() => {
                  if (!inEdit) {
                    inCart ? rmvToCart(e) : addToCart(e);
                  } else {
                    dltProduct(e);
                  }
                }}
              >
                {inEdit
                  ? "Deletar"
                  : inCart
                  ? "Remover"
                  : "Adicionar ao Carrinho"}
              </Button>
            </li>
          );
        })}
    </Container>
  );
};

export default Card;
