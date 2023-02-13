const { Router } = require('express');
const {
  findRepairs,
  findRepairsById,
  createRepairs,
  updateRepairsById,
  deleteRepairs,
} = require('../controllers/repairs.controller');

const router = Router();

router.get('/', findRepairs);
router.get('/:id', findRepairsById);
router.post('/', createRepairs);
router.patch('/:id', updateRepairsById);
router.delete('/:id', deleteRepairs);

module.exports = {
  repairsRouter: router,
};
