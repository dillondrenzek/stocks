import express, {Request, Response} from 'express';
import { RobinhoodPdfController } from '../../app/controllers/RobinhoodPdfController';

// Router
const router = express();

// Routes
router.get('/', getPdfImports);
router.post('/:id/delete', deletePdfImportById);


// API Methods

// Get PdfImports
async function getPdfImports(req: Request, res: Response) {
  try {
    const items = await RobinhoodPdfController.getPdfImports();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error getting PdfImports: ' + err);
  }
}

// Delete PdfImport by id
async function deletePdfImportById(req: Request, res: Response) {
  try {
    const id = req.params['id'];
    await RobinhoodPdfController.deletePdfImportById(id);
    res.send('Ok');
  } catch (error) {
    res.status(500).send('Error deleting pdf import by id: ' + error);
  }
}

export default router;
