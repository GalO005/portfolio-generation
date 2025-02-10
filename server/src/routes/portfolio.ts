import { Router } from 'express';

const portfolioRouter = Router();

portfolioRouter.post('/generate', (req, res) => {
  res.json({ message: 'List of portfolios' });
});

export default portfolioRouter;