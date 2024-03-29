const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set('strictQuery', false);

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);