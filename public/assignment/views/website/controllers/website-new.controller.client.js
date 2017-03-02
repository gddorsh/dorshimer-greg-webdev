(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        vm.createWebsite = createWebsite;
        vm.website = {};
        vm.website._id = (new Date()).getTime();
        vm.website.name = "";
        vm.website.developerId = userId;
        vm.website.description = "";

        function createWebsite() {
            if ((vm.website.name == "") || (vm.website.description == "")) {
                vm.error = 'Must fill in both fields.';
            } else {
                //console.log("into createWebsite method");
                var promise = WebsiteService.createWebsite(userId, vm.website);
                //console.log("sent promise");
                promise
                    .success(function(newWebsite) {
                        if (newWebsite) {
                            // console.log("successfully created new website");
                            $location.url('/user/' + userId + '/website');
                        } else {
                            // console.log('failed to create new website');
                            vm.error = "failed to create new website";
                        }
                    })
                    .error(function (err) {
                        vm.error = "failed to create new website";
                    });
            }
        }

    }

})();