const Express = require('express');
const router = Express.Router();
const validateToken = require("../middleware/validate-token");
const { Vote } = require("../models");

/*
=========================================
Create Vote
=========================================
*/
router.post("/", validateToken, async (req, res) => {
    const { queen, season } = req.body.votes;
    const userId = req.user.id;
    const voteEntry = {
        queen,
        season,
        userId: userId
    }
    try {
        const newVote = await Vote.create(voteEntry);
        res.status(200).json({
            message: "Vote saved!",
            newVote
        });
    } catch(err) {
        res.status(500).json({
            error: err,
            message: "Unable to cast vote."
        });
    }
})

/*
=========================================
View User Votes
=========================================
*/

router.get("/", validateToken, async (req, res) => {
    const { id } = req.user;

    try {
        const voteByUser = await Vote.findAll({
            where: {
                userId: id
            },
        });
        res.status(200).json(voteByUser);
    } catch (err) {
        res.status(500).json({ 
            error:err,
            message: "Unable to retrieve votes."
        });
    }
});

/*
=========================================
Update Vote
=========================================
*/

router.put('/:id', validateToken, async(req, res) => {
    const { queen, season } = req.body.votes;
    const voteId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: voteId,
            userId: userId
        }
    };

    console.log(voteId, userId);

    const updatedVote = {
        queen: queen,
        season: season
    };

    try {
        const update = await Vote.update(updatedVote, query);
        res.status(200).json({
            message: 'Vote updated.',
            update
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!',
            error: err
        });
    }
});

/*
=========================================
Delete Vote
=========================================
*/

router.delete('/:id', validateToken, async(req, res) => { 
    const userId = req.user.id;
    const voteId = req.params.id;

    try {
        const query = {
            where: {
                id: voteId,
                userId: userId
            }
        };

        await Vote.destroy(query);
        res.status(200).json({ message: 'Vote removed.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;