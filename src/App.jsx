import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/containers/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BuilderBurger";
import Checkout from "./components/containers/Checkout/Checkout";
import Orders from "./components/containers/Orders/Orders";
import Auth from "./components/containers/Auth/Auth";
import Logout from "./components/containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends React.Component {
  componentDidMount() {
    console.log("App Mounted");
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
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
      console.log("Dispatching authCheckState");
      dispatch(actions.authCheckState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
