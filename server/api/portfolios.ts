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

// API Methods

// Get Portfolios
async function getPortfolios(req: Request, res: Response) {
  const portfolios = await controller.getPortfolios();
  res.json(portfolios);
}

// Create Portfolio
async function createPortfolio(req: Request, res: Response) {
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
async function deletePortfolioById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deleted = await controller.deletePortfolioById(id);
    res.json(deleted);
  } catch (e) {
    res.status(500).send('Error deleting portfolio: ' + e);
  }
}

// Get a Portfolio's Holdings
async function getPortfolioHoldings(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const portfolio = await controller.getPortfolioById(id);
    const holdings = await controller.getHoldingsForPortfolio(portfolio);
    res.json(holdings);
  } catch (e) {
    res.status(500).send('Error getting holdings for portfolio: ' + e);
  }
}

export default router;
