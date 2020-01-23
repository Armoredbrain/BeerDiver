import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import BeersList from './components/BeersList';
import BeerDetail from './components/BeerDetail';
import Header from './components/Header'
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <Container>
      <Router>
        <Header />
        <Switch>
            <Route exact path="/" component={BeersList} />
            <Route exact path="/:id" component={BeerDetail} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
