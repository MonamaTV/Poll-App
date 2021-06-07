import React from 'react';

const InputField = ({handleEnter, handleChangeValue, labelValue, text, value, type}) => {
    return (
        <>
            <label htmlFor={labelValue} className="label__">{labelValue}</label>
            <input
                value={value}
                onChange={handleChangeValue}
                placeholder={text}
                className="input__text"
                type={type || "text"}
                onKeyPress={handleEnter}
            />
        </>
        
    );
};

export default InputField;
