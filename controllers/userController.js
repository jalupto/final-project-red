const router = require("express").Router();
const { User } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateToken = require("../middleware/validate-token");
const validateAdmin = require("../middleware/validate-admin");

/*
========================================================================================================
REGISTER USER
========================================================================================================
*/

router.post("/register", async (req, res) => {
    let { email, password } = req.body.user;
    try{
        let isAdmin = req.body.user.isAdmin ? req.body.user.isAdmin : false
        const newUser = await User.create({
            email,
            password: bcrypt.hashSync(password, 13),
            isAdmin
        });
        let token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    
        res.status(201).json({
            message: "User successfully registered",
            user: newUser,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }
});

/*
========================================================================================================
LOGIN USER
========================================================================================================
*/

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;
    try{   
        const loginUser = await User.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {
            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60* 24});

            res.status(200).json({
                message: "User successfully logged in!",
                user: loginUser,
                sessionToken: token
            });
            } else {
                res.status(401).json({
                    message: "Login failed",
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect username or password"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to login user",
        });
    }
});

/*
========================================================================================================
UPDATE USER
========================================================================================================
*/
/*
router.put('/:id', validateToken, async(req, res) => {
    let { newEmail, newPassword } = req.body.user;
    const userId = req.user.id;

    const query = {
        where: {
            id: userId
        }
    };

    console.log(userId, email, password);

    const updatedUser = {
        email: newEmail,
        password: newPassword
    };

    try {
        const update = await User.update(updatedUser, query);
        res.status(200).json({
            message: 'User updated.',
            update
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!',
            error: err
        });
    }
});
*/
/*
========================================================================================================
DELETE USER
========================================================================================================
*/

router.delete('/', validateToken, async(req, res) => {
const userId = req.user.id;
const userEmail = req.user.email;

    try {
        const query = {
            where: {
                id: userId,
                email: userEmail
            },
        }

        await User.destroy(query);

        res.status(200).json({
            message: `Account #${userId} corresponding with user ${userEmail} has been removed.`,
        })
    } catch (err) {
        res.status(500).json({ message: 'Unable to remove account.' });
    }
});

/*
========================================================================================================
ADMIN
========================================================================================================
*/

router.get('/all', [validateToken, validateAdmin], async(req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve users', err });
    }
});

router.get('/:id', [validateToken, validateAdmin], async(req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await User.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json(foundUser);
    } catch (err) {
        res.status(500).json({ message: 'Failed to find user', err });
    }
});

router.delete('/:id', [validateToken, validateAdmin], async(req, res) => {
    const { id } = req.params;
    try {
        const query = {
            where: {
                id: id
            }
        };
        await User.destroy(query);
        res.status(200).json({
            message: `User ${id} has been removed.`
        });
    } catch (err) {
        res.status(500).json({ message: "User won't go away.", err });
    }
});

module.exports = router;