import axios from "axios";

const Axios = axios.create({
	baseURL: "https://zincubate.in/api",
});

export default Axios;
