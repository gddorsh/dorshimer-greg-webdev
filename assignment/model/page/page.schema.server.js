module.exports = function () {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: String, // TODO reference, not full website object
        name: String,
        title: String,
        description: String,
        widgets: [WidgetSchema], // TODO same type issue
        dateCreated: { type: Date, default: Date.now() }
    }, {collection: 'assignment.page'});

    return PageSchema;
};