import axios from "axios";
import { apiLinks } from "../../../config/environment";

export function getAirportList () {
    return axios.request({url: `${apiLinks.url}flight/fetch-airports`, method: 'get'});
}