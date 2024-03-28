const { BAD_REQUEST, INTERNAL_ERROR, UNAUTHORIZED, OK } = require("../Configs/httpCode");
const { serviceGetAllOrder, ServicePickupOrder, serviceGetOrderDelivery, serviceGetOrderDetails, serviceOrderCancel, serviceOrderComplete } = require("../Services/shipper.order.service");
const { API } = require("../Utils/formatApi");

function shipperGetAllOrder(req, res) {
    let { shopId, id } = req.user;
    if (!(shopId && id)) {
        let api = API(UNAUTHORIZED, "failed", "You are not allowed to access this resource", {}, new Date());
        return res.status(UNAUTHORIZED).json(api);
    }
    serviceGetAllOrder(req.user, (err, data) => {
        if (err) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);
        } else {
            let api = API(OK, "success", "Get all order successfully", data, new Date());
            return res.status(OK).json(api);
        }
    })
}

function PickupOrder(req, res) {
    let { id: orderId } = req.body;
    if (!orderId) {
        let api = API(BAD_REQUEST, "failed", "Missing the Field", {}, new Date());
        return res.status(BAD_REQUEST).json(api);
    }
    let dataPickup = {
        orderId: orderId,
        shipperId: req.user.id,
        shopId: req.user.shopId
    }
    ServicePickupOrder(dataPickup, (err, data) => {
        if (err || !data) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);
        }
        if (data) {
            let api = API(OK, "success", "Pickup this order", data, new Date());
            return res.status(OK).json(api);
        }
    })
}
function getOrderDelivery(req, res) {
    let { shopId, id } = req.user;
    if (!(shopId && id)) {
        let api = API(UNAUTHORIZED, "failed", "You are not allowed to access this resource", {}, new Date());
        return res.status(UNAUTHORIZED).json(api);
    }
    let data = {
        shopId: shopId,
        shipperId: id
    }
    serviceGetOrderDelivery(data, (err, data) => {
        if (err) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);
        } else {
            let api = API(OK, "success", "Get all order successfully", data, new Date());
            return res.status(OK).json(api);
        }
    })

}

function getOrderDetails(req, res) {
    let { id } = req.params;

    if (!id) {
        let api = API(BAD_REQUEST, "failed", "Missing the Field", {}, new Date());
        return res.status(BAD_REQUEST).json(api);
    }
    let data = {
        orderId: id,
        shopId: req.user.shopId
    }
    serviceGetOrderDetails(data, (err, data) => {
        if (err) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);
        } else {
            let api = API(OK, "success", "Get all order successfully", data, new Date());
            return res.status(OK).json(api);
        }
    })
}

function cancelOrder(req, res) {
    let { id: orderId } = req.body;
    if (!orderId) {
        let api = API(BAD_REQUEST, "failed", "Missing the Field", {}, new Date());
        return res.status(BAD_REQUEST).json(api);
    }
    let dataPickup = {
        orderId: orderId,
        shopId: req.user.shopId,
        shipperId: req.user.id
    }
    serviceOrderCancel(dataPickup, (err, data) => {
        if (err || !data) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);
        }
        if (data) {
            let api = API(OK, "success", "Cancel this order success", data, new Date());
            return res.status(OK).json(api);
        }
    })
}

function completeOrder(req, res) {
    let { id: orderId } = req.body;
    if (!orderId) {
        let api = API(BAD_REQUEST, "failed", "Missing the Field", {}, new Date());
        return res.status(BAD_REQUEST).json(api);
    }
    let dataPickup = {
        orderId: orderId,
        shopId: req.user.shopId,
        shipperId: req.user.id
    }
    serviceOrderComplete(dataPickup, (err, data) => {
        if (err || !data) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);
        }
        if (data) {
            let api = API(OK, "success", "Complete this order success", data, new Date());
            return res.status(OK).json(api);
        }
    })

}
module.exports = {
    shipperGetAllOrder, PickupOrder, getOrderDelivery, getOrderDetails, cancelOrder, completeOrder
};