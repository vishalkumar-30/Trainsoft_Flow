import axios from 'axios'
import { TokenService } from './storage.service'
import GLOBELCONSTANT from "../Constant/GlobleConstant.js";

const axiosDefaults = () => {
    let auth1 = localStorage.getItem('REACTAPP.TOKEN');
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Authorization"] = auth1;

}
const AxiosService = {

    init: (baseURL, authToken) => {
        axios.defaults.baseURL = baseURL;
        axiosDefaults();
    },
    removeHeader: () => axios.defaults.headers.common = {},
    get: (resource, params, headers) => {
        axios.defaults.baseURL = GLOBELCONSTANT.COURSE.GET_COURSE;
        axiosDefaults();
        const config = {
            headers: headers,
            params: params
        }
        return axios.get(resource, config)
    },
    post: (resource, data, params, headers) => {
        axios.defaults.baseURL = GLOBELCONSTANT.COURSE.GET_COURSE;
        axiosDefaults();
        const config = {
            headers: headers,
            params: params
        }
        return axios.post(resource, data, config)
    },
    put: (resource, data) => {
        axiosDefaults();
        return axios.put(resource, data);
    },
    patch: (resource, data, params, headers) => {
        axiosDefaults();
        const config = {
            headers: headers,
            params: params
        }
        return axios.patch(resource, data, {responseType: 'arraybuffer'}, config);
    },
    delete: (resource, payload) => {
        axiosDefaults();
        return axios.delete(resource, { data: payload });
    },
    uploadMultiPart: (resource, formData) => {
        axiosDefaults();
        return axios.post(resource, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }

}

export default AxiosService