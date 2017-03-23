module.exports = function(app) {
    var userModel = require('./model/user/user.model.server')();
    require('./services/user.service.server.js')(app, userModel);
    var websiteModel = require('./model/website/website.model.server')();
    require('./services/website.service.server.js')(app, websiteModel);
    var pageModel = require('./model/page/page.model.server')();
    require('./services/page.service.server.js')(app, pageModel);
    var widgetModel = require('./model/widget/widget.model.server')();
    require('./services/widget.service.server.js')(app, widgetModel);
};