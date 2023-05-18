import React from "react";

const Form = ({
  onChangeHandler,
  addTodoHandler,
  clearTodoHandler,
  text,
  mystyle,
  bordercolor,
  buttonhide,
}) => {
  return (
    <div className="formBody">
      <p>Task</p>
      <div>
        {" "}
        <button style={buttonhide} onClick={clearTodoHandler}>
          X
        </button>
      </div>
      <input
        style={bordercolor}
        type="text"
        placeholder="Write here"
        onChange={onChangeHandler}
        value={text}
      />
      <input type="button" value="Add" onClick={addTodoHandler} />
      <div className="validationText">
        <p style={mystyle}>Task content can contain max 54 characters</p>
      </div>
    </div>
  );
};

export default Form;
