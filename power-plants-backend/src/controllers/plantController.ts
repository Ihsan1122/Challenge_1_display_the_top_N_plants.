import { Request, Response } from 'express';
import { getTopPlantsService, getPlantDetailsService } from '../services/plantService';

export const getTopPlants = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    const plants = await getTopPlantsService(Number(limit) || 10);
    res.json(plants);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An error occurred.' });
    }
  }
};

export const getPlantDetails = async (req: Request, res: Response) => {
  try {
    const { state } = req.params;
    const details = await getPlantDetailsService(state);
    res.json(details);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An error occurred.' });
    }
  }
};

