const express = require('express');

const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.route('/testimonials', TestimonialController.getAll);

router.route('/testimonials/:id', TestimonialController.getById);

router.route('/testimonials/random', TestimonialController.getRandom);

router.route('/testimonials', TestimonialController.create);

router.route('/testimonials/:id', TestimonialController.delete);

router.route('/testimonials/:id', TestimonialController.update);

module.exports = router;