module.exports = function(app, mongoose, rest) {
    var APIkey = 'RUQxfUQ6EXClKOgfXDtdYJrvWlX3swivBA8NZkMB';

    var UserModelP = require('./models/user.model.server')(mongoose);
    require('./services/user.service.server.js')(app, UserModelP);
    require('./services/object.service.server.js')(app, rest, APIkey);
};