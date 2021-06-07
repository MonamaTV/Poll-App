import axios from 'axios';

const URL = axios.create({
    baseURL: "https://anonypolls.herokuapp.com/api"
});

export default URL;