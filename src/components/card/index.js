import Button from "../button";
import { Container } from "./style";
import { CartContext } from "../../Providers/cart";
import { useContext } from "react";

const Card = ({ productList, inCart = false }) => {
  const { addToCart, rmvToCart } = useContext(CartContext);

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
              <Button onClick={() => (inCart ? rmvToCart(e) : addToCart(e))}>
                {inCart ? "Remover" : "Adicionar ao Carrinho"}
              </Button>
            </li>
          );
        })}
    </Container>
  );
};

export default Card;
