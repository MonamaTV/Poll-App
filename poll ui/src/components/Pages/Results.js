import React, { useState, useEffect } from 'react';
import Options from '../Options';
import Loading from '../Loading';
import axios from '../../api/axios';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { FaWhatsapp, FaTwitter, HiDownload} from 'react-icons/all';

const Results = () => {
    //Get poll ID
    const { id } = useParams();
    //Poll Information state information
    const [pollData, setPollData] = useState({});
    //Onload and when ID changes
    useEffect(() => {
        const fetchPollData = async () => {
            try {
                const results = await axios.get(`/polls/${id}`);
                if(results.status === 200) {
                    setPollData(results.data);
                }
            } catch (error) {
                setPollData(null);
            }
        }
        fetchPollData();
    }, [id]);

    const getURL = () => window.location.href;

    const formatLink = () => {
        let pollInfo = `${pollData?.question}
        Vote here: ${getURL()}`;
        return pollInfo;
    }

    const downloadResults = () => {
        const canvas = document.querySelector(".charts canvas");
        const image = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.download = "image.png";
        link.href = image;
        link.click();
    };

    
    return (
        pollData.options !== null ?<div className="polling__container">
            <h2 style={{color: "#3863b4"}}>Results</h2>
            <div className="results__content">
                <h4>Graph below illustrates the results of the poll:</h4>
                <br/>
                <h5>{pollData?.question}</h5>
            </div>
            <div className="text__results">
                <ul>
                    {
                        pollData.options && <Options options={pollData.options} />
                    }
                </ul>
            </div>
            <div className="charts">
                {pollData.options && pollData && <Bar
                    data={{
                        labels: [...pollData.options.map(opt => opt?.name)],
                        datasets: [{
                            label: pollData?.question,
                            data: [...pollData.options.map(opt => opt?.votes)],
                            backgroundColor: ['#3863b4', '#3863b4', '#3863b4', '#3863b4', '#3863b4']
                        }]
                    }}
                   
                />}
                <button onClick={downloadResults} className="download"><HiDownload />  Download results</button>
            </div>
            <br/>
            <p style={{color: "#3863b4"}}>Share link</p>
            <div className="media">
                <a href={`https://wa.me/?text=${formatLink()}`} rel="noreferrer" className="whatsapp" target="_blank"><FaWhatsapp/>WhatsApp</a>
                <a href={`https://twitter.com/intent/tweet?text=${formatLink()}`} rel="noreferrer" className="twitter" target="_blank"><FaTwitter/>Twitter</a>
               
            </div>
        </div> : <Loading />
    )
}

export default Results;
