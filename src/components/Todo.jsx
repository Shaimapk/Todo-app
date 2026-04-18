import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import { MdDelete, MdDone } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function Todo() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editId,setEditId]=useState(null);

    const handleForm = (e) => {
        e.preventDefault();
        if (todo.trim() === "") return;


        if(editId !== null){
            const updatedTodos=todos.map((item)=>
            item.id===editId ? {...item,text:todo}:item);
            setTodos(updatedTodos);
            setEditId(null);
        }
        else setTodos([...todos, {text : todo, id : Date.now(),completed:false}]);
        
        setTodo("");
    };

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    },[editId]);

    const onDelete=(id)=>{
        setTodos(todos.filter((item)=>item.id !==id));
    }
    const onComplete =(id)=>{
        let complete = todos.map((item)=>{
            if(item.id===id) {
                return ({...item,completed:!item.completed})
            }
            return item
        })
        setTodos(complete);
    }

    const onEdit=(id)=>{
        const editTodo =todos.find((item)=>item.id === id);
        if(!editTodo) return;
        setTodo(editTodo.text);
        setEditId(editTodo.id);
    }

    return (
        <div className="container">
            <h2>Todo</h2>
            <form className="form-group" onSubmit={handleForm}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="enter your todo"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button disabled={!todo.trim()} className="addButton">{editId? 'Edit':'Add'}</button>
                
                {editId && <button type="button" className="addButton"
                    onClick={()=>{setEditId(null);
                    setTodo("")}}>Cancel</button>}
            </form>

            {todos.length !== 0 && (
                <ul className="todoList">
                    {todos.map((item) => (
                        <li key={item.id} className="list-items">
                            <div className="list-item-list" id={item.completed? "list-item": ""}>{item.text}</div>
                            <span>
                                <MdDone 
                                    className="list-item-icons" id="complete" title="Complete" aria-label="completed todo"
                                    onClick={()=>onComplete(item.id)}
                                />
                                <FaEdit className="list-item-icons" id="edit" title="Edit" aria-label="Edit todo"
                                onClick={()=>onEdit(item.id)}
                                />
                                <MdDelete className="list-item-icons" id="delete" title="Delete" aria-label="Delete todo"
                                    onClick={()=>onDelete(item.id)}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Todo;
