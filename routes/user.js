
const express = require('express');
const userController = require('../controllers/user')

const router = express();


router.route('/users')
    .get(userController.getUsers)

router.route('/user')
    .delete(userController.deleteUser)
    // .get(userController.getUsers)

router.route('/togglerole')
    .get(userController.toggleRole)

router.route('/signin')
    .post(userController.postSignIn)

router.route('/signup')
    .post(userController.postSignUp)

module.exports = router;