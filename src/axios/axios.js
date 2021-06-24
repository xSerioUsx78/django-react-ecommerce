import axios from "axios";


// const endpoint = "http://localhost:8000/";
const endpoint = "https://django-react-ecommerce-mn.herokuapp.com/";

const instance = axios.create({
    baseURL: endpoint,
});

export default instance;

export const authAxios = (token) => axios.create({
    headers: {
        Authorization: `Bearer ${token.access}`
    }
});