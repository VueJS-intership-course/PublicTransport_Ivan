import axios from "axios";
import { BASE_URL } from "../constants";

const fetchJourneys = async () => {
  const response = await axios.get(BASE_URL);
  const result = response.data;
  return result;
};

export default fetchJourneys;
