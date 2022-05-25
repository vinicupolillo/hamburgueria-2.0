import Button from "../../components/button/Button";
import Input from "../../components/input";
import { useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../Services/api";
import { Container } from "./style";

const Register = ({ authenticated }) => {
  const history = useHistory();
  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Minimo de 6 digitos"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Senhas não combinam"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  function registerSubmit(data) {
    api
      .post("/users", data)
      .then((_) => toast.success("Sucesso ao criar sua conta "))
      .catch((err) => toast.error("Erro ao criar a conta, tente novamente"));
    if (authenticated) {
      return <Redirect to="/" />;
    }
  }

  return (
    <>
      <div>
        <Container>
          <div>
            <h1>Hamburgueria 2.0</h1>
            <div>
              <p>
                A vida é como um sanduíche, é preciso recheá-la com os{" "}
                <strong>melhores</strong> ingredientes
              </p>
            </div>
          </div>
          <div>
            <h3>Cadastro</h3>
            <Button onClick={() => history.push("/login")}>
              Retornar para o login
            </Button>
            <form onSubmit={handleSubmit(registerSubmit)}>
              <Input
                register={register}
                label="Nome"
                placeholder="Digite seu nome"
                name="name"
                error={errors.name?.message}
              ></Input>
              <Input
                register={register}
                label="email"
                placeholder="Digite seu Email"
                name="email"
                error={errors.email?.message}
              ></Input>
              <Input
                register={register}
                label="senha"
                placeholder="Digite sua senha"
                type="password"
                name="password"
                error={errors.password?.message}
              ></Input>
              <Input
                register={register}
                name="passwordConfirm"
                label="Confirmar senha"
                placeholder="Digite novamente sua senha"
                type="password"
                error={errors.passwordConfirm?.message}
              ></Input>

              <Button type="submit">Cadastrar</Button>
              <p>
                Crie sua conta para saborear muitas delicias e matar sua fome!
              </p>
              <Button onClick={() => history.push("./register")}>
                Cadastrar
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Register;
