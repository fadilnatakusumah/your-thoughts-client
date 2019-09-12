import axios from 'axios';
import { API_URL } from './config';

export default {
  getAllThoughts() {
    return axios.get(`${API_URL}/thoughts`)
      .then(res => res)
      .catch(err => err)
  },
}