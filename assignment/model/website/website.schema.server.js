module.exports = function(mongoose) {

    var WebsiteSchema = mongoose.Schema({
        _user: String,
        name: String,
        description: String,
        pages: [String],
        dateCreated: { type: Date, default: Date.now() }
    }, {collection: 'assignment.website'});

    return WebsiteSchema;
};