const express = require("express")
const {createSubscription, deleteSubscription, getAllSubscription, checkSubscription} = require("../controller/subscriptionController")
const {isAuthenticated} = require("../middleware/auth")


const router = express.Router()
router.route("/:sellerId").post(isAuthenticated, createSubscription)
router.route("/unsubscribe/:sellerId").post(isAuthenticated, deleteSubscription)
router.route("/isSubscribed/:sellerId").get(isAuthenticated, checkSubscription)


module.exports = router
