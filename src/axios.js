import axios from "axios";

const instance = axios.create({
  //должен соз-ть свою оболочку, и сеть настройки
  baseURL: "http://localhost:4444",
});

export default instance;
