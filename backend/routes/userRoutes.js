const express = require('express');
const router = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  listUsers,
} = require('../controllers/userController');

router.get('/', listUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
