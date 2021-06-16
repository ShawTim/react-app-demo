import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { Container } from 'react-bootstrap';

import { history } from '@base/app/store';
import Home from '@pages/Home';
import Repos from '@pages/Repos';
import Files from '@pages/Files';
import ErrorBar from '@components/ErrorBar';

import './App.scss';

const App = () => {
  return (
    <Container fluid="sm">
      <ErrorBar />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/repos/:username" render={() => <Repos />} />
          <Route exact path="/files/:username/:repo" render={() => <Files />} />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </ConnectedRouter>
    </Container>
  );
}

export default App;
