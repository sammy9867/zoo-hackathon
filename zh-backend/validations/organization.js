const Organization = require('../models/organization');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

class OrganizationValidation {

    loginValidation (organizationBody) {
        const { email, password } = organizationBody;

        let errors = [];
        
        if (!email || !password) {
            errors.push({ message: 'Please fill in all the fields.'});
        }

        if (password.length <  6) {
            errors.push({message: 'Password should be atleast 6 characters'});
        }

        return errors;
    }

    registerValidation (organizationBody) {
        const { name, email, password, passwordAgain } = organizationBody;

        let errors = [];
        
        if (!name || !email || !password || !passwordAgain) {
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

    async isAlreadyRegistered (email) {
        let errors = [];

        const emailExist = await Organization.findOne({ email });
        if (emailExist) { 
            errors.push({ message: "Email already exists." });
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

    async validateRewardAndGetUser (organizationId, rewardBody) {
        
        try {
            const organization = await Organization.findById(organizationId);
            if(!organization) {
                throw organization;
            }
        } catch {
            return { error: { message: "Organization not found" }};
        }

        const { userId, reward } =  rewardBody;

        if(!userId || !reward) {
            return { error: { message: "UserId or reward not found" }};
        }

        if(reward <= 5) {
            return { error: { message: "Rewards should be atleast 5 pounds" }};
        }

        try {
            const user = await User.findById(userId);
            if(!user) {
                throw user;
            }
            return user;
        } catch {
            return { error: { message: "User not found" }};
        }
    }

}

module.exports = OrganizationValidation;