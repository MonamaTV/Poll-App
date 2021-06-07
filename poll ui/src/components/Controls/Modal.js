import React, { useContext } from 'react';
import './Modal.css';
import { useHistory } from 'react-router';
import { EmailContext } from '../../context/EmailContext';
import Button from './Button';
import InputField from './InputField';

const Modal = () => {

    const [email, setEmail] = useContext(EmailContext);
 
    const history = useHistory();

    const handleSubmit = () => history.push("/start");
    
    const handleEmailChange = (e) => setEmail(e.target.value);
    
    return (
        email ? <div className="modal__container">
            <div className="poll__modal">
            <div className="modal__setup">
                <h3>Email Confirmation</h3>
                <p>Is this your email?</p>
            </div>
            <div className="input__start">
                <InputField 
                    text="Enter your email" 
                    value={email}
                    type={"email"}
                    handleChangeValue={handleEmailChange}
                />
                <Button text="Continue" handleButtonClick={handleSubmit} />
            </div>
        </div> </div> : <div className="modal__container">
        <div className="poll__modal">
            <div className="modal__setup">
                <h3>Let's Get Started</h3>
                <p>You are almost there...</p>
            </div>
            <div className="input__start">
                <InputField 
                    text="Enter your email" 
                    value={email}
                    type={"email"}
                    handleChangeValue={handleEmailChange}
                />
                <Button text="Continue" handleButtonClick={handleSubmit} />
            </div>
        </div>
        </div>
    )
}

export default Modal;
