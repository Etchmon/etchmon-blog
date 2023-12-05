const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, default: DateTime.now().toLocaleString(DateTime.DATE_FULL), required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);