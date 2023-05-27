const express = require('express')
const router = express.Router()

const mentorController = require('../controller/mentor')

router.post('/create', mentorController.createMentor)
router.post('/get-studentList', mentorController.getStudentList)

module.exports = router