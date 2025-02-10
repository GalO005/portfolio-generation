import { Router } from 'express';
import portfolioRoutes from './portfolio';

const router = Router();

router.use('/portfolio', portfolioRoutes);

export default router;