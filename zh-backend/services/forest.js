const Forest = require("../models/forest");

class ForestService {

    async getForests () {
        try {
            const forests = await Forest.find();
            return forests;
        } catch (err) {
            return err;
        }
    }

    async getForestById (id) {
        try {
            const forest = await Forest.findById(id);
            return forest;
        } catch (err) {
            return err;
        }
    }

    async addForest (forestBody) {
        const forest = new Forest({
            name: forestBody.name,
            city: forestBody.city,
            country: forestBody.country
        });

        try {
            const savedForest = await forest.save();
            return savedForest;
        } catch (err) {
            return err;
        }
    }

}

module.exports = ForestService;