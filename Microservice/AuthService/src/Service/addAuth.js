const { logCreate } = require('../Controller/logs');
const { SchemaAuth } = require('../Model/Auth');

module.exports = {

    AddUser: async (data, callback) => {
        try {
            let user = new SchemaAuth({
                idUser: data.idUser,
                Email: data.Email,
                Password: data.Password,
                Role : data.Role
            });
            let saved = await user.save();
            logCreate(new Date(), 'Success', saved._id, "Create a auth entity Successfully");
            callback(null, saved);
        } catch (err) {
            logCreate(new Date(), 'Error', "Null", "Create a auth entity error");
            callback(err, null)
        }

    },
    subUserService : async (data) => {
        
    }
}