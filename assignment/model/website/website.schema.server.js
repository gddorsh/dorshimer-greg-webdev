module.exports = function() {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: String, // TODO syntax for this??
        name: String,
        description: String,
        pages: [PageSchema], // TODO syntax for this??
        dateCreated: { type: Date, default: Date.now() }
    }, {collection: 'assignment.website'});

    return WebsiteSchema;
};