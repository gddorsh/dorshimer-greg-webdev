module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String, require: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [String],
        dateCreated: { type: Date, default: Date.now() }
    }, {collection: 'assignment.user'});

    return UserSchema;
};