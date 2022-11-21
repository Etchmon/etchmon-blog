const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.new, required: true }
});

PostSchema.virtual('date').get(function () {
    return DateTime.fromJSDate(this.timestamp).toFormat("dd-MM-yyyy");
});

module.exports = mongoose.model("Post", PostSchema);