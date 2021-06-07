import React, { useContext, useState } from 'react';
import './Body.css';
import Button from './Controls/Button';
import img from '../assets/img/img1.svg';
import { useHistory } from 'react-router';
import InputField from './Controls/InputField';
import { EmailContext } from '../context/EmailContext';


const Body = () => {

    const history = useHistory();
   
    const [email, setEmail] = useContext(EmailContext);

    const [error, setError] = useState('');

    const handleEmailChange = e => setEmail(e.target.value);
    
    const moveToPoll = () => {
        if(email) {
            history.push("/start");
        }
        setError("Enter your email before creating a poll")
    }
  
    return (
        <div className="home__container" >
            <div className="content">
                <br/>
                <h1>Create easily accessible polls at your own comfort</h1>
                
                <h4>...and get visual graphics of your results sent to your email.</h4>
                <div className="input__start">
                    <InputField type={"email"} text="Enter your email" value={email} handleChangeValue={handleEmailChange}/>
                    {error && <small className="danger">{error}</small>}
                    <Button text="Get started" handleButtonClick={moveToPoll} />
                </div>
            </div>
            <div className="img__container">
                <img src={img} alt="" />
            </div>
        </div>
    );
};

export default Body;
