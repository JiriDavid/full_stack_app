const express = require("express")
const {register, login, activateUser, forgotPassword, resetPassword, updatePassword, loadUser, logoutUser} = require("../controller/authController")
const { isAuthenticated, restrictToAdmin } = require("../middleware/auth")
const { deactivateUser, getSingleUser, getUsers, updateMe, addAddress, removeAddress, } = require("../controller/userController")


const router = express.Router()

// auth route
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/activate").post(activateUser)
router.route("/forgotPassword").post(forgotPassword)
router.route("/resetPassword/:token").post(resetPassword)
router.route("/loadUser").get(isAuthenticated, loadUser)
router.route("/updatePassword").put(isAuthenticated, updatePassword)
router.route("/logout").post(isAuthenticated, logoutUser)

//user routes
router.route("/").get(isAuthenticated, restrictToAdmin("admin"), getUsers)
router.route("/:userId").get(isAuthenticated, getSingleUser)
router.route("/me").put(isAuthenticated, updateMe)
router.route("/deactivate/:userId").put(isAuthenticated, restrictToAdmin("admin"), deactivateUser)
router.route("/address/addAddress").put(isAuthenticated, addAddress)
router.route("/address/removeAddress/:addressId").put(isAuthenticated, removeAddress)


module.exports = router