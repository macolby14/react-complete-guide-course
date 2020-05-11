import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./components/containers/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BuilderBurger";
import Logout from "./components/containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const asyncCheckout = asyncComponent(() => {
  return import("./components/containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./components/containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./components/containers/Auth/Auth");
});

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => {
      dispatch(actions.authCheckState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
