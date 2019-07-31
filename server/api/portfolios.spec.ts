// import chai, { expect } from 'chai';
// import mongoose from 'mongoose';
import express, {Request, Response} from 'express';
import { withDb } from '../../spec/helpers/db-connect';
import { getPortfolios } from './portfolios';

// router.get('/',             getPortfolios);
// router.post('/',            createPortfolio);
// router.delete('/:id',       deletePortfolioById);
// router.get('/:id/holdings', getPortfolioHoldings);

describe('Portfolios API', withDb(() => {

  describe('get Portfolios', () => {
    describe('on success', () => {
      xit('returns a status 200', async () => {
        // const req = express.request.;
        // const result = getPortfolios()
      });
      xit('returns an array');
    });
    xdescribe('on failure', () => null);
  });

  describe('create Portfolio', () => {
    describe('on success', () => {
      xit('returns a status 200');
      xit('returns an array');
    });
    xdescribe('on failure', () => null);
  });

  describe('delete Portfolio by id', () => {
    describe('on success', () => {
      xit('returns a status 200');
      xit('returns an array');
    });
    xdescribe('on failure', () => null);
  });

  describe('get Portfolio Holdings', () => {
    describe('on success', () => {
      xit('returns a status 200');
      xit('returns an array');
    });
    xdescribe('on failure', () => null);
  });

}));
