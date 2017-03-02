(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({axis: 'y'});
        }
        return {
            link: linkFunc
        };
    }
})();