import React from 'react';

const Button = ({handleButtonClick, text}) => {
    return (
        <button
            className="button__start"
            onClick={handleButtonClick}>{text}
        </button>
    );
};
export default Button;
