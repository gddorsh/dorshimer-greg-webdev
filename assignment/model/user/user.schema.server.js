module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        phone: String,
        websites: [String],
        dateCreated: { type: Date, default: Date.now(), required: true }
    }, {collection: 'assignment.user'});

    return UserSchema;
};