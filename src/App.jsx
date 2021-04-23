import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./components/Formulario";
import TodoItem from "./components/TodoItem";

const FILTER_MAP = {
    All: () => true,
    Active: todo => !todo.completed,
    Completed: todo => todo.completed
}

const initialState = JSON.parse(localStorage.getItem("todos") || "[]")
const filterInitialState = localStorage.getItem("filter") || "All";

const filterKeys = Object.keys(FILTER_MAP);

const App = () => {

    const [todos, setTodos] = useState(initialState)
    const [filter, setFilter] = useState(filterInitialState);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        localStorage.setItem("filter", filter);
    }, [filter]);

    const handleChangeCompletedTodo = id => {
        const newTodos = todos.map(todo => {
            if(todo.id === id){
                return {...todo, completed: !todo.completed}
            }
            return todo;
        })
        setTodos(newTodos)
    }

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
    }

    const editTodo = (id, todop) => {
        const newTodos = todos.map(todoItem => {
            if(todoItem.id === id){
                return {...todoItem, todo: todop}
            }
            return todoItem;
        })
        setTodos(newTodos)
    }

    return (
        <main>
            <h1>todos app</h1>
            <h3>What needs to be done?</h3>
            <Formulario todos={todos} setTodos={setTodos} />
            <section id="filters">
                {filterKeys.map((filterKey) => (
                    <button
                        key={filterKey}
                        onClick={() => setFilter(filterKey)}
                    >
                        {filterKey} tasks
                    </button>
                ))}
            </section>
            <section id="todo-list">
                {todos.length > 0 ? todos
                    .filter(FILTER_MAP[filter])
                    .map(({ id, todo, completed }) => (
                        <TodoItem
                            key={id}
                            id={id}
                            todo={todo}
                            completed={completed}
                            handleChangeCompletedTodo={
                                handleChangeCompletedTodo
                            }
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                        />
                    )):
                    <h3>No hay tareas.</h3>
                    }
            </section>
        </main>
    );
};

export default App;