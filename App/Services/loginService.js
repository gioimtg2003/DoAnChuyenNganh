import axios from 'axios';

const baseURL = 'http://192.168.1.3:3003/api/v1';

const handleLoginApp = async (Email) => {
    let response = await axios.post(`${baseURL}/login/app`, {
        Email
    },  )
    return response.data;
}

export {
    handleLoginApp,
}