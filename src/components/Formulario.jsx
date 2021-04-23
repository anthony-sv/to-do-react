import { nanoid } from "nanoid";
import { useState } from "react";

const Formulario = ({todos, setTodos}) => {
    const [todo, setTodo] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        setTodos([{ id: nanoid(3), todo, completed: false }, ...todos]);
        setTodo("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                onChange={e => setTodo(e.target.value)}
                value={todo}
            />
            <button>Add</button>
        </form>
    );
}

export default Formulario