import React from "react";
import StepListContainer from "../step_list/step_list_container";

const TodoDetailView = (props) => {
  const removeTodo = props.removeTodo;
  const todo = props.todo;
  return (
    <div>
      <p className="todo-body">{todo.body}</p>
      <StepListContainer todoId={todo.id} />
      <button className="delete-button" onClick={() => removeTodo(todo)}>
        Delete
      </button>
    </div>
  );
};

export default TodoDetailView;
