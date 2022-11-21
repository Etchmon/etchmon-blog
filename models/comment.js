const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    text: { type: String, required: true, minLength: 1, maxLength: 1000 }
});

module.exports = mongoose.model("Comment", CommentSchema);