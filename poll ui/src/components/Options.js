import React from 'react'

const Options = ({options}) => {
    return (
       options.map((option, index) => (
            <li key={option?._id || index}>{option?.name}: {option?.votes}</li>
        ))
    )
}

export default Options
