import express, {Request, Response} from 'express';
import { PortfolioController } from '../app/controllers/PortfolioController';

// Export Router
const router = express();

// Routes
router.get('/',   getPortfolios);
router.post('/',  createPortfolio);
// router.post('/:id/delete',       deletePortfolioById);
// router.get('/:id/holdings', getPortfolioHoldings);
// router.get('/:id/trades/stock', getStockTradesForPortfolio);
// router.post('/:portfolioId/trades/:tradeId/delete', deleteStockTradeForPortfolio);
// router.post('/:id/trades',  addTradeToPortfolio);

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

// // Delete Portfolio by Id
// export async function deletePortfolioById(req: Request, res: Response) {
//   const { id } = req.params;
//   try {
//     const deleted = await controller.deletePortfolioById(id);
//     res.json(deleted);
//   } catch (e) {
//     res.status(500).send('Error deleting portfolio: ' + e);
//   }
// }

// // Get a Portfolio's Holdings
// // export async function getPortfolioHoldings(req: Request, res: Response) {
// //   const { id } = req.params;
// //   try {
// //     const portfolio = await controller.getPortfolioById(id);
// //     const holdings = await controller.getHoldingsForPortfolio(portfolio);
// //     res.json(holdings);
// //   } catch (e) {
// //     res.status(500).send('Error getting holdings for portfolio: ' + e);
// //   }
// // }

// // Add a Trade to Portfolio
// export async function addTradeToPortfolio(req: Request, res: Response) {
//   const { id } = req.params;
//   const body = req.body;
//   try {
//     const portfolio = await controller.getPortfolioById(id);
//     console.log('add trade:', body);
//     const added = await controller.addTradeToPortfolio(body, portfolio.id);
//     res.json(added);
//   } catch (e) {
//     res.status(500).send('Error adding trade to portfolio: ' + e);
//   }
// }

// // Get Portfolio's stock trades
// export async function getStockTradesForPortfolio(req: Request, res: Response) {
//   const { id } = req.params;
//   try {
//     const trades = await controller.getStockTradesForPortfolioById(id);
//     res.json(trades);
//   } catch (e) {
//     res.status(500).send('Error getting stock trades for portfolio: ' + e);
//   }
// }

// export async function deleteStockTradeForPortfolio(req: Request, res: Response) {
//   const { portfolioId, tradeId } = req.params;
//   try {
//     await controller.deleteStockTradeForPortfolioById(tradeId, portfolioId);
//     res.status(200).send('Ok');
//   } catch (e) {
//     res.status(500).send('Error deleting trade to portfolio: ' + e);
//   }
// }

export default router;
