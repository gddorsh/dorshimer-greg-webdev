module.exports = function(app, mongoose) {
    var UserModelP = require('./models/user.model.server')(mongoose);
    require('./services/user.service.server.js')(app, UserModelP);
    require('./services/object.service.server.js')(app, UserModelP);
};