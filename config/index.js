require('dotenv').config();

module.exports = {
    service: {
        prefix_url: process.env.PREFIX_URL,
        port: process.env.SERVICE_PORT || 5000,
        jwt_token: process.env.JWT_SECRET,
    },
    mongodb: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        database: process.env.MONGODB_DATABASE,
        host: process.env.MONGODB_HOST,
        port: process.env.MONGODB_PORT || 27017,
    }
}