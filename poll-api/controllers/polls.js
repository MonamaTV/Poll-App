const pollSchema = require("../schemas/Poll");

//Bunch of functions😆
module.exports.getPolls = async (req, res) => {
    const PAGINATION = 10;

    const { query, page } = req.query;

    try {
        /*
          Find polls that matches the regex, then skip values based 
          on the page you are requesting from, always limit values to 10, and sort by date created,
        */
        const polls = await pollSchema
                    .find({question: {
                        $regex: `.*${query || ''}.*`
                    }}, {userEmail: 0})
                    .skip((page - 1) * PAGINATION)
                    .limit(PAGINATION)
                    .sort({createdAt: -1}); 


        res.status(200).send(polls);

    } catch (error) {
        res.status(400).send({
            message: "We are getting tired of your ass and making invalid requests",
            code: 400,
            details: error
        });   
    }
}

module.exports.getPollById = async (req, res) => {
    const { id } = req.params;


    if(!id) {
        return res.status(401).send({
            message: "Poll ID is not valid",
            code: 400
        });
    }

    try {
        const poll = await pollSchema.findOne({_id: id}, {userEmail: 0});
        res.status(200).send(poll);
    } catch (error) {
        res.status(400).send({
            message: "It seems like we do not have that poll",
            code: 400,
            details: error
        });
    }
}

module.exports.addPoll = async (req, res) => {

    const poll = req.body;

    if(poll === null) {
        return res.status(401).send({
            message: "You cannot add an empty poll",
            code: 400
        });
    }

    const savePoll = pollSchema({
        question: poll.question,
        endDate: poll.endDate,
        live: poll.live,
        options: poll.options,
        userEmail: poll.userEmail
    });
    
    try {
        
        const newPoll = await savePoll.save();

        res.status(201).send({
            poll: newPoll,
            message: "A new poll has been added",
            code: 301
        });

    }catch(error) {
        res.status(400).send({
            message: "Something happened",
            code: 400,
            details: error
        });
    }
}
//Updating the voting options
module.exports.updatePoll = async (req, res) => {
    //Get the poll that needs to be updated and the specific voting option
    const { id, elemID } = req.params;
    
    if(!id || !elemID) {
        return res.status(401).send({
            message: "There is nothing to update",
            code: 401
        });
    }

    try {
        const update = await pollSchema.updateOne({_id: id}, { 
            "$inc": {
                "options.$[elem].votes": 1
            }
        },{
            arrayFilters: [{"elem._id": elemID}]
        });

        res.status(200).send(update);
    } catch (error) {
        res.send({
            message: "We could not make an update",
            code: 400,
            details: error
        });
    }
}

module.exports.deletePoll = async (req, res) => {
    const { id, email } = req.params;

    if(!id || !email) {
        return res.status(400).send({
            message: "There is no item to delete",
            code: 400
        });
    }
    try {
        //No sure whether to delete the poll from the database or just change the property 'live' to false and use filter to get documents
        const poll = await pollSchema.deleteOne({_id: id, userEmail: email});
        res.status(200).send(poll);
    } catch (error) {
        res.status(400).send({
            message: "There is no poll that matches your request",
            code: 400,
            details: error
        })
    }
}