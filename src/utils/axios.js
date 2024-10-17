import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const customAxios = axios.create({
  baseURL: "http://localhost:3000",
});

export const mock = new MockAdapter(customAxios);
