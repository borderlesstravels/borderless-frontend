import axios from "axios";
import { API_BASE_URL } from "../../../constants/apiLinks";

export function getAirportList() {
  return axios.request({
    url: `${API_BASE_URL}flight/fetch-airports`,
    method: "get",
  });
}
