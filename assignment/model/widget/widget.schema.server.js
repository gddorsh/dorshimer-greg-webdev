module.exports = function (mongoose) {

    var WidgetSchema = mongoose.Schema({
        _page: String,
        type: { type : String, enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'] },
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
        deletable: { type: Boolean, default: true },
        formatted: { type: Boolean, default: true},
        sortIndex: { type: Number, default: 0 },
        dateCreated: { type: Date, default: Date.now() }
    }, {collection: 'assignment.widget'});

    return WidgetSchema;
};