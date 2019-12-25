import express, {Request, Response} from 'express';
import { RobinhoodPdfController } from '../../app/controllers/RobinhoodPdfController';

// Router
const router = express();

// Routes
router.get('/', getPdfImports);


// API Methods

// Get PortfolioSummaryItems
export async function getPdfImports(req: Request, res: Response) {
  try {
    const items = await RobinhoodPdfController.getPdfImports();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error getting PdfImports: ' + err);
  }
}

export default router;
