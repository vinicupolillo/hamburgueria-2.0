import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Cart from "../pages/cart";
import Login from "../pages/login";
import Register from "../pages/register";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="login">
        <Login />
      </Route>
      <Route path="register">
        <Register />
      </Route>
    </Switch>
  );
};

export default Routes;
