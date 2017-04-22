(function(){
    angular
        .module("Project")
        .factory('UserService', UserService);

    function UserService($http) {

        var api = {
            "createUser": createUser, // user object
            "findUserById": findUserById, // userId
            "findUserByCredentials": findUserByCredentials, // username and pass
            "findUsersForSearch": findUsersForSearch, // query string
            "updateUser": updateUser,// userId and user
            "deleteUser": deleteUser // just id
        };
        return api;

        function createUser(user) {
            return $http.post("/projectapi/user", user);
        }

        function findUserById(userId) {
            return $http.get("/projectapi/user/" + userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/projectapi/user?username=" + username + "&password=" + password);
        }

        function findUsersForSearch(queryString) {
            return $http.get("/projectapi/search/user/" + queryString);
        }

        function updateUser(userId, user) {
            return $http.put("/projectapi/user/" + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete("/projectapi/user/" + userId);
        }
    }
})();