const route = require('express').Router()
const { Authentication, GrantAccessToken } = require('./Controller/Authentication');

route.post('/auth/login', Authentication)
route.post('/auth/token', GrantAccessToken)

module.exports = {
    route : route,
}