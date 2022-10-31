const express = require('express')
const userRoutes = require('./../controllers/userController')

const router = express.Router();



  router.route('/')
.get(userRoutes.getAllUsers)
.post(userRoutes.createUser);

router
  .route('/:id')
  .get(userRoutes.getUserById)
  .patch(userRoutes.EditUserById)
  .delete(userRoutes.deleteUserById);

module.exports = router