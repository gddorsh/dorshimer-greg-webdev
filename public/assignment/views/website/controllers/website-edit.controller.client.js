(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        WebsiteService.findWebsiteById(websiteId)
            .then(function (website) {
                //console.log("received success reply");
                vm.website = website.data;
            }, function (err) {
                vm.error = "failed to get website"
            });

        function updateWebsite() {
            WebsiteService.updateWebsite(websiteId, vm.website)
                .then(function (newWebsite) {
                    if (newWebsite) {
                        // console.log("website successfully updated");
                        $location.url("/user/" + userId + "/website");
                    } else {
                        vm.error = "failed to update website";
                        // console.log("failed to update website");
                    }
                }, function (err) {
                    vm.error = err.toString();
                });
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId)
                .then(function (deleted) {
                    if (deleted) {
                        //console.log("website successfully deleted");
                        $location.url("/user/" + userId + "/website");
                    } else {
                        vm.error = "failed to delete website";
                        // console.log("failed to delete website");
                    }
                }, function (err) {
                    vm.error = "failed to delete website";
                })
        }

    }

})();