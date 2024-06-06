import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import CircularProgress from "../CircularProgress";

class PrivateRoute extends React.Component {

  constructor(props) {
    super();
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    this.setState({ loading: true })
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  async componentDidMount() {
    this.mounted = true;
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading)
      return <CircularProgress />
    else {
      let { component: Component } = this.props;
      return (
        <Route
          {...this.props.rest}
          render={props =>
            props.isAuthenticated || localStorage.getItem('jwt') ? (
              <Component {...props} />
            ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }} />
              )} />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    state,
    isAuthenticated: state.auth.isAuthenticated
  }
}


export default connect(mapStateToProps, {})(PrivateRoute);


