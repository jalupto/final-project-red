const Express = require('express');
const router = Express.Router();
const validateToken = require("../middleware/validate-token");
const { Fav } = require("../models");

/*
=========================================
Create Favorite
=========================================
*/
router.post("/", validateToken, async (req, res) => {
    const { queen, season } = req.body.favs;
    const userId = req.user.id;
    const favEntry = {
        queen,
        season,
        userId: userId
    }
    try {
        const newFav = await Fav.create(favEntry);
        res.status(200).json({
            message: "Favorite saved!",
            newFav
        });
    } catch(err) {
        res.status(500).json({
            error: err,
            message: "Unable to create favorite."
        });
    }
})

/*
=========================================
View User Favorite
=========================================
*/

router.get("/", validateToken, async (req, res) => {
    const { id } = req.user;

    try {
        const favByUser = await Fav.findAll({
            where: {
                userId: id
            },
        });
        res.status(200).json(favByUser);
    } catch (err) {
        res.status(500).json({ 
            error:err,
            message: "Unable to retrieve favorites."
        });
    }
});

/*
=========================================
Update Favorite
=========================================
*/

router.put('/:id', validateToken, async(req, res) => {
    const { queen, season } = req.body.favs;
    const favId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: favId,
            userId: userId
        }
    };

    console.log(favId, userId);

    const updatedFav = {
        queen: queen,
        season: season
    };

    try {
        const update = await Fav.update(updatedFav, query);
        res.status(200).json({
            message: 'Fav entry updated.',
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
Delete Favorite
=========================================
*/

router.delete('/:id', validateToken, async(req, res) => { 
    const userId = req.user.id;
    const favId = req.params.id;

    try {
        const query = {
            where: {
                id: favId,
                userId: userId
            }
        };

        await Fav.destroy(query);
        res.status(200).json({ message: 'Fav entry removed.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;