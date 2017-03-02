(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                handle: ".wbdv-sortable-handle"
            });
        }
        return {
            link: linkFunc
        };
    }
})();