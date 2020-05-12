import axios from "axios";

const instance = axios.create({
  baseURL: "https://mark-reactburger.firebaseio.com/",
});

export default instance;
