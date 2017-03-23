module.exports = function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page: PageSchema, // TODO change type on this
        type: { type : String, enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'] },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: { type: Date, default: Date.now() },
        sortIndex: Number
    }, {collection: 'assignment.widget'});

    return WidgetSchema;
};