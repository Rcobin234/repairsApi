const { Router } = require('express');
const {
  createUser,
  // updateUser,
  findUsers,
  deleteUser,
  findUserById,
  updateUserById,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', findUsers);
router.get('/:id', findUserById);
router.post('/', createUser);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUser);

module.exports = {
  usersRouter: router,
};
