// import axios from 'axios';
import axios from "../config/axios"

const baseURL = 'http://192.168.1.3:3003/api/v1';

const getOrderWithStatus = async (AT, Status) => {
    let response = await axios.post(`/show/order/${Status}`, {
        AT
    })
    return response.data;
}

const handleUpdateStatusOrder = async (OrderId, Status, AT) => {
    let response = await axios.put(`/update/status/order/successfully/${OrderId}`, {
        AT , Status
    });
    return response.data;
}

export {
    getOrderWithStatus,
    handleUpdateStatusOrder
}