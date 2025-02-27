const express = require('express');
const {getHospitals, getHospital, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals');

const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/:id').get(getHospital).delete(protect, authorize('admin'), deleteHospital).put(protect, authorize('admin'), updateHospital);

module.exports = router;