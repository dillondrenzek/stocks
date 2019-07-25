import express, {Request, Response} from 'express';
import { PortfolioController } from '../../app/PortfolioController';

// Export Router
const controller = new PortfolioController();
const router = express();

// Get Portfolios
router.get('/', async (req: Request, res: Response) => {
  const portfolios = await controller.getPortfolios();
  res.json(portfolios);
});

// Create Portfolio
router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const portfolioName = body.name;
    const created = await controller.createPortfolioWithName(portfolioName);
    res.json(created);
  } catch (e) {
    res.status(500).send('Error creating portfolio: ' + e);
  }
});

// Delete Portfolio by Id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await controller.deletePortfolioById(id);
    res.json(deleted);
  } catch (e) {
    res.status(500).send('Error deleting portfolio: ' + e);
  }
});

router.get('/:id/holdings', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const portfolio = await controller.getPortfolioById(id);
    const holdings = await controller.getHoldingsForPortfolio(portfolio);
    res.json(holdings);
  } catch (e) {
    res.status(500).send('Error getting holdings for portfolio: ' + e);
  }
});

export default router;
