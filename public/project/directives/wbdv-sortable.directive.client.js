(function () {
    angular
        .module('Project')
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                handle: ".wbdv-sortable-handle"
                // should grab handle classname from attributes, but didn't get to that
            });
        }
        return {
            link: linkFunc
        };
    }
})();