import React from "react";

const Popap = ({ isShow, text, onClickNo, onClickYes }) => {
  return (
    <>
      {isShow ? (
        <div className="popupContainer">
          <div className="popupBody">
            <p>{text}</p>
            <button onClick={onClickYes}>Yes</button>
            <button onClick={() => onClickNo(false)}>No</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Popap;
