"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlantDetailsService = exports.getTopPlantsService = void 0;
const db_1 = __importDefault(require("../db"));
const getTopPlantsService = async (limit) => {
    const { rows } = await db_1.default.query(`SELECT * FROM plants_info ORDER BY "Plant annual net generation (MWh)" DESC LIMIT $1`, [limit]);
    return rows;
};
exports.getTopPlantsService = getTopPlantsService;
const getPlantDetailsService = async (state) => {
    const { rows: stateRows } = await db_1.default.query(`SELECT * FROM state_info WHERE "State abbreviation" = $1`, [state]);
    const { rows: plantRows } = await db_1.default.query(`SELECT * FROM plants_info WHERE "Plant state abbreviation" = $1`, [state]);
    const stateData = stateRows[0];
    const plantData = plantRows.map(plant => ({
        ...plant,
        percentage: (plant["Plant annual net generation (MWh)"] / stateData["State annual net generation (MWh)"]) * 100
    }));
    return {
        state: stateData,
        plants: plantData
    };
};
exports.getPlantDetailsService = getPlantDetailsService;
