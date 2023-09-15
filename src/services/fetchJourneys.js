import api from "./instance";

const fetchJourneys = async () => {
  const response = await api.get();

  const result = response.data;

  return result;
};

export default fetchJourneys;
