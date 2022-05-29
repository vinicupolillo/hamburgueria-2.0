import Button from "../../components/button";
import Input from "../../components/input";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Services/api";
import { toast } from "react-toastify";
// import { Redirect } from "react-router-dom";
// import { Container } from "./style";
const Login = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Mínimo de 6 dígitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  function loginSubmit(data) {
    api
      .post("/login", data)
      .then((response) => {
        const { accessToken, user } = response.data;
        localStorage.setItem(
          "@Hamburgueria: token",
          JSON.stringify(accessToken)
        );
        localStorage.setItem("@Hamburgueria: user", JSON.stringify(user));
        setAuthenticated(true);
        toast.success("Sucesso ao logar na sua conta");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
    if (authenticated) {
      return history.push("/");
    }
  }

  return (
    <>
      <div>
        <header>
          <h1>Hamburgueria 2.0</h1>
          <Button onClick={() => history.push("/")}>Voltar</Button>
        </header>
        {/* <Container> */}
        <div>
          <h3>Login</h3>
          <form onSubmit={handleSubmit(loginSubmit)}>
            <Input
              register={register}
              label="email"
              placeholder="Digite seu Email"
              name="email"
              error={errors.email?.message}
            ></Input>
            <Input
              register={register}
              name="password"
              label="senha"
              placeholder="Digite aqui sua senha"
              type="password"
              error={errors.password?.message}
            ></Input>
            <Button type="submit">Logar</Button>
            <p>
              Crie sua conta para saborear muitas delicias e matar sua fome!
            </p>
            <Button onClick={() => history.push("./register")}>
              Cadastrar
            </Button>
          </form>
        </div>
        <div>
          <h1>Hamburgueria 2.0</h1>
          <div>
            <p>
              A vida é como um sanduíche, é preciso recheá-la com os{" "}
              <strong>melhores</strong> ingredientes
            </p>
          </div>
        </div>
        {/* </Container> */}
      </div>
    </>
  );
};

export default Login;
