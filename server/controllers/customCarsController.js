// server/controllers/customCarsController.js
import { pool } from '../config/database.js';

export const getAllCustomCars = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT cc.*, 
        ex.name AS exterior_name, ex.price AS exterior_price, ex.image_url AS exterior_image,
        ro.name AS roof_name, ro.price AS roof_price, ro.image_url AS roof_image,
        wh.name AS wheels_name, wh.price AS wheels_price, wh.image_url AS wheels_image,
        inr.name AS interior_name, inr.price AS interior_price, inr.image_url AS interior_image
      FROM custom_cars cc
      LEFT JOIN options ex ON cc.exterior_id = ex.id
      LEFT JOIN options ro ON cc.roof_id = ro.id
      LEFT JOIN options wh ON cc.wheels_id = wh.id
      LEFT JOIN options inr ON cc.interior_id = inr.id
      ORDER BY cc.created_at DESC
      `
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching custom cars:', error);
    res.status(500).json({ error: 'Failed to fetch custom cars' });
  }
};

export const getCustomCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT cc.*, 
        ex.name AS exterior_name, ex.price AS exterior_price, ex.image_url AS exterior_image,
        ro.name AS roof_name, ro.price AS roof_price, ro.image_url AS roof_image,
        wh.name AS wheels_name, wh.price AS wheels_price, wh.image_url AS wheels_image,
        inr.name AS interior_name, inr.price AS interior_price, inr.image_url AS interior_image
      FROM custom_cars cc
      LEFT JOIN options ex ON cc.exterior_id = ex.id
      LEFT JOIN options ro ON cc.roof_id = ro.id
      LEFT JOIN options wh ON cc.wheels_id = wh.id
      LEFT JOIN options inr ON cc.interior_id = inr.id
      WHERE cc.id = $1
      `,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Custom car not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching custom car:', error);
    res.status(500).json({ error: 'Failed to fetch custom car' });
  }
};

export const createCustomCar = async (req, res) => {
  const {
    name,
    isConvertible,
    exterior_id,
    roof_id,
    wheels_id,
    interior_id,
  } = req.body;

  try {
    // Validate incompatible options here (more on this in Step 8)

    // Calculate total price
    const priceResult = await pool.query(
      `
      SELECT SUM(price) AS total_price
      FROM options
      WHERE id = ANY($1::int[])
      `,
      [[exterior_id, roof_id, wheels_id, interior_id]]
    );

    const totalPrice = priceResult.rows[0].total_price || 0;

    const result = await pool.query(
      `
      INSERT INTO custom_cars 
        (name, is_convertible, exterior_id, roof_id, wheels_id, interior_id, total_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        name,
        isConvertible,
        exterior_id,
        roof_id,
        wheels_id,
        interior_id,
        totalPrice,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating custom car:', error);
    res.status(500).json({ error: 'Failed to create custom car' });
  }
};

export const updateCustomCar = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    isConvertible,
    exterior_id,
    roof_id,
    wheels_id,
    interior_id,
  } = req.body;

  try {
    // Validate incompatible options here

    // Calculate total price
    const priceResult = await pool.query(
      `
      SELECT SUM(price) AS total_price
      FROM options
      WHERE id = ANY($1::int[])
      `,
      [[exterior_id, roof_id, wheels_id, interior_id]]
    );

    const totalPrice = priceResult.rows[0].total_price || 0;

    const result = await pool.query(
      `
      UPDATE custom_cars
      SET name = $1,
          is_convertible = $2,
          exterior_id = $3,
          roof_id = $4,
          wheels_id = $5,
          interior_id = $6,
          total_price = $7
      WHERE id = $8
      RETURNING *
      `,
      [
        name,
        isConvertible,
        exterior_id,
        roof_id,
        wheels_id,
        interior_id,
        totalPrice,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Custom car not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating custom car:', error);
    res.status(500).json({ error: 'Failed to update custom car' });
  }
};

export const deleteCustomCar = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM custom_cars WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Custom car not found' });
    }
    res.status(200).json({ message: 'Custom car deleted successfully' });
  } catch (error) {
    console.error('Error deleting custom car:', error);
    res.status(500).json({ error: 'Failed to delete custom car' });
  }
};
