import React, {Fragment, useState, useEffect} from 'react'
import TodoSubmit from './TodoSubmit'
import TodoItem from './TodoItem';

function Dashboard({setAuth}) {
    const [name, setName] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [completeUpdate, setCompleteUpdate] = useState(false); //Only purpose is to render screen again when the user clicks on complete
    
    //proxy gets ignored in deployment, uses heroku domain instead
    const getDetails = async() => {
        try {
            const response = await fetch("/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const userDetails = await response.json()
            setName(userDetails.user_name);
        } catch (error) {
            console.error(error.message)
        }
    }

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    const getTodos = async() => {
        try {
            const response = await fetch("/todo/", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const json = await response.json();
            setTodoList(json.reverse());
        } catch (error) {
            console.error(error.message);
        }
    }

    // Adds a new Todo into database, and calls GetTodo() to update local ToDoList
    const addTodo = async (todo) => {
        try {
            const response = await fetch("/todo/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(todo)
            });
            getTodos();
        } catch (error) {
            console.error(error.message);
        }
    }
    const removeTodo = async (id)=> {
        try {
            const response = await fetch(`/todo/${id}`, {
                method: "DELETE",
                headers: {token: localStorage.token}
            });
            const removeArr = todoList.filter(todo => todo.todo_id !== id)
            setTodoList(removeArr);
        } catch (error) {
            console.error(error.message);
        }
    }

    const completeTodo = async (todoToUpdate) => {
        try {
            const response = await fetch(`/todo/${todoToUpdate.todo_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(
                    {
                        description: todoToUpdate.description,
                        iscomplete: !todoToUpdate.iscomplete
                    }
                )
            })
            todoList.map(todo => {
                if (todo.todo_id === todoToUpdate.todo_id){
                    todo.iscomplete = !todo.iscomplete;
                    setCompleteUpdate(!completeUpdate);
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    }
    const toggleEditMode = (id) => {
        todoList.map(todo => {
            if (todo.todo_id === id){
                if (todo.isEdit === null){
                    todo.isEdit = true;
                }else{
                    todo.isEdit = !todo.isEdit;
                }
            }
            setCompleteUpdate(!completeUpdate);
            return todo;
        });
    }
    const updateTodo = async (updatedTodo) => {
        try {
            const response = await fetch(`/todo/${updatedTodo.todo_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(
                    {
                        description: updatedTodo.description,
                        iscomplete: updatedTodo.iscomplete
                    }
                )
            })
            todoList.map(todo => {
                if (todo.todo_id === updatedTodo.todo_id){
                    todo.description = updatedTodo.description;
                    todo.isEdit = !todo.isEdit;
                }
                setCompleteUpdate(!completeUpdate);
            });
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getDetails()
        getTodos();
    }, []);

    return (
        <Fragment>
        <p onClick = {logOut} id = "logout" className = "toggleAuth">Log Out</p>
            <h1>Hello, {name}.</h1>
            <TodoSubmit addTodo = {addTodo}/>
            <TodoItem 
            todoList = {todoList}
            removeTodo = {removeTodo}
            completeTodo={completeTodo}
            toggleEditMode={toggleEditMode}
            updateTodo = {updateTodo}
            />
            
        </Fragment>
    )
}

export default Dashboard
