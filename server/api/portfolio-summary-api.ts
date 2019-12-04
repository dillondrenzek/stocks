import express, {Request, Response} from 'express';

// Router
const router = express();

// Routes
router.get('/', getPortfolioSummaryItems);


// API Methods

// Get PortfolioSummaryItems
export async function getPortfolioSummaryItems(req: Request, res: Response) {
  try {
    res.send('Success GET / Portfolio Summary items');
  } catch (err) {
    res.status(500).send('Error getting PortfolioSummaryItems: ' + err);
  }
}

export default router;
