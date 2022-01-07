const pool = require('../../db');
const bcrypt = require('bcryptjs')
const router = require('express').Router();
const jwtGenerator = require('../utils/jwtGenerator.js')
const authorisation = require("../middleware/authorisation");

//register route

router.post('/register', async(req, res) => {
    try {
        //1. destructure req.body (name, email, password)
        const {user_name,  user_password} = req.body;

        //2. check if user exists
        const user = await pool.query(
            "SELECT * FROM users WHERE user_name = $1", [user_name]
        )

        //2 a. user exists, throw error
        if (user.rows.length !== 0 ){
            return res.status(401).send("User already exists")
        }
        //3. Bcrypt the user password
        const  saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword =  await bcrypt.hash(user_password, salt);

        //4. Enter new user inside database

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *" , [user_name, bcryptPassword]
        )
        //5. Generate JWT token

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error");
    }
})

//login route

router.post("/login", async (req, res) => {
    try {
        //1. destructure the req.body
        const {user_name, user_password} = req.body;
        //2. Check of user exists
        const user = await pool.query(
            "SELECT * FROM users WHERE user_name = $1", [user_name]
        )
        //2a. If not, throw err
        if (user.rows.length === 0){
            return res.status(401).json("Invalid login credentials");
        }

        //3. Check if password is correct
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password); //returns bool
        
        //3a. If not, throw err
        if (!validPassword){
            return res.status(401).json("Invlaid login credentials");
        }
        //4. Give a JWT token 
        const token = jwtGenerator(user.rows[0].user_id)
        console.log(`User ${user_name} logged in`)
        res.json({token});
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error");
    }
})

router.get("/is-verify", authorisation, async (req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error");
    }
})

module.exports = router;
