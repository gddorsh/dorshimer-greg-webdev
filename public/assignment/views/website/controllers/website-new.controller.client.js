(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        userId = $routeParams['uid'];
        vm.userId = userId;
        vm.createWebsite = createWebsite;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();

        function createWebsite(website) {
            var newWebsite = website;
            if (website) {
                newWebsite._id = (new Date()).getTime();
                newWebsite.developerId = userId;
                WebsiteService.updateWebsite(newWebsite);
                $location.url('/user/' + userId + '/website');
            } else {
                vm.error = 'Must fill in both fields.';
            }
        }
    }

})();