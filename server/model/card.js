const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema({
    image: {
        type: String
    },
    nameArt: {
        type: String
    },
    description: {
        type: String
    },
})
module.exports = Mongoose.model('card', UserSchema)