import axios from "axios";

export const getRequest = (url, config) => axios.get(url, config);
export const postRequest = (url, data, config) => axios.post(url, data, config);
export const putRequest = (url, data, config) => axios.put(url, data, config);
export const deleteRequest = (url, config) => axios.delete(url, config);
