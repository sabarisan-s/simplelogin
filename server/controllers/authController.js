const { userModel } = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
    res.json({
        message: "test is working",
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: "Name is  Required",
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "password is requires and should be minium 6 character",
            });
        }
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ error: "email already taken" });
        }
        const hashedPassword = await bcrypt.hash(password, 9);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.json(user);
    } catch (error) {
        console.log(error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ error: "no user found" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (comparePassword) {
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;

                    res.cookie("token", token).json(user);
                }
            );
        }

        if (!comparePassword) {
            res.json({ error: "wrong Password" });
        }
    } catch (error) {
        console.log(error.message);
    }
};
const getProfileUser = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

module.exports = { test, registerUser, loginUser, getProfileUser };
