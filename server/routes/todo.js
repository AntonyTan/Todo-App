const router = require("express").Router();
const pool = require('../../db');
const authorisation = require("../middleware/authorisation");


// Add a todo
router.post("/",  authorisation, async(req, res) => {
    try {
        console.log(req.body);
        const {description, iscomplete} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (description, isComplete, user_id) VALUES($1, $2, $3) RETURNING *",
             [description, iscomplete, req.user]
             );
        res.json(newTodo.rows[0]);
    } catch (error) {
        res.send("Post Failed");
        console.error(error.message) ;       
    }
})

//Get all todos

router.get("/",  authorisation, async(req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todos WHERE user_id = $1", [req.user]
            );
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message)
    }
})

//Get a Todo
router.get("/:id", authorisation, async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todos WHERE todo_id = $1 AND user_id = $2",
        [id, req.user]
        )
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message)
    }
})

//Update a Todo

router.put("/:id", authorisation, async(req, res) => {
    try {
        const {id} = req.params;
        const {description, iscomplete} = req.body;
        const updateTodo = await pool.query(
            "UPDATE todos SET description = $1, iscomplete = $2 WHERE todo_id = $3 and user_id = $4 RETURNING *",
            [description, iscomplete, id, req.user]
            );
        res.json(updateTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

//Delete a Todo

router.delete("/:id", authorisation, async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todos WHERE todo_id = $1 and user_id = $2 RETURNING *",
            [id, req.user]    
        )
        res.json(deleteTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router;