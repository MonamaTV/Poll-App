import React, { useContext, useState } from 'react';
import './Poll.css';
import Options from '../Options';
import Loading from '../Loading';
import axios from '../../api/axios';
import Button from '../Controls/Button';
import { useHistory } from 'react-router-dom';
import InputField from '../Controls/InputField';
import { EmailContext } from '../../context/EmailContext';
import { FaWhatsapp, FaLinkedin, FaTwitter} from 'react-icons/all';


const CreatePoll = () => {

    //Get user email from the home page through context
    const [email] = useContext(EmailContext);
    
    const history = useHistory();

    if(!email) {
        history.push("/");
    }
    //hooks
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    //Poll and answers
    const [option, setOption] = useState('');
    const [options, setOptions] = useState([]);
    const [poll, setPoll] = useState('');
    //Errors
    const [errorPoll, setErrorPoll] = useState('');
    const [errorOption, setErrorOption] = useState('');
    //poll id
    const [pollID, setPollID] = useState('');

    const onPollChange = (e) => setPoll(e.target.value);

    const handleOptionValue = (e) => setOption(e.target.value);
    
    //Insert new value
    const onOptionChange = () => {
        if(option === "" || option.length < 1) {
            setErrorOption("Your poll option cannot be empty");
            return;
        }
        setOptions([...options, {name: option, votes: 0}]);
        setOption("");
        setErrorOption("")
    }

    //Move between the screens
    const moveToNextScreen = () => {
        if(poll.length < 1 || poll === "") {
            setErrorPoll("Your poll question cannot be empty");
            return;
        }
        setErrorPoll("");
        setStep(step + 1);

    };
    const moveToPrevScreen = () => setStep(step - 1);

    const publishPoll = async () => {
        setLoading(true);
        if(options.length < 2) {
            setLoading(false);
            setErrorOption("Your poll options must be at least two");
            return;
        }

        setErrorOption("");

        const createPoll = {
            question: poll,
            userEmail: email,
            endDate: '2100-10-10',
            options,
            live: true,
        }

        try {
            const results = await axios.post("/polls", createPoll);
            const { data } = results;
            
            if(results.status === 201) {
                setPollID(data?.poll?._id);
                setUploadStatus(true);
            }
            else {
                setUploadStatus(false);
            }
        } catch (error) {
            setUploadStatus(false);
        }
        setLoading(false);
        setStep(step + 1);
    }


    switch(step) {
        case 1: return (
            <div className="poll__container">
                <div className="instructions">
                    <h2>HOW TO CREATE A POLL</h2>
                    <br/>
                    <p>Please note we are not going to publish your email with the poll...</p>
                    <ul>
                        <li>Enter question you want to get answers for</li>
                        <li>List the options/answers for your poll</li>
                        <li>The options must be between 2 and 5 </li>
                        <li>You can copy the poll link and publish it to your social media handles</li>
                        <li>The link to see the results will be sent to your email</li>
                    </ul>
                </div>
                <h1>Create a poll</h1>
                <div className="create__poll">
                    <InputField
                        handleChangeValue={onPollChange} 
                        value={poll}
                        labelValue={"Enter your question"} 
                        text={""}
                    />
                    {errorPoll && <small className="danger">{errorPoll}</small> }
                    <Button
                        handleButtonClick={moveToNextScreen}
                        text={"Continue"}
                    />
                </div>
            </div>
        );
        case 2: return (
            !loading ?<div  className="poll__container">
                <h1>Your Poll</h1>
                <div className="create__poll">
                    <InputField 
                        labelValue={"Enter the options"}
                        value={option}
                        text={""}
                        handleChangeValue={handleOptionValue}/>
                        {errorOption && <small className="danger">{errorOption}</small> }
                    <Button 
                        text={"Add Option"}
                        handleButtonClick={onOptionChange}
                    />
                </div>
                <br/>
                <div className="poll__options">
                    <p>{poll}</p>
                    <ul>
                        <Options options={options} />
                    </ul>

                    <button
                        className="prev"
                        onClick={moveToPrevScreen}
                        >Go back
                    </button>
                    <button     
                        onClick={publishPoll} 
                        className="publish"
                        >Publish Poll
                    </button>
                </div>
            </div>: <Loading />
        );
        default: return (
            <div  className="poll__container">
                <h1>Your Poll Submission</h1>
                <br/>
                {
                    uploadStatus ? (
                        <>
                            <p>Your poll has been successfully published!</p>
                            <br/>
                            <a href={`/poll/${pollID}`}>See the poll</a>
                            <br/>
                            <p>Share link</p>
                            <div className="media">
                                <a href="/" className="whatsapp" target="_blank"><FaWhatsapp/>WhatsApp</a>
                                <a href="/" className="twitter" target="_blank"><FaTwitter/>Twitter</a>
                                <a href="/" className="linkedin" target="_blank"><FaLinkedin />LinkedIn</a>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Your poll was <span className="danger">unsuccessful</span>!</p>
                            <br/>
                            <a href={`/start/`}>Restart the poll</a>
                            <br/>
                            <p>We apologize for the inconvinience caused</p>
                        </>
                    )
                }
               
            </div> 
        );
    }
}

export default CreatePoll;
