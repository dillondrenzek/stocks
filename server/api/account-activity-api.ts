import express, {Request, Response} from 'express';

// Router
const router = express();

// Routes
router.get('/', getAccountActivityItems);


// API Methods

// Get Account Activity Items
export async function getAccountActivityItems(req: Request, res: Response) {
  try {
    res.send('Success GET /');
  } catch (err) {
    res.status(500).send('Error getting AccountActivityItems: ' + err);
  }
}

export default router;
