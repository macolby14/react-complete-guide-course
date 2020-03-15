import React from "react";
import Layout from "./components/containers/Layout/Layout";
import BurgerBuilder from "./components/containers/BurgerBuilder/BuilderBurger";

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
