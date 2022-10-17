import axios from "axios";

const instance = axios.create({
  //должен соз-ть свою оболочку, и сеть настройки
  baseURL: "http://localhost:4444",
});

//функция посредник проверяющая при каждом запросе есть токен или нет и если он есть тогда отправлять его в запрос. Это для того чтобы каждый раз не писать везде токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});
export default instance;
