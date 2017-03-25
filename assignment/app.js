module.exports = function(app, mongoose) {
    var UserModel = require('./model/user/user.model.server')(mongoose);
    require('./services/user.service.server.js')(app, UserModel);
    var WebsiteModel = require('./model/website/website.model.server')(mongoose, UserModel);
    require('./services/website.service.server.js')(app, WebsiteModel);
    var PageModel = require('./model/page/page.model.server')(mongoose, WebsiteModel);
    require('./services/page.service.server.js')(app, PageModel);
    var WidgetModel = require('./model/widget/widget.model.server')(mongoose, PageModel);
    require('./services/widget.service.server.js')(app, WidgetModel);
};