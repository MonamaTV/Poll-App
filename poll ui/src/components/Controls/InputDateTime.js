import React from 'react'

const InputDateTime = ({handleChangeValue, text, type}) => {
    return (
        <>
        {/* <label htmlFor={text}>{text}</label> */}
            <input
                className="input__text"
                type={type}
            />
        </>
    )
}

export default InputDateTime
