const express = require('express');

const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getById);

router.get('/testimonials/random', TestimonialController.getRandom);

router.post('/testimonials', TestimonialController.create);

router.delete('/testimonials/:id', TestimonialController.delete);

router.put('/testimonials/:id', TestimonialController.update);

module.exports = router;