const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentScheme = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        currentMentor: {
            type: Schema.Types.ObjectId,
            ref: "Mentor",
            default: null
        },
        previousMentor: {
            type: Schema.Types.ObjectId,
            ref: "Mentor",
            default: null
        }
    }
)

module.exports = mongoose.model("Student", studentScheme)