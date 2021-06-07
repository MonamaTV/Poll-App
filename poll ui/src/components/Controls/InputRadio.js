import React from 'react'

const InputRadio = ({pollID, handleRadioInput, text}) => {
    return (
        <div className="input">
            <input 
                value={pollID}
                type="radio"
                onChange={handleRadioInput}
            />{text}
        </div>
    )
}

export default InputRadio
