import React, { useEffect, useState } from 'react';
import * as Bootstrap from 'react-bootstrap';
import _ from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Container, Col, Row } from './shared';
import PortfolioPage from './components/portfolios/portfolio-page';

import { Portfolio } from './types';

import 'bootstrap/dist/css/bootstrap.min.css';


function Nav() {
  return (
    <Bootstrap.Navbar bg="light" expand="lg">
      <Bootstrap.Navbar.Brand>Stocks</Bootstrap.Navbar.Brand>
      <Bootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Bootstrap.Navbar.Collapse id="basic-navbar-nav">
        <Bootstrap.Nav className="mr-auto">
          <Bootstrap.Nav.Link as={Link} to='/'>
            Portfolios
          </Bootstrap.Nav.Link>
          {/* <Bootstrap.Nav.Link>
            <Link to='/about'>About</Link>
          </Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link>
            <Link to='/dashboard'>Dashboard</Link>
          </Bootstrap.Nav.Link> */}
        </Bootstrap.Nav>
      </Bootstrap.Navbar.Collapse>
    </Bootstrap.Navbar>
  );
}

export default function App() {

 

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <PortfolioPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}