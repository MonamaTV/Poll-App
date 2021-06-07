import React from 'react';
import { FaPoll} from 'react-icons/all';

const AddPoll = ({openModal}) => {
    return (
        <button
            className="add__button"
            onClick={openModal}>
            <FaPoll />
        </button>
    )
}

export default AddPoll;
