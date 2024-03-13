const { BAD_REQUEST, INTERNAL_ERROR, CREATED, OK } = require("../Configs/HTTPCode");
const { CreateOrderService, ReadOrderService } = require("../Services/Order/oder.service");
const { API } = require("../Utils/formatApi");

function CreateOrder(req, res) {
    const { id } = req.user;
    const { Name, Phone, Address, ProductId, ReducedAmount, ShippingAmount, Quantity, Price, Description } = req.body;
    let requiredFields = [Name, Phone, Address, ProductId, ReducedAmount, ShippingAmount, Quantity];
    if (requiredFields.includes(undefined)) return res.status(BAD_REQUEST).json(API(BAD_REQUEST, "failed", "missing the fields", null, new Date()));
    // remember validate the fields

    let data = {
        idUser: id,
        ProductId,
        Customer: {
            Name,
            Phone,
            Address
        },
        ReducedAmount,
        ShippingAmount,
        Quantity,
        Price,
        AmountTotal: Number((Price * Quantity) - ReducedAmount + ShippingAmount),
        Status: "Pending",
        PaymentMethod: "Cash",
        Description: Description ?? "."

    }
    CreateOrderService(data, (err, data) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        } else if (data) {
            return res.status(CREATED).json(API(CREATED, "success", "Create Order successfully", data, new Date()));
        }
    })
}
/***********************/

function ReadOrder(req, res) {
    const { id } = req.user;
    const { filter, page, limit } = req.query;
    console.log(filter)
    if (!filter) {
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, "failed", "missing the fields", null, new Date()));
    }

    let data = {
        idUser: id,
        filter: filter ?? 'all',
        page: page ?? 1,
        limit: limit ?? 100
    };

    ReadOrderService(data, (err, data) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        } else if (data) {
            return res.status(OK).json(API(OK, "success", "Get Order successfully", data, new Date()));
        }
    })
}

module.exports = { CreateOrder, ReadOrder }