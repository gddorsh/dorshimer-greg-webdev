(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: '/assignment/views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })

            .when("/login",{
                templateUrl: '/assignment/views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })

            .when("/register",{
                templateUrl: '/assignment/views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })

            .when("/user/:uid",{
                templateUrl: '/assignment/views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })

            .when("/user/:uid/website",{
                templateUrl: '/assignment/views/website/templates/website-list.view.client.html',
                controller: "WebsiteListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/new",{
                templateUrl: '/assignment/views/website/templates/website-new.view.client.html',
                controller: "WebsiteNewController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid",{
                templateUrl: '/assignment/views/website/templates/website-edit.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page",{
                templateUrl: '/assignment/views/page/templates/page-list.view.client.html',
                controller: "PageListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/new",{
                templateUrl: '/assignment/views/page/templates/page-new.view.client.html',
                controller: "PageNewController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl: '/assignment/views/page/templates/page-edit.view.client.html',
                controller: "PageEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: '/assignment/views/widget/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: '/assignment/views/widget/templates/widget-chooser.view.client.html',
                controller: "WidgetNewController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: '/assignment/views/widget/templates/widget-edit.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: '/'
            });
    }

})();