(function () {
    angular
        .module("Project")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })

            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })

            .when("/admin/:id",{ // an admin viewing his own profile
                templateUrl: 'views/user/templates/adminprofile.view.client.html',
                controller: 'AdminProfileController',
                controllerAs: 'model'
            })

            .when("/user/:id",{ // a user viewing his own profile
                templateUrl: 'views/user/templates/userprofile.view.client.html',
                controller: 'UserProfileController',
                controllerAs: 'model'
            })

            .when("/admin/:id/public/:uid",{ // an admin viewing another user's public profile
                templateUrl: 'views/object/templates/adminpublicuserprofile.view.client.html',
                controller: 'AdminPublicUserProfileController',
                controllerAs: 'model'
            })

            .when("/user/:id/public/:uid",{ // a user viewing another user's public profile
                templateUrl: 'views/object/templates/userpublicuserprofile.view.client.html',
                controller: 'UserPublicUserProfileController',
                controllerAs: 'model'
            })

            .when("/admin/:id/search",{ // an admin viewing the search page
                templateUrl: 'views/object/templates/adminsearch.view.client.html',
                controller: 'AdminSearchController',
                controllerAs: 'model'
            })

            .when("/user/:id/search",{ // a user viewing the search page
                templateUrl: 'views/object/templates/usersearch.view.client.html',
                controller: 'UserSearchController',
                controllerAs: 'model'
            })

            .when("/user/:id/favorites",{ // a user viewing his own favorites
                templateUrl: 'views/user/templates/favorites.view.client.html',
                controller: 'FavoritesController',
                controllerAs: 'model'
            })

            .when("/user/:id/item/:iid",{ // the details page of that record from the open DB
                templateUrl: 'views/object/templates/details.view.client.html',
                controller: 'DetailsController',
                controllerAs: 'model'
            })

            .otherwise({
                redirectTo: '/login'
            });
    }

})();