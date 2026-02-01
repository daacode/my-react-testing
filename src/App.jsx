import "./index.css";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";

let nextId = 3;
const initialTodos = [
  { id: 0, title: "Write React Write", done: true },
  { id: 1, title: "Edit React Articles", done: false },
  { id: 2, title: "Submit React Articles", done: false },
];

const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.done,
  Completed: (todo) => todo.done,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("All");

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false,
      },
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(
      todos.map((t) => {
        if (t.id === nextTodo.id) {
          return nextTodo;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTodo(todoId) {
    setTodos(todos.filter((t) => t.id !== todoId));
  }

  const todoList = todos?.filter(FILTER_MAP[filter]).map((todo) => (
    <li className="todo stack-small">
      <Todo
        id={todo.id}
        todo={todo}
        name={todo.title}
        key={todo.id}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </li>
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1 className="header">Todo App</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <h2 id="list-heading">{todos.length} tasks remaining</h2>
      <ul
        aria-labelledby="list-heading"
        className="todo-list stack-large stack-exception"
        role="list"
      >
        {todoList}
      </ul>
      {filterList}
    </div>
  );
}
