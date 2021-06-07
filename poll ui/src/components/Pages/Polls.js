import React, { useState, useEffect, useCallback} from 'react';
import Poll from '../Poll';
import axios from '../../api/axios';
import InputField from '../Controls/InputField';
import AddPoll from '../Controls/AddPoll';
import Modal from '../Controls/Modal';
import Loading from '../Loading';

const Polls = () => {
    //State hook for pagination
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const moveToNextPage = () => setPage(page + 1);

    const moveToPrevPage = () => {
        if(page === 1) return;

        setPage(page - 1);
    }

    const [pollData, setPollData] = useState([]);
    const [pollValue, setPollValue] = useState('');

    const searchPolls = (e) => {
        setPollValue(e.target.value);
        if(e.key === "Enter")
        {
            fetchPolls(pollValue);
        }
    }

    const onPollValue = (e) => setPollValue(e.target.value);
    

    // const debounceProcess = debounce(searchPolls, 2000);

    const fetchPolls = useCallback(async (pollValue = "") => {
        
        const results = await axios.get(`/polls/?query=${pollValue || ''}&page=${page}`);

        if(results.status === 200) {
            setPollData(results.data);
        }
       
        setLoading(false);
    }, [page]);


    useEffect(() => {
        setLoading(true);
        fetchPolls();
        return () => {
            setPollData([]);
        }
        
    }, [fetchPolls]);

    const [modal, setModal] = useState(false);
    
    const openModal = () => {
        setModal(!modal)
    }

    return (
        !loading ? <>
            {
                modal && <Modal />
            }
            <div style={{height: "100%"}} className="polling__container" >
                <div className="search">
                    <InputField 
                        labelValue="Search for polls"
                        text={"e.g technology, service..."} 
                        handleChangeValue={onPollValue}
                        handleEnter={searchPolls}
                        value={pollValue} />
                </div>
                <div className="polls">
                    { pollData && pollData.map((poll) => {
                        return <Poll key={poll._id} data={poll}/>
                    })}
                    {
                        <AddPoll openModal={openModal}/>
                    }            
                </div>
                <div className="pagination">
                    <button onClick={moveToPrevPage}>Prev</button>
                    <button onClick={moveToNextPage}>Next</button>
                </div>

                
            </div>
        </> : <Loading />
    )
}

export default Polls;
