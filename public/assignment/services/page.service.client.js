
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            pages.push(page);
            for (var p in pages) {
                if (pages[p]._id === page._id) {
                    pages[p]._websiteId = websiteId;
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function findPagesByWebsiteId(websiteId) {
            var myPages = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    myPages.push(pages[p]);
                }
            }
            return myPages;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id == pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(p, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();