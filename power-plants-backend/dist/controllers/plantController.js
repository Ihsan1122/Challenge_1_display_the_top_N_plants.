"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlantDetails = exports.getTopPlants = void 0;
const plantService_1 = require("../services/plantService");
const getTopPlants = async (req, res) => {
    try {
        const { limit } = req.query;
        const plants = await (0, plantService_1.getTopPlantsService)(Number(limit) || 10);
        res.json(plants);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An error occurred.' });
        }
    }
};
exports.getTopPlants = getTopPlants;
const getPlantDetails = async (req, res) => {
    try {
        const { state } = req.params;
        const details = await (0, plantService_1.getPlantDetailsService)(state);
        res.json(details);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An error occurred.' });
        }
    }
};
exports.getPlantDetails = getPlantDetails;
