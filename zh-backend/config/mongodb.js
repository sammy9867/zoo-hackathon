require('dotenv').config();

module.exports = {
    URI: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`,
};