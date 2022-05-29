import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "../../components/button";
import Card from "../../components/card";
import Input from "../../components/input";
import api from "../../Services/api";
import { Container, MainContainer } from "./style";

const Dashboard = ({ authenticated, setAuthenticated }) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const token =
    useState(JSON.parse(localStorage.getItem("@Hamburgueria: token"))) || "";
  const [product, setProduct] = useState([]);
  const [user] = useState(
    JSON.parse(localStorage.getItem("@Hamburgueria: user")) || ""
  );
  function loadProducts() {
    if (user) {
      api
        .get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            completed: false,
          },
        })
        .then((response) => setProduct(response.data))
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }
  useEffect(() => loadProducts(), [product]);
  function registerProduct(data) {
    console.log(data);
    api
      .post("/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((response) => setProduct(response.data))
      .catch((err) => console.log(err));
  }
  if (!authenticated) {
    return history.push("/login");
  }
  return (
    <>
      <header>
        <Container>
          <h1>Hamburgueria 2.0</h1>
          <div>
            {/* <Input placeholder="Pesquisar"></Input> */}
            <Button onClick={() => history.push("/cart")}>Carrinho</Button>
            <Button
              onClick={() => {
                localStorage.clear();
                history.push("/login");
                setAuthenticated(false);
              }}
            >
              Sair
            </Button>
          </div>
        </Container>
      </header>
      <MainContainer>
        <div>
          <Card productList={product} inEdit />
        </div>
      </MainContainer>
      <aside>
        <h2>Adicionar Produto</h2>
        <form onSubmit={handleSubmit(registerProduct)}>
          <Input
            placeholder="Nome do produto"
            name="name"
            register={register}
          ></Input>
          <Input
            placeholder="Preço do produto"
            name="price"
            register={register}
          ></Input>
          <Input
            placeholder="Link da imagem"
            name="image"
            register={register}
          ></Input>
          <Button type="submit">Cadastrar produto</Button>
        </form>
      </aside>
    </>
  );
};

export default Dashboard;
