import { deleteRequest, getRequest, postRequest, putRequest } from "./api";

const apiUrl = "http://localhost:5000";

export const getLanguages = () => getRequest(`${apiUrl}/api/lenguajes`);

export const createLanguages = (data) =>
  postRequest(`${apiUrl}/api/lenguajes`, data);

export const deleteLanguages = (id) =>
  deleteRequest(`${apiUrl}/api/lenguajes/${id}`);

export const updateLanguages = (id, data) =>
  putRequest(`${apiUrl}/api/lenguajes/${id}`, data);
