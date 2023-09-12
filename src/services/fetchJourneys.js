import axios from "axios";

const fetchJourneys = async () => {
  const response = await axios.get("http://localhost:5173/public-transport/journey");
  const result = response.data;
  return result;
};

export default fetchJourneys;
