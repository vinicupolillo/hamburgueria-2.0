import Button from "../../components/button";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { Container, Maincontainer } from "./style";
import Card from "../../components/card";
import { CartContext } from "../../Providers/cart";

const Cart = () => {
  const history = useHistory();
  const { cart } = useContext(CartContext);
  return (
    <>
      <header>
        <Container>
          <Button onClick={() => history.push("/")}>Voltar</Button>
          <h1>Hamburgueria 2.0</h1>
          <div>
            <Button onClick={() => history.push("/cart")}>Carrinho</Button>
            <Button onClick={() => history.push("/login")}>Entrar</Button>
          </div>
        </Container>
      </header>
      <Maincontainer>
        <div>
          <Card productList={cart} inCart />
        </div>
        <div>
          <p>Preço Total</p>
          <span>{cart.reduce((prev, curr) => prev + curr.price, 0)}</span>
        </div>
      </Maincontainer>
    </>
  );
};

export default Cart;
