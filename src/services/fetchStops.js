import axios from "axios";
import { BASE_URL } from "../constants";

const fetchStops = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  const result = response.data;
  return result;
};

export default fetchStops;
