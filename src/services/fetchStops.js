import axios from "axios";

const fetchStops = async (id) => {
  const response = await axios.get(`http://localhost:5173/public-transport/journey/${id}`);
  const result = response.data;
  return result;
};

export default fetchStops;
