const { SchemaShopUser } = require("../Models/Users/ShopModel");

module.exports = {
    /**
 * This function checks whether the store exist or not
 * @param {*} id 
 * @returns `true` or `false`
 */
    CheckStore: (id) => {
        return new Promise((res, rej) => {
            try {
                SchemaShopUser.findById(id)
                    .then(data => !data ? res(false) : res(true))
                    .catch(err => rej(err));

            } catch (err) {
                rej(err);
            }
        })
    }

}