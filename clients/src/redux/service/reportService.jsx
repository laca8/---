import axios from "axios";
const API_URL = "/api/report";
const getReports = async (keywords) => {
  const response = await axios.get(
    `${API_URL}?numReport=${keywords.numReport}&name=${keywords?.name}&connPhone=${keywords?.phone}&connName=${keywords?.connName}`
  );
  console.log(keywords);
  console.log(response);

  return response.data;
};
const updateReport = async (r) => {
  const response = await axios.put(`${API_URL}/${r._id}`, r);
  return await response.data;
};
const createReport = async (r) => {
  const response = await axios.post(`${API_URL}`, r);
  return await response.data;
};
const getReportById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response);

  return await response.data;
};
const reportService = {
  getReports,
  updateReport,
  getReportById,
  createReport,
};
export default reportService;
