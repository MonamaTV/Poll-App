import React, { useState, useEffect} from 'react'
import axios from '../../api/axios';
import Button from '../Controls/Button'
import InputRadio from '../Controls/InputRadio';
import { useHistory, useParams } from 'react-router';

const Vote = () => {

    const history = useHistory();

    const { id } = useParams();
    const [cast, setCast] = useState('');
    const [poll, setPoll] = useState(null);

    const handleRadioInput = (e) => {
        //Uncheck
        const inputs = document.querySelectorAll("input[type='radio']");
        inputs.forEach((inp) => {
            inp.checked = false;
        });

        setCast(e.target.value);
        e.target.checked = true;
    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        if(cast === '') {
            alert("You need select one option before voting");
            return;
        }
        
        const result = await axios.patch(`/polls/${id}/${cast}`);
        if(result.status !== 200) {
            alert("Error: Please try voting again");
            return;
        }

        history.push(`/results/${id}`);
    }
    
    //Fetches the voll onload and set it up for voting
    useEffect(() => {
        const fetchPollData = async () => {
            try {
                const results = await axios.get(`/polls/${id}`);
                if(results.status === 200) {
                    setPoll(results.data);
                }
            } catch (error) {
                setPoll(null);
            }
        };
        fetchPollData();
    }, [id]);


    return (
        <div className="polling__container">
            <div className="vote">
                <div className="instructions voting__header">
                    <h3>Select from the options under the question</h3>
                    <p>Instructions</p>
                    <ul>
                        <li>Cast your vote for your favourable option</li>
                        <li>You can vote for multiple times for different options</li>
                        <li>After you voting, you will get to see the poll results as far....</li>
                    </ul>
                </div>
                <div className="voting__options">
                    <h4>{poll?.question}</h4>
                    <small>Please select one of the options below, you cannot cast multiple votes at the same time</small>
                    {
                        poll && poll.options.map((data) => (
                            <InputRadio 
                                key={data._id}
                                text={data?.name} 
                                handleRadioInput={handleRadioInput}
                                pollID={data?._id} /> 
                        ))
                    }
        
                    <Button text="Vote" handleButtonClick={handleSubmit} />
                </div>
                
            </div>
        </div>
    )
}
export default Vote;
