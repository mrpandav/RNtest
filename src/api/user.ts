import axios from "axios";
import { endpoints } from "./endpoints";
import { axiosClient } from ".";

export const character = async (page: number) => {
  return axiosClient.get(`${endpoints.CHARACTERS}?page=${page}`);
};

export const location = async () => {
  return axiosClient.get(endpoints.LOCATIONS);
};

export const episode = async () => {
  return axiosClient.get(endpoints.EPISODES);
};
