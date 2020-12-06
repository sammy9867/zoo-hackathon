const User = require('../models/user');
const TokenUser = require('../models/token-user');
const NonProfit = require('../models/non-profit');
const bcrypt = require('bcryptjs');

class UserValidation {

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

    async isAuthenticated (accessToken) {
        try {
            const token = await TokenUser.findOne({ accessToken });
            if (!(token instanceof TokenUser)) {
                throw token;
            }
            return token;
        } catch (err) {
            return  { message: "User is not authenticated" };
        }
    }

    async saveAuthData (userId, accessToken) {
        const tokenUser = new TokenUser({
            userId,
            accessToken
        });

        try {
            const token = await tokenUser.save();
            if(!token) {
                throw token;
            }
            return token.accessToken;
        } catch (err) {
            return  { error: { message: "Error while saving token" }};
        }
    }

    async deleteAuthData (userId) {
        try {
            await TokenUser.findOneAndDelete({ userId });
        } catch (err) {
            return  { error: { message: "Error while deleting token" }};
        }
    }

    async donationValidation (accessToken, userId, donateBody) {
        let user;
        try {
            user = await User.findById(userId);
            if(!user) {
                throw user;
            }
        } catch (err) {
            return  { error: { message: "User not found" }};
        }

        try {
            const token = await this.isAuthenticated(accessToken);
            if (!(token instanceof TokenUser)) {
                throw token;
            }
        } catch (err) {
            return { error: err };
        }

        const { nonProfitId, donations } = donateBody;

        if(!nonProfitId || !donations) {
            return  { error: { message: "NonProfitId or donations not found" }};
        }

        if (user.rewards === 0 || user.rewards < donateBody.donations) {
            return { error: { message: `User ${user.userName} doesn't have enough rewards` }};
        }

        try {
            await NonProfit.findById(nonProfitId);
        } catch {
            return  { error: { message: "NonProfit not found" }};
        }

        return user;
    }

}

module.exports = UserValidation;