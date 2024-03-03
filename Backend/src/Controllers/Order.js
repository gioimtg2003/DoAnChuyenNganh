const { BAD_REQUEST, INTERNAL_ERROR, CREATED } = require("../Configs/HTTPCode");
const { CreateOrderService } = require("../Services/Order/oder.service");
const { API } = require("../Utils/formatApi");

function CreateOrder(req, res) {
    const { id } = req.user;
    const { Name, Phone, Address, ProductId, AmountReduced, ShippingAmount, Quantity, Price, Description } = req.body;
    let requiredFields = [Name, Phone, Address, ProductId, AmountReduced, ShippingAmount, Quantity];
    if (requiredFields.includes(undefined)) return res.json(API(BAD_REQUEST, "failed", "missing the fields", null, new Date()));
    // remember validate the fields
    let data = {
        idUser: id,
        ProductId,
        Customer: {
            Name,
            Phone,
            Address
        },
        AmountReduced,
        ShippingAmount,
        Quantity,
        Price,
        AmountTotal: (Price * Quantity) - AmountReduced + ShippingAmount,
        Status: "Pending",
        PaymentMethod: "Cash",
        Description: Description ?? ""

    }

    CreateOrderService(data, (err, data) => {
        if (err) {
            return res.json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        } else if (data) {
            return res.json(API(CREATED, "success", "Create Order successfully", data, new Date()));
        }
    })
}
/***********************/

module.exports = { CreateOrder }