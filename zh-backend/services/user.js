const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {

    async getUsers () {
        try {
            const users = await User.find();
            return users;
        } catch (err) {
            return err;
        }
    }

    async loginUser (userBody) {
        let errors;
        // Validate the user
        errors = this.loginValidation(userBody);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Check if user exists
        const user =  await User.findOne({ email: userBody.email });
        if (!user) {
            return { error: { code: 400, details: { message: "Email not found"} }};
        }

        // Compare given password with hash
        const validPassword = await this.isValidPassword(userBody.password, user.password);
        if (!validPassword) {
            return { error: { code: 400, details: { message: "Invalid password"} }};
        }

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        return token;
    }

    async registerUser (userBody) {
        let errors;
        // Validate the user
        errors = this.registerValidation(userBody);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Check if the user already exists
        errors = await this.isAlreadyRegistered(userBody.userName, userBody.email);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userBody.password, salt);

        const user = new User({
            userName: userBody.userName,
            email: userBody.email,
            password: hashedPassword,
            firstName: userBody.firstName,
            lastName: userBody.lastName,
        });

        try {
            const registerdUser = await user.save();
            return registerdUser;
        } catch (err) {
            return err;
        }
    }

    loginValidation (userBody) {
        const { email, password } = userBody;

        let errors = [];
        
        if (!email || !password) {
            errors.push({ message: 'Please fill in all the fields.'});
        }

        if (password.length <  6) {
            errors.push({message: 'Password should be atleast 6 characters'});
        }

        return errors;
    }

    registerValidation (userBody) {
        const { userName, email, password, passwordAgain, firstName, lastName } = userBody;

        let errors = [];
        
        if (!userName || !email || !password || !passwordAgain || !firstName || !lastName) {
            errors.push({ message: 'Please fill in all the fields.'});
        }

        if (password !== passwordAgain) {
            errors.push({ message: 'Passwords do not match.'});
        }

        if (password.length <  6) {
            errors.push({message: 'Password should be atleast 6 characters'});
        }

        return errors;
    }

    async isAlreadyRegistered (userName, email) {
        let errors = [];

        const userNameExist = await User.findOne({ userName });
        if (userNameExist) {
            errors.push({message: "Username already exists."});
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) { 
            errors.push({message: "Email already exists."});
        }

        return errors;
    }

    async isValidPassword (password, hashedPassword) {
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if (!validPassword) {
            return false;
        }
        return true;
    }
}

module.exports = UserService;