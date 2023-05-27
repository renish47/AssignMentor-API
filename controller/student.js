const Student = require('../model/student')
const Mentor = require('../model/mentor')

exports.createStudent = async (req, res, next) => {
    const name = req.body.name

    try {
        const pastStudent = await Student.find({ name })
        if (pastStudent.length) {
            const error = new Error('Student with this name already exist')
            error.status = 403
            throw error
        }
        const student = new Student({ name });
        await student.save()
        res.status(201).json(
            {
                message: "student created successfully"
            }
        )
    } catch (error) {
        next(error)
    }
}

exports.assignMentor = async (req, res, next) => {
    const student = req.body.student
    const mentor = req.body.mentor
    try {
        const studentData = await Student.findOne({ name: student })
        if (!studentData) {
            const error = new Error('Student with this name doesnt exist')
            error.status = 403
            throw error
        }

        const mentorData = await Mentor.findOne({ name: mentor })
        if (!mentorData) {
            const error = new Error('Mentor with this name doesnt exist')
            error.status = 403
            throw error
        }

        const pastStudent = mentorData.students.filter(studentId => studentId.equals(studentData._id))
        if (pastStudent.length) {
            const error = new Error('Student already assigned to this mentor')
            error.status = 403
            throw error
        }

        let prevMentor;

        if (studentData.currentMentor !== null) {
            studentData.previousMentor = studentData.currentMentor
            prevMentor = await Mentor.findOne({ _id: studentData.previousMentor })
            prevMentor.students = prevMentor.students.filter(studentId => !studentId.equals(studentData._id))
            await Mentor.findByIdAndUpdate({ _id: prevMentor._id }, prevMentor)
        }

        studentData.currentMentor = mentorData._id
        mentorData.students = mentorData.students.push(studentData._id)

        await Student.findByIdAndUpdate({ _id: studentData._id }, studentData)
        await Mentor.findByIdAndUpdate({ _id: mentorData._id }, mentorData)

        res.status(201).json(
            {
                message: "Student assigned succesfully to the provided Mentor"
            }
        )
    } catch (error) {
        next(error)
    }
}

exports.getPreviousMentor = async (req, res, next) => {
    const name = req.body.name
    try {
        const studentData = await Student.findOne({ name }).populate({ path: "previousMentor", select: "name" })
        if (!studentData) {
            const error = new Error('Student with this name doesnt exist')
            error.status = 403
            throw error
        }
        if (studentData.previousMentor === null)
            res.status(200).json({ message: name + " doesn't have previous mentor" })
        else
            res.status(200).json(
                {
                    message: "Date Retrieved successfully",
                    previousMentor: studentData.previousMentor
                })
    } catch (error) {
        next(error)
    }
}

