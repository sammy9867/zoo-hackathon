const Organization = require('../models/organization');
const OrganizationValidation = require('../validations/organization');
const OrganizationValidationInstance = new OrganizationValidation();


const UserFeed = require('../models/user-feed');
const User = require('../models/user');
const Reward = require('../models/reward');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class OrganizationService {

    async getOrganizationById (id) {
        try {
            const organization = await Organization.findById(id);
            if(!organization) {
                throw organization;
            } 
            return organization;
        } catch (err) {
            return err;
        }
    }

    async sendRewardsToUser (accessToken, organizationId, rewardBody) {
        // Check if the user has enough rewards
        let user, organizationName;
        try {
            let res = await OrganizationValidationInstance.validateRewardAndGetUser(accessToken, organizationId, rewardBody);
            user = res.user;
            organizationName = res.organizationName;
            if (!(user instanceof User)) {
                throw res;
            }
        } catch (err) {
            return err;
        }
    
        // Update user rewards
        try {
            const updatedRewards = user.rewards + rewardBody.reward;
            await User.findByIdAndUpdate(user._id, { rewards: updatedRewards }, { new: true });
        } catch (err) {
            return { error: { message: `Unknown Server Error`}};
        }

        const reward = new Reward({
            organizationId,
            userId: rewardBody.userId,
            reward: rewardBody.reward
        });

        const userFeed = new UserFeed({
            userId,
            description: `You received $${rewardBody.reward} from ${organizationName}.`,
            reward: true
        })

        try {
            const savedReward = await reward.save();
            await userFeed.save()

            return savedReward;
        } catch (err) {
            return err;
        }
    }

    async loginOrganization (organizationBody) {
        let errors;
        // Validate the organization
        errors = OrganizationValidationInstance.loginValidation(organizationBody);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Check if organization exists
        const organization =  await Organization.findOne({ email: organizationBody.email });
        if (!organization) {
            return { error: { code: 400, details: { message: "Email not found"} }};
        }

        // Compare given password with hash
        const validPassword = await OrganizationValidationInstance.isValidPassword(organizationBody.password, organization.password);
        if (!validPassword) {
            return { error: { code: 400, details: { message: "Invalid password"} }};
        }

        // Save access token
        try {
            const token = OrganizationValidationInstance.saveAuthData(organization._id.toString(), jwt.sign({_id: organization._id}, process.env.TOKEN_SECRET));
            return token;
        } catch (err) {
            return err;
        }
    }
    
    async logoutOrganization (organizationId) {
        // Check if organization exists
        try {
            await this.getOrganizationById(organizationId);
        } catch (err) {
            return err;
        }
    
        // Delete access token
        try {
            await OrganizationValidationInstance.deleteAuthData(organizationId);
        } catch (err) {
            return err;
        }
    } 

    async registerOrganization (organizationBody) {
        let errors;
        // Validate the organization
        errors = OrganizationValidationInstance.registerValidation(organizationBody);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Check if the organization already exists
        errors = await OrganizationValidationInstance.isAlreadyRegistered(organizationBody.email);
        if (errors.length > 0) {
            return { error: { code: 400, details: errors }};
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(organizationBody.password, salt);

        const organization = new Organization({
            name: organizationBody.name,
            email: organizationBody.email,
            password: hashedPassword
        });

        try {
            const registerdOrganization = await organization.save();
            return registerdOrganization;
        } catch (err) {
            return err;
        }
    }
}

module.exports = OrganizationService;