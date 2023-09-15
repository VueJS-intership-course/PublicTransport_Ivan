import api from "./instance";

const fetchStops = async (id) => {
  const response = await api.get(`/${id}`);

  const result = response.data;

  return result;
};

export default fetchStops;
