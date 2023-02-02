import axios from "axios";

const clienteAxios = axios.create({
    baseURL: "http://localhost:3300"
})

export default clienteAxios;