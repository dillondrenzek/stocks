import React from 'react';
import * as MUI from '@material-ui/core';
import './App.scss';

import Quotes from './get-quotes.json';

export class App extends React.Component {
  render() {
    return (
      <div>
        <MUI.Table>
          <MUI.TableHead>
            <MUI.TableRow>
              <MUI.TableCell>Header</MUI.TableCell>
            </MUI.TableRow>
          </MUI.TableHead>
          <MUI.TableBody>
            <MUI.TableRow>
              <MUI.TableCell>Test</MUI.TableCell>
            </MUI.TableRow>
          </MUI.TableBody>
        </MUI.Table>
        <MUI.Link href='/'>
          Link
        </MUI.Link>
      </div>
    );
  }
}
