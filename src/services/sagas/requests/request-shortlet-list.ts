import axios from "axios";
import { apiLinks } from "../../../config/environment";

export function getShortletList () {
    return axios.request({url: `${apiLinks.url}shortlet/fetch-shortlets-location`, method: 'get'});
}
