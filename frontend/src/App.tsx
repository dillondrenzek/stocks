import React from 'react';
import * as MUI from '@material-ui/core';
import './App.scss';

import Quotes from './get-quotes.json';

export class App extends React.Component {
  render() {
    return (
      <MUI.Container>
        <MUI.Grid container spacing={3}>

          <MUI.Grid item xs={12}>
            test
          </MUI.Grid>

          <MUI.Grid item xs={12}>

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

          </MUI.Grid>
          
        </MUI.Grid>
        {/* 
        <MUI.Link href='/'>
          Link
        </MUI.Link> */}
      </MUI.Container>
    );
  }
}
