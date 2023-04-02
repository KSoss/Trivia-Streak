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

//Get individual user through log in
app.post('/user/:email', async (req, res, next) => {

  const email = req.params.email
  const inputPassword = req.body.password;
  console.log(req.body)
  console.log(email, ' and ', inputPassword)
  
  try {
    const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email])
    const user = result.rows[0];

    if(!user) {
      return res.status(404).json({message: 'user not found'})
    }
    
    if (user.password === inputPassword) {
      res.json({ success: true, user })
    } else {
      res.json({ success: false, message: 'Incorrect password' });
    }

  } catch (error) {
    console.error(`error idk`, error);
    res.status(500).json({ message: 'idk bro'})
  }

})

app.post('/add', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      await pool.query(
        `INSERT INTO Users (username, email, password, currentStreak, bestStreak) VALUES ($1, $2, $3, NULL, NULL)`,
        [username, email, password]
      );

      const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email])
      const user = result.rows[0];

      res.json({ success: true, user })

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