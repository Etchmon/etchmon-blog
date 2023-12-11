const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set('strictQuery', false);

const CommentSchema = new Schema({
    text: { type: String, required: true, minLength: 1, maxLength: 1000 },
    date: { type: Date, default: Date.now, required: true },
    postId: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);