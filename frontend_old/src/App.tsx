import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import _ from 'lodash';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import PortfolioPage from './components/portfolios/portfolio-page';
import { AccountActivityPage } from './components/account-activity/account-activity-page';
import { PortfolioSummaryPage } from './components/portfolio-summary/portfolio-summary-page';
import { PdfImportsPage } from './components/pdf-imports/pdf-imports-page';


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
          <Bootstrap.Nav.Link as={Link} to='/account-activity'>
            Account Activity
          </Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link as={Link} to='/portfolio-summary'>
            Portfolio Summary
          </Bootstrap.Nav.Link>
          <Bootstrap.Nav.Link as={Link} to='/pdf-imports'>
            PDF Imports
          </Bootstrap.Nav.Link>
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
          <Route exact path='/account-activity'>
            <AccountActivityPage />
          </Route>
          <Route exact path='/portfolio-summary'>
            <PortfolioSummaryPage />
          </Route>
          <Route exact path='/pdf-imports'>
            <PdfImportsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}