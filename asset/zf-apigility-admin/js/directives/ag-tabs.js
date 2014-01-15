'use strict';
/**
 * Borrowed from http://errietta.me/blog/bootstrap-angularjs-directives/
 */

var agTabs = angular.module('ag-tabs', []);

/* <ag-tabs ...>[<ag-tab-pane ...></ag-tab-pane>]</ag-tabs> */
agTabs.directive('agTabs', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });

                pane.selected = true;
            }

            this.addPane = function(pane) {
                if (panes.length == 0)
                    $scope.select(pane);

                panes.push(pane);
            }
        },
        template:
        '<div class="ag-tabs">' +
        '<ul class="nav nav-tabs">' +
        '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
        '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
        '</li>' +
        '</ul>' +
        '<div class="tab-content" ng-transclude></div>' +
        '</div>',
        replace: true
    };
});

/* <ag-tab-pane ...></ag-tab-pane> */
agTabs.directive('agTabPane', function() {
    return {
        require: '^agTabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
        replace: true
    };
});
