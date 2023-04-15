import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_LOCAL_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
