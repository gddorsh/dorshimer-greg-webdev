(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        userId = $routeParams['uid'];
        vm.userId = userId;
        vm.createWebsite = createWebsite;
        vm.websites = WebsiteService.findWebsitesByUser(userId);
        vm.website = {};
        vm.website._id = (new Date()).getTime();
        vm.website.name = "";
        vm.website.developerId = userId;
        vm.website.description = "";

        function createWebsite() {
            if ((vm.website.name == "") || (vm.website.description == "")) {
                vm.error = 'Must fill in both fields.';
            } else {
                var newWebsite = WebsiteService.createWebsite(vm.website);

                if (newWebsite) {
                    // console.log("successfully created new website");
                    $location.url('/user/' + userId + '/website');
                } else {
                    console.log('failed to create new website');
                }
            }
        }

    }

})();