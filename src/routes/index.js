import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import PrivateRoute from "../components/PrivateRoute";


const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}welcome`} component={asyncComponent(() => import('./WelcomePage/index'))} />
      <Route path={`${match.url}roadmap`} component={asyncComponent(() => import('./RoadmapPage'))} />
      <Route path={`${match.url}login`} component={asyncComponent(() => import('./Login'))} />
      <Route path={`${match.url}loginWithLinkedin`} component={asyncComponent(() => import('./Login/LoginWithLinkedin'))} />
      <Route path={`${match.url}signup`} component={asyncComponent(() => import('./SignUP'))} />
      <Route path={`${match.url}projects/category/:id`} component={asyncComponent(() => import('./ListProjects'))} />
      <Route path={`${match.url}projects/search`} component={asyncComponent(() => import('./ListProjects/search'))} />
      <Route path={`${match.url}projects/result`} component={asyncComponent(() => import('./ListProjects'))} />

      <Route path={`${match.url}projects`} component={asyncComponent(() => import('./ListProjects'))} />
      <Route path={`${match.url}project/associate`} component={asyncComponent(() => import('./Project/associate'))} />

      <Route path={`${match.url}project/read`} component={asyncComponent(() => import('./Project/readonly'))} />
      <Route path={`${match.url}catalog`} component={asyncComponent(() => import('./Project/readonly'))} />

      <Route path={`${match.url}p/:minislug`} component={asyncComponent(() => import('./Project/readonly'))} />

      <PrivateRoute path={`${match.url}project/create`} component={asyncComponent(() => import('./Project/index'))} />
      <PrivateRoute path={`${match.url}project/update`} component={asyncComponent(() => import('./Project/update'))} />
      <PrivateRoute path={`${match.url}project/contribute`} component={asyncComponent(() => import('./Project/contribute'))} />
      <PrivateRoute path={`${match.url}project/student`} component={asyncComponent(() => import('./Project/student'))} />
      <PrivateRoute path={`${match.url}project/helper`} component={asyncComponent(() => import('./Project/helper'))} />
      <PrivateRoute path={`${match.url}user`} component={asyncComponent(() => import('./Profile'))} />
      <PrivateRoute path={`${match.url}user/archives`} component={asyncComponent(() => import('./Profile'))} />

      <Route path={`${match.url}confirmation/:active`} component={asyncComponent(() => import('./components/Confirmation'))} />
      <Route path={`${match.url}confirmation-inscription/`} component={asyncComponent(() => import('./components/ConfirmationInscription'))} />
      <Route path={`${match.url}confirmation-payment/`} component={asyncComponent(() => import('./../components/ReadProject/ConfirmationPayment'))} />
      <Route path={`${match.url}resetPassword/`} component={asyncComponent(() => import('./components/ResetPassword'))} />
      <Route path={`${match.url}profile`} component={asyncComponent(() => import('./Profile/ProfileUser'))} />

    </Switch>
  </div>
);

export default App;

