import api from "../axios";
const baseURL = 'https://plant-prediction.onrender.com'

export default {
    predictedData: () => api.get(`${baseURL}/plant_prediction/`),
    predictImage: payload => api.post(`${baseURL}/plant_prediction/plant`, payload),
    savePredictedData: payload => api.post(`${baseURL}/plant_prediction/save`, payload),
}
