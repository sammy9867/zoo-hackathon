const Forest = require('../models/forest');

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

    async getRandomLocationByForestId (id) {
        const forest = await this.getForestById(id);
        const bounds = this.getPolygonBoundingBox(forest.coordinates);

        const x_min = bounds[0][0];
        const y_min = bounds[0][1];
        const x_max = bounds[1][0];
        const y_max = bounds[1][1];

        const latitude = y_min + (Math.random() * (y_max - y_min));
        const longitude = x_min + (Math.random() * (x_max - x_min));

        return { latitude, longitude };
    }

    getPolygonBoundingBox(coordinates) {
        let bounds = [[], []];

        for (let i = 0; i < coordinates.length; i++) {

            const longitude = coordinates[i][0];
            const latitude = coordinates[i][1];
    
            bounds[0][0] = bounds[0][0] < longitude ? bounds[0][0] : longitude;
            bounds[1][0] = bounds[1][0] > longitude ? bounds[1][0] : longitude;
            bounds[0][1] = bounds[0][1] < latitude ? bounds[0][1] : latitude;
            bounds[1][1] = bounds[1][1] > latitude ? bounds[1][1] : latitude;
        }

        return bounds;
    }
}

module.exports = ForestService;