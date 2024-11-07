import axios from 'axios'



const apiRequest = async ({ method, url, data = {}, headers = {} }) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    try {
        const response = await axios({
        method: method,           // HTTP method (GET, POST, PUT, DELETE, etc.)
        url: url,                 // Endpoint URL
        data: data,               // Payload for POST/PUT requests
        headers: headers,         // Custom headers
        baseURL: BASE_URL,        //  Default base URL (optional)
        withCredentials: true
        });

        return response.data;       // Return the response data

    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }
};




export default apiRequest

