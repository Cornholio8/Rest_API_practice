const express = require('express');

const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.route('/seats', SeatController.getAll);

router.route('/seats/:id', SeatController.getById);

router.route('/seats/random', SeatController.getRandom);

router.route('/seats', SeatController.create);

router.route('/seats/:id', SeatController.update);

  router.route('/seats/:id', SeatController.delete);

module.exports = router;