import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form";
import NoData from "./Components/NoData";
import { POPUP_TEXT, ERROR_TEXT, TODOS, IS_HIDDEN_COMPLETED } from "./constants/text";
import { TaskList } from "./Components/TaskList";
import Popap from "./Components/Popap";
import ErrorMessage from "./Components/ErrorMessage";
import { set, get } from "./helpers/storage";

function App() {
  const todosFromStorage = get(TODOS);
  const hiddenCompletedFromStorage = get(IS_HIDDEN_COMPLETED);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(todosFromStorage || []);
  const [hiddenCompleted, setHiddenCompleted] = useState(hiddenCompletedFromStorage);
  const [] = useState();
  const [popap, setPopap] = useState(false);
  const [deletedId, setDeletedId] = useState({});
  const [countText, setcountText] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [emptyInput, setemptyInput] = useState(false);

  useEffect(() => {
    if (todos.length) {
      set(TODOS, todos);
    }
  }, [todos]);

  useEffect(() => {
    set(IS_HIDDEN_COMPLETED, hiddenCompleted);
  }, [hiddenCompleted]);

  const changestyle = () => {
    setClicked(true);
  };

  const mystyle = {
    display: clicked ? "block" : "none",
  };

  const bordercolor = {
    border: clicked ? "1px solid red" : "1px solid gold",
  };

  const buttonhide = {
    display: text ? "block" : "none",
  };

  const closePopupHandler = (popupState) => setPopap(popupState);

  const handleHiddenCompleted = (event) => {
    console.log(event.target.checked);
    setHiddenCompleted(event.target.checked);
  };

  /**
   * Work onChange todo input value
   * @params {object} event
   *
   * @returns undefined
   */
  const changeTodoInputValue = (event) => {
    const { value } = event.target;

    setText(value);
    setemptyInput(false);
    setcountText(text.split("").length + 1);
    if (countText > 53) {
      changestyle();
    } else {
      setClicked(false);
    }
  };

  /**
   * Add new todo in local state
   */
  const addTodoHandler = () => {
    if (text && text <= 53) {
      const newTodo = {
        id: Date.now(),
        text,
        checked: false
      };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }
    if (!text) {
      setemptyInput(true);
    }
    setText("");
  };

  /**
   * Todo Delete
   */
  const deleteItem = () => {
    const filteredTodos = todos.filter(todo => todo.id !== deletedId);
    setTodos(filteredTodos);
    // setdeleteTodo(todoId);
  };

  const deleteTodoHandler = () => {
    deleteItem();
    closePopupHandler(false);
  };

  /**
   * Clear todo input value
   */
  const clearTodoHandler = () => setText("");

  /**
   * Popap open
   */
  const openPopap = () => {
    setPopap(true);
  };

  /**
   * Todo Check
   */
  const check = (currentTodo) => {
    const updatedTodo = todos.map((todo) => todo.id === currentTodo.id ? {...todo, checked: !todo.checked} : todo);
    setTodos(updatedTodo);
  };

  return (
    <div className="App">
      <ErrorMessage errortext={ERROR_TEXT} emptyInput={emptyInput} />

      <Form
        text={text}
        mystyle={mystyle}
        bordercolor={bordercolor}
        buttonhide={buttonhide}
        onChangeHandler={changeTodoInputValue}
        addTodoHandler={addTodoHandler}
        clearTodoHandler={clearTodoHandler}
      />

      <Popap
        isShow={popap}
        text={POPUP_TEXT}
        onClickYes={deleteTodoHandler}
        onClickNo={closePopupHandler}
      />

      {todos.length ? (
        <TaskList
          openPopap={openPopap}
          todos={todos}
          setDeletedId={setDeletedId}
          check={check}
          hiddenCompleted={hiddenCompleted}
          setHiddenCompleted={handleHiddenCompleted}
        />
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default App;
