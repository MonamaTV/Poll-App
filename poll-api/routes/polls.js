const express = require('express');
2
const router = express.Router();

const { getPolls, 
        getPollById, 
        addPoll, 
        updatePoll,
        deletePoll} = require('../controllers/polls')

//@route GET
//@desc Get all the polls
router.get("/", getPolls);

//@route GET/:id
//desc Returns the poll that matches the ID
router.get("/:id", getPollById);

//@route POST
//@desc Adding a new poll
router.post("/", addPoll);

//@route PATCH/:id/:elemID 
//@desc The id is the poll that needs to be updated and the elemID that needs to be incremented
router.patch("/:id/:elemID", updatePoll);

//@route DELETE /:id:/email
//@desc The id of the poll and the email of the user that created the poll
router.delete("/:id/:email", deletePoll);

module.exports = router;