
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem"},
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem"},
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem"},
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem"},
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem"}
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            users.push(website);
            for (var w in websites) {
                if (websites[w]._id === website._id) {
                    websites[w].userId = userId;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    sites.push(angular.copy(websites[w]));
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites[w] = website;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();