const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    passwordHash: { type: String, required: true, }
});

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// userSchema.set('toJSON', {
//     virtuals: true,
// });

const user = new mongoose.model("user_details", userSchema);

module.exports = user;
