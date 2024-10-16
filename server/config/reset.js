// server/config/reset.js
import { pool } from './database.js';
import fs from 'fs';

const createTables = async () => {
  try {
    // Drop existing tables
    await pool.query('DROP TABLE IF EXISTS custom_cars CASCADE');
    await pool.query('DROP TABLE IF EXISTS options CASCADE');

    // Create Options Table
    await pool.query(`
      CREATE TABLE options (
        id SERIAL PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        is_convertible_only BOOLEAN DEFAULT FALSE,
        is_non_convertible_only BOOLEAN DEFAULT FALSE
      );
    `);

    // Create CustomCars Table
    await pool.query(`
      CREATE TABLE custom_cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        is_convertible BOOLEAN NOT NULL,
        exterior_id INTEGER REFERENCES options(id),
        roof_id INTEGER REFERENCES options(id),
        wheels_id INTEGER REFERENCES options(id),
        interior_id INTEGER REFERENCES options(id),
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

const populateOptions = async () => {
  try {
    const optionsData = JSON.parse(fs.readFileSync('server/config/optionsData.json', 'utf-8'));

    for (const option of optionsData) {
      const {
        category,
        name,
        price,
        image_url,
        is_convertible_only,
        is_non_convertible_only,
      } = option;

      await pool.query(
        `
        INSERT INTO options (category, name, price, image_url, is_convertible_only, is_non_convertible_only)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
        [category, name, price, image_url, is_convertible_only, is_non_convertible_only]
      );
    }

    console.log('Options populated successfully');
  } catch (error) {
    console.error('Error populating options:', error);
  }
};

const resetDatabase = async () => {
  await createTables();
  await populateOptions();
  pool.end();
};

resetDatabase();
