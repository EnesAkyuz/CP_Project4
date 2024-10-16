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
