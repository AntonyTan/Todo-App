import React, {useState} from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import {TiTickOutline} from 'react-icons/ti';
import { AiFillEdit } from 'react-icons/ai'

function TodoItem({todoList, completeTodo, removeTodo, toggleEditMode, updateTodo}) {
    const [newValue, setNewValue] = useState("");

    const handleSubmit = (e, todo) => {
        e.preventDefault();
        updateTodo({
                todo_id: todo.todo_id,
                description: newValue,
                iscomplete: todo.iscomplete
            });
        setNewValue('');
    }
    const handleChange = (e) => {
        setNewValue(e.target.value);
    }

    return(
        <div className ='todo-list'>
            {todoList.map((todo,index) => (
                <div key = {index} className = {todo.iscomplete === true ? 'todo-row complete' : 'todo-row'}>
                    <div>{
                    todo.isEdit? 
                    <form onSubmit = {(e) =>{handleSubmit(e, todo);}}>
                        <input
                            type = "text"
                            placeholder = "Edit your todo"
                            name = "todo input edit"
                            className = "todo-input-edit"
                            value = {newValue}
                            onChange = {handleChange}
                        >
                        </input>
                    </form>
                    : todo.description}
                </div>
                <div className="icons">
                    <RiCloseCircleLine
                    onClick = {() => removeTodo(todo.todo_id)}
                    className='delete-icon'
                    />
                    <AiFillEdit
                    onClick = {() => toggleEditMode(todo.todo_id)}
                    className = 'edit-icon'
                    />
                    <TiTickOutline
                    onClick = {() => completeTodo(todo)}
                    className = 'complete-icon'
                    />
                </div>
            </div>
            ))}

        </div>

    )
    // return todoList.map((todo,index) => (
    //         <div key = {index} className = {todo.iscomplete === true ? 'todo-row complete' : 'todo-row'}>
    //             <div>
    //                 {todo.isEdit? 
    //                 <form onSubmit = {(e) =>{handleSubmit(e, todo);}}>
    //                     <input
    //                         type = "text"
    //                         placeholder = "Edit your todo"
    //                         name = "todo input edit"
    //                         className = "todo-input-edit"
    //                         value = {newValue}
    //                         onChange = {handleChange}
    //                     >
    //                     </input>
    //                 </form>
    //                 : todo.description}
    //             </div>
    //             <div className="icons">
    //                 <RiCloseCircleLine
    //                 onClick = {() => removeTodo(todo.todo_id)}
    //                 className='delete-icon'
    //                 />
    //                 <AiFillEdit
    //                 onClick = {() => toggleEditMode(todo.todo_id)}
    //                 className = 'edit-icon'
    //                 />
    //                 <TiTickOutline
    //                 onClick = {() => completeTodo(todo)}
    //                 className = 'complete-icon'
    //                 />
    //             </div>
    //         </div>
    //     )
    // )

} 

export default TodoItem
