import { Router } from 'express';
import { getTopPlants, getPlantDetails } from '../controllers/plantController';

const router = Router();

router.get('/top', getTopPlants);
router.get('/:state', getPlantDetails);

export default router;

