    // server/controllers/optionsController.js
import { pool } from '../config/database.js';

export const getOptionsByCategory = async (req, res) => {
  const { category } = req.params;
  const { isConvertible } = req.query;

  try {
    let query = 'SELECT * FROM options WHERE category = $1';
    const params = [category];

    if (isConvertible === 'true') {
      query += ' AND is_non_convertible_only = FALSE';
    } else if (isConvertible === 'false') {
      query += ' AND is_convertible_only = FALSE';
    }

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching options:', error);
    res.status(500).json({ error: 'Failed to fetch options' });
  }
};

// New function to get an option by category and ID
export const getOptionById = async (req, res) => {
  const { category, id } = req.params;
  const optionId = parseInt(id, 10); // Parse id to integer
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(); // Capitalize category

  try {
    const result = await pool.query(
      'SELECT * FROM options WHERE category = $1 AND id = $2',
      [formattedCategory, optionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Option not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching option:', error);
    res.status(500).json({ error: 'Failed to fetch option' });
  }
};


