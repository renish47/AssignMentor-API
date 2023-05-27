const Mentor = require('../model/mentor')

exports.createMentor = async (req, res, next) => {
    const name = req.body.name
    try {
        const pastMentor = await Mentor.find({ name })
        if (pastMentor.length) {
            const error = new Error('Mentor with this name already exist')
            error.status = 403
            throw error
        }
        const mentor = new Mentor({ name });
        await mentor.save()
        res.status(201).json(
            {
                message: "mentor created successfully"
            }
        )
    } catch (error) {
        next(error)
    }
}

exports.getStudentList = async (req, res, next) => {
    const name = req.body.name
    try {
        const mentorData = await Mentor.findOne({ name }).populate({ path: "students", populate: { path: "currentMentor previousMentor", select: "name" } })
        if (!mentorData) {
            const error = new Error('Mentor with this name doesnt exist')
            error.status = 403
            throw error
        }
        res.status(200).json(
            {
                message: "Date Retrieved successfully",
                studentList: mentorData.students
            }
        )

    }
    catch (error) {
        next(error)
    }
}