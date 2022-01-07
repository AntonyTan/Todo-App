const router = require("express").Router();
const pool = require('../../db');
const authorisation = require("../middleware/authorisation");


router.get("/", authorisation, async (req, res) => {
    try {
        //req.user has the payload now, which is just user_id
        //console.log(req.user);
        const user = await pool.query(
            "SELECT user_id, user_name  FROM users WHERE user_id = $1", [req.user]
        )
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error")
    }
})

module.exports = router;