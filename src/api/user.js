import axios from 'axios';
import { API_URL } from './config';

export default {
  signinUser(data) {
    return axios.post(`${API_URL}/signin`, data)
      .then(res => {
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        return res;
      })
      .catch(err => err)
  },
}