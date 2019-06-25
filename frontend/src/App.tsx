import React from 'react';
import { QuoteTable } from './components/quote-table/quote-table'
import './App.scss';

import Quotes from './get-quotes.json';

export class App extends React.Component {
  render() {
    return (
      <div>
        <QuoteTable
          quotes={Quotes.results}
        />
      </div>
    );
  }
}
