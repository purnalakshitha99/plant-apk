import api from "../axios";
const baseURL = 'https://plant-prediction.onrender.com'

export default {
    login: payload => api.post(`${baseURL}/auth/login`,payload),
    register: payload => api.post(`${baseURL}/auth/register`,payload)
}
