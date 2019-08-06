import express, {Request, Response} from 'express';
import { PortfolioController } from '../../app/PortfolioController';

// Export Router
const controller = new PortfolioController();
const router = express();

// Routes
router.get('/',             getPortfolios);
router.post('/',            createPortfolio);
router.delete('/:id',       deletePortfolioById);
router.get('/:id/holdings', getPortfolioHoldings);
router.get('/:id/trades/stock', getStockTradesForPortfolio);
router.post('/:id/trades',  addTradeToPortfolio);

// API Methods

// Get Portfolios
export async function getPortfolios(req: Request, res: Response) {
  const portfolios = await controller.getPortfolios();
  res.json(portfolios);
}

// Create Portfolio
export async function createPortfolio(req: Request, res: Response) {
  const body = req.body;
  try {
    const portfolioName = body.name;
    const created = await controller.createPortfolioWithName(portfolioName);
    res.json(created);
  } catch (e) {
    res.status(500).send('Error creating portfolio: ' + e);
  }
}

// Delete Portfolio by Id
export async function deletePortfolioById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deleted = await controller.deletePortfolioById(id);
    res.json(deleted);
  } catch (e) {
    res.status(500).send('Error deleting portfolio: ' + e);
  }
}

// Get a Portfolio's Holdings
export async function getPortfolioHoldings(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const portfolio = await controller.getPortfolioById(id);
    const holdings = await controller.getHoldingsForPortfolio(portfolio);
    res.json(holdings);
  } catch (e) {
    res.status(500).send('Error getting holdings for portfolio: ' + e);
  }
}

// Add a Trade to Portfolio
export async function addTradeToPortfolio(req: Request, res: Response) {
  const { id } = req.params;
  const body = req.body;
  try {
    const portfolio = await controller.getPortfolioById(id);
    const added = await controller.addTradeToPortfolio(body, portfolio);
    res.json('Ok');
  } catch (e) {
    res.status(500).send('Error adding trade to portfolio: ' + e);
  }
}

// Get Portfolio's stock trades
export async function getStockTradesForPortfolio(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const trades = await controller.getStockTradesForPortfolioById(id);
    res.json(trades);
  } catch (e) {
    res.status(500).send('Error adding trade to portfolio: ' + e);
  }
}

export default router;
