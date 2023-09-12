import axios from "axios";

const fetchJourneys = async () => {
  const data = await axios.get("http://localhost:5173/public-transport/journey");
  const result = data.data;
  return result;
};

export default fetchJourneys;
