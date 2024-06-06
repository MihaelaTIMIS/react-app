import React from "react";
// import { Route } from "react-router-dom";
// import asyncComponent from "util/asyncComponent";
import { ScrollToTopController } from "../../components/ScrollToTopController";
import ProductItem from "../ListProjects/ProductItem";

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <ScrollToTopController {...this.props} />
        <ProductItem history={this.props.history} welcome />
      </div >
    );
  }
}

export default (WelcomePage);
