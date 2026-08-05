import api from "./axio"
import ENDPOINTS from "./endponts"

export const createJingle = async (prompt) =>  {

    const response = await api.post(
        ENDPOINTS.CREATE_JINGLE,
        {
            prompt
        }
    );
    return response.data;
};

export const getJingle = async (id) => {
    const response = await api.get(`/api/studio/${id}/`)
    return response.data
}

export const getRecentJingles = async () => {
    const response = await api.get(
        ENDPOINTS.RECENT_JINGLES
    );

    return response.data;
}

export const sendMessage = async (id, content) => {
    const response = await api.post(`/api/studio/${id}/message/`, {
        content
    })

    return response.data
}