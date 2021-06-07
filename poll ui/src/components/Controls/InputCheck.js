import React from 'react'

const InputCheck = ({value, handleInputChange}) => {
    return (
        <div className="input__check">
            <input 
                type="checkbox"
                className="check"
                value={value}
                checked={value}
                onChange={handleInputChange}
            />
          
        </div>
    )
}

export default InputCheck;
