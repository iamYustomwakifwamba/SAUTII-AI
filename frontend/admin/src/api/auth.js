import api from "./axios";
import ENDPOINTS from "./endpoints";

export const getAdminProfile = async () => {
    const response = await api.get(ENDPOINTS.ADMIN.PROFILE)
    return response.data
}

export const adminLogin = async (email, password) => {
  const response = await api.post(ENDPOINTS.ADMIN.LOGIN, {
    email,
    password,
  });

  return response.data;
};

export const adminLogout = async (refresh) => {
    const response = await api.post(ENDPOINTS.ADMIN.LOGOUT, {
        refresh,
    });

    return response.data;
};

export const getCustomers = async () => {
    const response = await api.get(
        ENDPOINTS.ADMIN.CUSTOMERS
    )

    return response.data
}

export const adminRegister = async (
  firstname,
  lastname,
  email,
  phoneNumber,
  password,
  confirmPassword,
) => {
  const response = await api.post(ENDPOINTS.ADMIN.REGISTER, {
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
  });

  return response.data;
};
