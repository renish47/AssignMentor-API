const express = require('express')
const router = express.Router()

const studentController = require('../controller/student')

router.post('/create', studentController.createStudent)
router.put('/assignMentor', studentController.assignMentor)
router.post('/get-prevMentor', studentController.getPreviousMentor)

module.exports = router