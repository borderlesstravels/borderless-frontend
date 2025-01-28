import axios from "axios";
import { API_BASE_URL } from "../../../constants/apiLinks";

export function getShortletList() {
  return axios.request({
    url: `${API_BASE_URL}shortlet/fetch-shortlets-location`,
    method: "get",
  });
}
