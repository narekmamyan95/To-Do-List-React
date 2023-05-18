import React, {useState, useEffect} from "react";

export const TaskList = ({
  todos,
  openPopap,
  setDeletedId,
  check,
  setHiddenCompleted,
  hiddenCompleted,
  todoHide,
}) => {
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    let updatedTodos = todos;
    if (hiddenCompleted) {
      updatedTodos = todos.filter((todo) => !todo.checked);
    }
    setFilteredTodos(updatedTodos);
  }, [hiddenCompleted, todos]);

  return (
    <div className="listBody">
      <div className="listComplited">
        <span>
          <input
            type="checkbox"
            checked={hiddenCompleted}
            onChange={setHiddenCompleted}
          />
          <p>Hide completed</p>
        </span>
      </div>
      {filteredTodos?.length ? filteredTodos.map((todo) => {
        return (
          <div key={todo.id} className="todoBody" style={todoHide}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => check(todo)}
            />
            <span className={todo.checked ? 'checkedTextColor' : ''}>{todo.text}</span>
            <button
              onClick={() => {
                openPopap();
                setDeletedId(todo.id);
              }}
            >
              X
            </button>
          </div>
        );
      }) : null}
    </div>
  );
};
