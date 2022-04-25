const User = require("../models/user.model");
const {loginSchema, registerSchema} = require("../utils/validation");
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    const {value, error} = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json(error.message);
    };
    let user = await User.findOne({email: value.email});
    if(user) {
        return res.status(409).json({msg: "Email already in use."});
    };

    const hashedPassword = await bcrypt.hash(value.password, 10);
    console.log(hashedPassword);

    user = await User.create({
        username: value.username,
        email: value.email,
        password: hashedPassword,
    });

    res.status(201).json(user);
};

const login = async (req, res) => {
    // validate user input
    const {value, error} = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    };
    // check id user is in database
    let user = await User.findOne({email: value.email});
    // if user is not found
    if(!user) {
        return res.status(400).json({msg: "Invalid credentials"})
    };
// compare candidate's password with the stored user's password
    const isMatch = await bcrypt.compare(value.password, user.password);

    // if password do not match
    if(!isMatch) {
        return res.status(400).json({msg: "Invalid credentials"})
};
res.status(200).json(user);
}
module.exports = {
    login,
    register
};