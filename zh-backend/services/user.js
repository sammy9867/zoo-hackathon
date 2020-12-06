const User = require('../models/user');
const UserValidation = require('../validations/user');
const UserValidationInstance = new UserValidation();

const Donations = require('../models/donations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {

    async getUserById (id) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (err) {
            return err;
        }
    }

    async donateToNonProfit (userId, donateBody) {
        // Check if the user has enough rewards
        let user;
        try {
            user = await UserValidationInstance.hasEnoughRewards(userId, donateBody);
            if (!user.rewards) {
                throw user;
            }
        } catch (e) {
            return e;
        }
       
        // Deduct user rewards
        try {
            const deductedRewards = user.rewards - donateBody.donations;
            await User.findByIdAndUpdate(userId, { rewards: deductedRewards }, { new: true });
        } catch (err) {
            return { error: { message: `Unknown Server Error`}};
        }

        const donation = new Donations({
            userId,
            nonProfitId: donateBody.nonProfitId,
            donations: donateBody.donations
        });

        try {
            const savedDonation = await donation.save();
            return savedDonation;
        } catch (err) {
            return err;
        }
    }

    async loginUser (userBody) {
        let errors;
        // Validate the user
        errors = UserValidationInstance.loginValidation(userBody);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Check if user exists
        const user =  await User.findOne({ email: userBody.email });
        if (!user) {
            return { error: { code: 400, details: { message: "Email not found"} }};
        }

        // Compare given password with hash
        const validPassword = await UserValidationInstance.isValidPassword(userBody.password, user.password);
        if (!validPassword) {
            return { error: { code: 400, details: { message: "Invalid password"} }};
        }

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        return token;
    }

    async registerUser (userBody) {
        let errors;
        // Validate the user
        errors = UserValidationInstance.registerValidation(userBody);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Check if the user already exists
        errors = await UserValidationInstance.isAlreadyRegistered(userBody.userName, userBody.email);
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
}

module.exports = UserService;