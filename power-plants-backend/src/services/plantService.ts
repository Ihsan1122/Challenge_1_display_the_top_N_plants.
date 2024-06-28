import pool from '../db';

export const getTopPlantsService = async (limit: number) => {
  const { rows } = await pool.query(
    `SELECT * FROM plants_info ORDER BY "Plant annual net generation (MWh)" DESC LIMIT $1`, 
    [limit]
  );
  return rows;
};

export const getPlantDetailsService = async (state: string) => {
  const { rows: stateRows } = await pool.query(
    `SELECT * FROM state_info WHERE "State abbreviation" = $1`, 
    [state]
  );
  const { rows: plantRows } = await pool.query(
    `SELECT * FROM plants_info WHERE "Plant state abbreviation" = $1`, 
    [state]
  );

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

