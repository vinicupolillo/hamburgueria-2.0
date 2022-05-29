import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../Providers/products";
import { Container, MainContainer } from "./style";
import Button from "../../components/button";
import Card from "../../components/card";
import Input from "../../components/input";

const Home = ({ authenticated }) => {
  const product = useContext(ProductContext);
  const history = useHistory();

  return (
    <>
      <header>
        <Container>
          <h1>Hamburgueria 2.0</h1>
          <div>
            {/* <Input placeholder="Pesquisar"></Input> */}
            <Button onClick={() => history.push("/cart")}>Carrinho</Button>
            <Button onClick={() => history.push("/login")}>Entrar</Button>
            <Button
              onClick={() => {
                authenticated
                  ? history.push("/dashboard")
                  : history.push("/login");
              }}
            >
              Meus produtos
            </Button>
          </div>
        </Container>
      </header>
      <MainContainer>
        <div>
          <Card productList={product} />
        </div>
      </MainContainer>
    </>
  );
};

export default Home;
