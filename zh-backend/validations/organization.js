const Organization = require('../models/organization');
const TokenOrg = require('../models/token-org');
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

    async isAuthenticated (accessToken) {
        try {
            const token = await TokenOrg.findOne({ accessToken });
            if (!(token instanceof TokenOrg)) {
                throw token;
            }
            return token;
        } catch (err) {
            return  { error: { message: "Organization is not authenticated" }};
        }
    }

    async saveAuthData (organizationId, accessToken) {
        const tokenOrganization = new TokenOrg({
            organizationId,
            accessToken
        });

        try {
            const token = await tokenOrganization.save();
            if(!token) {
                throw token;
            }
            return token.accessToken;
        } catch (err) {
            return  { error: { message: "Error while saving token" }};
        }
    }

    async deleteAuthData (organizationId) {
        try {
            await TokenOrg.findOneAndDelete({ organizationId });
        } catch (err) {
            return  { error: { message: "Error while deleting token" }};
        }
    }


    async validateRewardAndGetUser (accessToken, organizationId, rewardBody) {
        
        let organization;
        try {
            organization = await Organization.findById(organizationId);
            if(!organization) {
                throw organization;
            }
        } catch {
            return { error: { message: "Organization not found" }};
        }

        try {
            const token = await this.isAuthenticated(accessToken);
            if (!(token instanceof TokenOrg)) {
                throw token;
            }
        } catch (err) {
            return err;
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
            return { user, organizationName: organization.name };
        } catch {
            return { error: { message: "User not found" }};
        }
    }

}

module.exports = OrganizationValidation;