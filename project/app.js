module.exports = function(app, mongoose, rest, passport) {
    var APIkey = 'RUQxfUQ6EXClKOgfXDtdYJrvWlX3swivBA8NZkMB';

    var UserModelP = require('./models/user.model.server')(mongoose);
    require('./services/user.service.server.js')(app, UserModelP, passport);
    require('./services/object.service.server.js')(app, rest, APIkey);
};