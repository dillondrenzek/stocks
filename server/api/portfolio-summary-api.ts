import express, {Request, Response} from 'express';
import {PortfolioSummaryController} from '../../app/controllers/PortfolioSummaryController';

// Router
const router = express();

// Routes
router.get('/', getPortfolioSummaryItems);


// API Methods

// Get PortfolioSummaryItems
export async function getPortfolioSummaryItems(req: Request, res: Response) {
  try {
    const items = await PortfolioSummaryController.getPortfolioSummaryItems();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error getting PortfolioSummaryItems: ' + err);
  }
}

export default router;
