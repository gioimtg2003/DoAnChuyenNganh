const route = require('express').Router()
const { Authentication } = require('./Controller/Authentication');
route.post('/auth/login', Authentication)

module.exports = {
    route : route,
}