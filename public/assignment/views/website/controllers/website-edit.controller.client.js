(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.userId = userId;
        var websiteId = $routeParams['wid'];
        vm.websiteId = websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        var promise = WebsiteService.findWebsiteById(websiteId);
        //console.log("sent request");
        promise
            .success(function (website) {
                //console.log("received success reply");
                vm.website = website;
            })
            .error(function (err) {
                vm.error = "could not fetch website"
            });

        function updateWebsite() {
            var promise = WebsiteService.updateWebsite(websiteId, vm.website);
            promise
                .success(function (newWebsite) {
                    if (newWebsite) {
                        // console.log("website successfully updated");
                        $location.url("/user/" + userId + "/website");
                    } else {
                        vm.error = "failed to update website";
                        // console.log("failed to update website");
                    }
                })
                .error(function (err) {
                    vm.error = err.toString();
                });
        }

        function deleteWebsite() {
            var prmoise = WebsiteService.deleteWebsite(vm.websiteId);
            promise
                .success(function (deleted) {
                    if (deleted) {
                        //console.log("website successfully deleted");
                        $location.url("/user/" + userId + "/website");
                    } else {
                        vm.error = "failed to delete website";
                        // console.log("failed to delete website");
                    }
                })
                .error(function (err) {
                    vm.error = "failed to delete website";
                })

        }
    }

})();