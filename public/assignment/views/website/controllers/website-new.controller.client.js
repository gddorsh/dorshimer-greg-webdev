(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        userId = $routeParams['uid'];
        vm.userId = userId;
        vm.website = {};
        vm.website.name = "";
        vm.website._user = userId;
        vm.website.description = "";
        vm.createWebsite = createWebsite;

        function createWebsite() {
            if ((vm.website.name == "") || (vm.website.description == "")) {
                vm.error = 'Must fill in both fields.';
            } else {
                //console.log("into createWebsite method");
                WebsiteService.createWebsite(userId, vm.website)
                //console.log("sent promise");
                    .then(function(newWebsite) {
                        if (newWebsite) {
                            // console.log("successfully created new website");
                            $location.url('/user/' + userId + '/website');
                        } else {
                            // console.log('failed to create new website');
                            vm.error = "failed to create new website";
                        }
                    }, function (err) {
                        vm.error = "failed to create new website";
                    });
            }
        }

    }

})();