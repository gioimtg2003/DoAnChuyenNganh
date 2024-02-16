

const ShopPermission = (req, res, next) => {
    const { role } = req.user;
    if (role === 2) {
        next();
    } else {
        return res.status(403).json({ message: "Permission Denied" });
    }
};

const ShipperPermission = (req, res, next) => {
    const { role } = req.user;
    if (role === 1) {
        next();
    } else {
        return res.status(403).json({ message: "Permission Denied" });
    }
};

module.exports = { ShopPermission, ShipperPermission };