import { useState } from "react";

export default function Todo({ id, todo, onChangeTodo, onDeleteTodo }) {
  const [isEditing, setEditing] = useState(false);
  let todoTemplate;

  if (isEditing) {
    todoTemplate = (
      <>
        <input
          id={id}
          value={todo.title}
          onChange={(e) => {
            onChangeTodo({
              ...todo,
              title: e.target.value,
            });
          }}
        />
        <button type="button" className="btn" onClick={() => setEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoTemplate = (
      <>
        {todo.title}
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            className="check"
            checked={todo.done}
            onChange={(e) => {
              onChangeTodo({
                ...todo,
                done: e.target.checked,
              });
            }}
          />
          {todoTemplate}
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => onDeleteTodo(todo.id)}
          >
            Delete
          </button>
        </label>
      </div>
    </>
  );
}
