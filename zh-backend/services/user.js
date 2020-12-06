const User = require('../models/user');
const UserValidation = require('../validations/user');
const UserValidationInstance = new UserValidation();
const TokenUser = require('../models/token-user');

const Donation = require('../models/donation');
const Reward = require('../models/reward');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {

    async getUserById (id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw user;
            }
            return user;
        } catch (err) {
            return err;
        }
    }

    async getDonationsByUserId (accessToken, userId) {
        try {
            const token = await UserValidationInstance.isAuthenticated(accessToken);
            if (!(token instanceof TokenUser)) {
                throw token;
            }
        } catch (err) {
            return err;
        }

        try {
            const user = await Donation.find({ userId });
            if (!user) {
                throw user;
            }
            return user;
        } catch (err) {
            return err;
        }
    }

    async getRewardsByUserId (accessToken, userId) {
        try {
            const token = await UserValidationInstance.isAuthenticated(accessToken);
            if (!(token instanceof TokenUser)) {
                throw token;
            }
        } catch (err) {
            return err;
        }

        try {
            const user = await Reward.find({ userId });
            if (!user) {
                throw user;
            }
            return user;
        } catch (err) {
            return err;
        }
    }

    async donateToNonProfit (accessToken, userId, donateBody) {
        // Check if the user has enough rewards
        let user;
        try {
            user = await UserValidationInstance.donationValidation(accessToken, userId, donateBody);
            if (!(user instanceof User)) {
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

        const donation = new Donation({
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

        // Save access token
        try {
            const token = UserValidationInstance.saveAuthData(user._id.toString(), jwt.sign({_id: user._id}, process.env.TOKEN_SECRET));
            return token;
        } catch (err) {
            return err;
        }
    }

    async logoutUser (userId) {
        // Check if user exists
        try {
            await this.getUserById(userId);
        } catch (err) {
            return err;
        }

        // Delete access token
        try {
            await UserValidationInstance.deleteAuthData(userId);
        } catch (err) {
            return err;
        }
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