(function(){
    angular
        .module("Project")
        .factory('ObjectService', ObjectService);

    function ObjectService($http) {

        var api = {
            "findItemById": findItemById, // itemId
            "findItemsForSearch": findItemsForSearch // query string
        };
        return api;

        function findItemById(itemId) {
            return $http.get("/projectapi/item/" + itemId);
        }

        function findItemsForSearch(queryString) {
            return $http.get("/projectapi/search/" + queryString);
        }
    }
})();