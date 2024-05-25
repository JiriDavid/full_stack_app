const express = require("express")
const {
  createConverstaion, 
  getUserConverstaions, 
  getCurrentConverstaion, } = require("../controller/conversationController")
const {isAuthenticated} = require("../middleware/auth")

const router = express.Router()
router.route("/").post(isAuthenticated, createConverstaion)
router.route("/:id").get(isAuthenticated, getCurrentConverstaion)
router.route("/").get(isAuthenticated, getUserConverstaions)

module.exports = router