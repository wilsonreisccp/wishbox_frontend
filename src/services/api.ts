import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shielded-everglades-21730.herokuapp.com/'
});

export default api;