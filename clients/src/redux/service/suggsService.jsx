import axios from "axios";
const API_URL = "/api/sugg";
const getSuggs = async (keywords) => {
  const response = await axios.get(
    `${API_URL}?numSugg=${keywords.numSugg}&side=${keywords?.side}&connPhone=${keywords?.phone}&connName=${keywords?.connName}`
  );
  return response.data;
};
const updateSugg = async (r) => {
  const response = await axios.put(`${API_URL}/${r._id}`, r);
  return await response.data;
};
const createSugg = async (r) => {
  const response = await axios.post(`${API_URL}`, r);
  return await response.data;
};
const getSuggById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response);

  return await response.data;
};
const reportService = {
  getSuggs,
  updateSugg,
  getSuggById,
  createSugg,
};
export default reportService;
