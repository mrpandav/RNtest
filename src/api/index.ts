import axios from "axios";
import * as config from '../config';


export const axiosClient = axios.create({
  baseURL: config.API_DOMAIN,
});


export const accessToken = 'YOUR_ACCESS_TOKEN';  
 
 axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;



 