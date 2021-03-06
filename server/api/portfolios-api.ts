import express, {Request, Response} from 'express';
import { PortfolioController } from '../../app/controllers/PortfolioController';

// Export Router
const router = express();

// Routes
router.get('/', getPortfolios);
router.post('/', createPortfolio);
router.post('/:id/delete', deletePortfolioById);
router.post('/:id/transactions',  addTransactionsToPortfolio);
router.post('/:id/transactions/:transactionId/delete', removeTransactionFromPortfolio);
router.get('/:id', getPortfolioById);


// API Methods

// Get Portfolios
export async function getPortfolios(req: Request, res: Response) {
  try {
    const portfolios = await PortfolioController.getPortfolios();
    res.json(portfolios);
  } catch (error) {
    res.status(500).send('Error creating portfolio: ' + error);
  }
}

// Create Portfolio
export async function createPortfolio(req: Request, res: Response) {
  const body = req.body;
  try {
    const portfolioName = body.name;
    const created = await PortfolioController.createPortfolioWithName(portfolioName);
    res.json(created);
  } catch (e) {
    res.status(500).send('Error creating portfolio: ' + e);
  }
}

// Get Portfolio By Id
export async function getPortfolioById(req: Request, res: Response) {
  const { params } = req;
  const { id } = params;
  try {
    const portfolio = await PortfolioController.getPortfolioById(id);
    res.json(portfolio);
  } catch (err) {
    res.status(500).send('Error getting portfolio: ' + err);
  }
}

// Delete Portfolio by Id
export async function deletePortfolioById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deleted = await PortfolioController.deletePortfolioById(id);
    res.json(deleted);
  } catch (e) {
    res.status(500).send('Error deleting portfolio: ' + e);
  }
}

// Add a Transaction to Portfolio
export async function addTransactionsToPortfolio(req: Request, res: Response) {
  const { id } = req.params;
  const body = req.body;
  console.log('Add transactions to portfolio:', id);
  console.log(' - body:', body);
  try {
    const added = await PortfolioController.addTransactionToPortfolio(body, id);
    res.json(added);
  } catch (e) {
    res.status(500).send('Error adding trade to portfolio: ' + e);
  }
}

// Removes a Transaction from a Portfolio
export async function removeTransactionFromPortfolio(req: Request, res: Response) {
  const { id, transactionId } = req.params;

  try {
    const updated = await PortfolioController.removeTransactionFromPortfolio(transactionId, id);
    res.json(updated);
  } catch (e) {
    res.status(500).send('Error removing transaction from portfolio: ' + e);
  }
}

export default router;
