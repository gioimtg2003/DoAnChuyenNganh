const jwt = require('jsonwebtoken');
const { logInfo } = require('../Controller/logs');

module.exports = {
    SignAccessToken : async (iss, exp, secret) => {
        let payload = {
            "iss" : iss,
            "exp" : exp
        }
        return jwt.sign(payload, secret, { algorithm: 'HS256', noTimestamp: true});
    },
    SignRefreshToken : async (idUser, secret) => {
        let payload = {
            id : idUser
        }
        return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : "1 days"});
    },
    VerifyRefreshToken : async (token, secret) => {
        try {
            jwt.verify(token, secret);
            logInfo(new Date(), "VERIFY_TOKEN", "Success", "Verify Refresh Token Successfully");
            return true;
        } catch {
            logInfo(new Date(), "VERIFY_TOKEN", "Error", "Token invalid");
            return false;
        }
    }
}

// let SignRefreshToken = async (idUser, secret) => {
//     let payload = {
//         id : idUser
//     }
//     return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : "30s"});
// }
// let verify = async (token, secret) => {
//     return jwt.verify(token, secret);
// }
// SignRefreshToken("abc", "xyz").then(
//     token => {
//         console.log(token);
        
//     }
// )
// verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiYyIsImlhdCI6MTcwNTkwNzU0OCwiZXhwIjoxNzA1OTA3NTc4fQ.FDGWLDsWiEFz-aaOluv3c-3q0q-A9JDlAdXALPv5K8k", "xyz").then(ok => console.log(ok))


