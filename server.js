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

//Get individual user through log in. Using post since I keep hearing online it's more secure? Idk
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

//Post to add new user through the register button
app.post('/add', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      await pool.query(
        `INSERT INTO Users (username, email, password, currentStreak, bestStreak) VALUES ($1, $2, $3, 0, 0)`,
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

// Updates streak after correct/inccorrect response
app.put('/user/update/:email', async (req, res) => {
  try {
    const { currentStreak, bestStreak } = req.body
    const email = req.params.email;
    await pool.query(`UPDATE users 
      SET currentStreak = $1, bestStreak = $2
      WHERE email = $3`, [currentStreak, bestStreak, email]
    );
    res.status(200).json({ message: 'Streaks updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

// Leaderboard update and get
app.get('/leaderboard', (req, res, next) => {
  pool.query(`SELECT * FROM Users ORDER BY bestStreak DESC LIMIT 10`, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result.rows);
  });
});