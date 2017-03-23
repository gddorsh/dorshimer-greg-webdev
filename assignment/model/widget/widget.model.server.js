module.exports = function() {

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
        //reorderWidget: reorderWidget
    };

    return api;

    var mongoose = require('mongoose');
    var q = require('q');
    var WidgetSchema = require('./widget.schema.server.js')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
    var PageModel = require('../page/page.model.server');

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        WidgetModel
            .create(widget, function(err, newWidget) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var promise = PageModel.findPageById(pageId);
                    promise
                        .success(function(page) {
                            newWidget.sortIndex = page.widgets.length;
                            page.widgets.push(newWidget._id);
                            var promise2 = PageModel.updatePage(pageId, page);
                            promise2
                                .success(function(page2) {
                                    deferred.resolve(newWidget);
                                })
                                .error(function(page2) {
                                    deferred.reject(new Error("Website not found"));
                                });
                        })
                        .error(function(page) {
                            deferred.reject(page);
                        });
                }
            });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var promise = PageModel.findWebsiteById(pageId);
        promise
            .success(function(page) {
                return page.widgets;
            })
            .error(function(page) {
                return new Error("User not found");
            });
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .find({ _id : widgetId }, function(err, widget) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        WidgetModel
            .update({ _id : widgetId }, { $set: { name: widget.name,
                                                  text: widget.title,
                                                  description: widget.description,
                                                  url: widget.url,
                                                  width: widget.width,
                                                  height: widget.height,
                                                  rows: widget.rows,
                                                  size: widget.size,
                                                  class: widget.class,
                                                  icon: widget.icon,
                                                  deletable: widget.deletable,
                                                  formatted: widget.formatted }},
                function(err, widget) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        WidgetModel
            .remove({ _id: widgetId }, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(widgetId);
                }
            });
        return deferred.promise;
    }

    /*
    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();
        var promise = PageModel.findPageById(pageId);
        promise
            .success(function(page) {
                var myWidget = page.widgets[start];
                page.widgets.splice(start, 1);
                page.widgets.splice(end, 0, myWidget);
                var promise2 = PageModel.updatePage
            })
            .error(function(page) {
                return deferred.reject(new Error("Page not found"));
            });
        return deferred.promise;
    }*/
};