module.exports = function(mongoose) {

    var UserSchemaP = mongoose.Schema({
        username: {type: String, required: true},
        type: { type : String, enum : ['ADMIN', 'USER'], default: 'USER', required: true },
        password: {type: String, required: true},
        email: {type: String, required: true},
        items: [String],
        dateCreated: { type: Date, default: Date.now(), required: true }
    }, {collection: 'project.user'});

    return UserSchemaP;
};