import express, {Request, Response} from 'express';
import { AccountActivityController } from '../../app/controllers/AccountActivityController';

// Router
const router = express();

// Routes
router.get('/', getAccountActivityItems);


// API Methods

// Get Account Activity Items
export async function getAccountActivityItems(req: Request, res: Response) {
  try {
    const items = await AccountActivityController.getAccountActivityItems();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error getting AccountActivityItems: ' + err);
  }
}

export default router;
