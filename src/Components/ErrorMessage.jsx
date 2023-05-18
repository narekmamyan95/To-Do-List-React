import React from "react";

const ErrorMessage = ({ errortext, emptyInput }) => {
  return (
    <>
      {emptyInput ? (
        <div className="errorMessageContainer">
          <p>{errortext}</p>
        </div>
      ) : null}
    </>
  );
};

export default ErrorMessage;
