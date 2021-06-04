import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
    baseURL: "http://movimente-se.vercel.app/api/",
});

export default api;