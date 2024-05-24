const express = require("express")
const {createOrder, getUserOrders, getAnOrder, } = require("../controller/orderController")
const {isAuthenticated} = require("../middleware/auth")

const router = express.Router()
router.route("/").post(isAuthenticated, createOrder)
router.route("/user").get(isAuthenticated, getUserOrders)
router.route("/:id").get(isAuthenticated, getAnOrder)

module.exports = router