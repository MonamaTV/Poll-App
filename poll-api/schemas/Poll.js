const mongoose = require("mongoose");

const requirements = {
    required: true,
    type: String,
};

const optionSchema = mongoose.Schema({
    name: requirements,
    votes: {
        type: Number,
        default: 0
    }
});

const PollSchema = mongoose.Schema({
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        required: true, 
        default: Date.now
    },
    userEmail: requirements,
    live: {
        type: Boolean,
        required: true,
    },
    question: requirements,
    options: [
        optionSchema
    ]
});

module.exports = mongoose.model("Poll", PollSchema);