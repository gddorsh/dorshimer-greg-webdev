module.exports = function (mongoose) {

    var PageSchema = mongoose.Schema({
        _website: String,
        name: String,
        title: String,
        description: String,
        widgets: [String],
        dateCreated: { type: Date, default: Date.now() }
    }, {collection: 'assignment.page'});

    return PageSchema;
};