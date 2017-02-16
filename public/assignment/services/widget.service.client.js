(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO" },
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum" },
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://i.imgur.com/gRDmTYkr.jpg" },
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem Ipsum</p>" },
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum" },
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum 2</p>" }
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widgets.push(widget);
            for (var wg in widgets) {
                if (widgets[wg]._id === widget._id) {
                    widgets[wg].pageId = pageId;
                    return angular.copy(widgets[wg]);
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var myWidgets = [];
            for (wg in widgets) {
                if (wg.pageId === pageId) {
                    myWidgets.push(widgets[wg]);
                }
            }
            return myWidgets;
        }

        function findWidgetById(widgetId) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetId) {
                    return angular.copy(widgets[wg]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetId) {
                    widgets[wg] = widget;
                    return angular.copy(widgets[wg]);
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetId) {
                    widgets.splice(wg, 1);
                }
            }
        }
    }
})();