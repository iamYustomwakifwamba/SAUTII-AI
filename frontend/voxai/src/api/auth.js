import api from "./axio";
import ENDPOINTS from "./endponts";

export const login = async (email, password) => {
    const response = await api.post(ENDPOINTS.LOGIN, {
        email,
        password
    });

    return response.data;
}

export const register = async (firstname, lastname, phonenumber, country, email, password) =>{
    
    const response = await api.post(ENDPOINTS.REGISTER, {
        firstname, lastname, phonenumber, country, email, password
    });

    return response.data;
}

export const getProfile = async () => {
    const response = await api.get(ENDPOINTS.PROFILE);

    return response.data
}