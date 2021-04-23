import { useState } from "react";

const TodoItem = ({
    id,
    todo,
    completed,
    handleChangeCompletedTodo,
    deleteTodo,
    editTodo
}) => {

    const [isEditing, setisEditing] = useState(false)
    const [editedTodo, seteditedTodo] = useState(todo)

    const handleSaveTodo = () => {
        editTodo(id, editedTodo);
        setisEditing(false)
    }

    const handleCancelEditing = () => {
        setisEditing(false);
        seteditedTodo(todo);
    }

    if(isEditing){
        return (
            <div>
                <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => seteditedTodo(e.target.value)}
                />
                <button onClick={handleCancelEditing}>Cancel</button>
                <button onClick={handleSaveTodo}>Save</button>
            </div>
        );
    }

    return (
        <div className="todo">
            <input
                id={`todo-${id}`}
                type="checkbox"
                checked={completed}
                onClick={() => handleChangeCompletedTodo(id)}
            />
            <label htmlFor={`todo-${id}`}>{todo}</label>
            <div className="actions">
                <button onClick={() => setisEditing(true)}>Edit</button>
                <button onClick={() => deleteTodo(id)}>Remove</button>
            </div>
        </div>
    );
};

export default TodoItem