const express = require('express');
const app = express();

const { Pool } = require('pg');
const pool = require('./dbConn');

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.listen(port, function() {
    console.log('Listening on port', port);
  });


//TEST TO GET EVERYTHING
app.get('/everything', (req, res, next) => {

    pool.query(`SELECT * FROM Users`, (err, result) => {
        if (err) {
        return next(err);
        }
        res.json(result.rows);
    })
})

app.post('/add', async (req, res) => {
    const { username, email } = req.body;
  
    try {
      await pool.query(
        `INSERT INTO Users (username, email, currentStreak, bestStreak) VALUES ($1, $2, NULL, NULL)`,
        [username, email]
      );
      res.status(201).json({ message: `User ${username}, and email ${email}, added successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  async function updateStreak(userId, isCorrect) {
    try {
      // Begin a transaction
      await pool.query('BEGIN');
  
      if (isCorrect) {
        // If the answer is correct, increment currentStreak
        await pool.query(
          `UPDATE Users
           SET currentStreak = currentStreak + 1
           WHERE user_id = $1`,
          [userId]
        );
  
        // Update bestStreak if currentStreak is higher
        await pool.query(
          `UPDATE Users
           SET bestStreak = currentStreak
           WHERE user_id = $1 AND currentStreak > bestStreak`,
          [userId]
        );
      } else {
        // If the answer is incorrect, reset currentStreak to 0
        await pool.query(
          `UPDATE Users
           SET currentStreak = 0
           WHERE user_id = $1`,
          [userId]
        );
      }
  
      // Commit the transaction
      await pool.query('COMMIT');
    } catch (error) {
      // Rollback the transaction in case of errors
      await pool.query('ROLLBACK');
      throw error;
    }
  }