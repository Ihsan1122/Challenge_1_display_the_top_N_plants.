"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plantController_1 = require("../controllers/plantController");
const router = (0, express_1.Router)();
router.get('/top', plantController_1.getTopPlants);
router.get('/:state', plantController_1.getPlantDetails);
exports.default = router;
