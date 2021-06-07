import React from 'react';
import { Link } from 'react-router-dom';

const Poll = ({data}) => {
    //Destructuring the poll data
    const {_id, question, createdAt} = data;
    //Counting the number of people who already voted
    let voteCount = 0;
    data.options.forEach((poll) => voteCount += poll.votes);

    return (
        <Link className="poll__item" to={`/poll/${_id}`}>
            <h4>{question}</h4>
            <p>{voteCount} people already voted</p>
            <small>Created At: {createdAt.slice(0, 10)}</small>
        </Link>
    )
}
export default Poll;
