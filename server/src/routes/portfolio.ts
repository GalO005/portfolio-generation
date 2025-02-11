import { Router } from 'express';
import  portfolioHandling from '../controllers/portfolioController';
const portfolioRouter = Router();

portfolioRouter.post('/generate', portfolioHandling);

export default portfolioRouter;