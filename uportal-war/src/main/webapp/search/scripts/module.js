/*
 *Licensed to Apereo under one or more contributor license
 *agreements. See the NOTICE file distributed with this work
 *for additional information regarding copyright ownership.
 *Apereo licenses this file to you under the Apache License,
 *Version 2.0 (the "License"); you may not use this file
 *except in compliance with the License.  You may obtain a
 *copy of the License at the following location:
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *Unless required by applicable law or agreed to in writing,
 *software distributed under the License is distributed on an
 *"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *KIND, either express or implied.  See the License for the
 *specific language governing permissions and limitations
 *under the License.
 *
 */

(function(window, _) {
    'use strict';

    if (window.up.ngApp) {
        //If loaded, register right away.
        register(window.up.ngApp);
    } else {
        //Otherwise, let jsp call your bootstrapper once angular is loaded.
        window.up = window.up || {};

        window.up.ngRegister = window.up.ngRegister || {};
        window.up.ngRegister.search = register;

        window.up.ngBootstrap = window.up.ngBootstrap || {};
        window.up.ngBootstrap.search = function(n, opts) {
            var app = angular.module(n + '-search', []);
            register(app);

            opts = opts || {};

            var bootEle = opts.bootEle || document.getElementById(n + '-search');
            angular.bootstrap(bootEle, [n + '-search']);
        };
    }

    function register(app) {
        app.controller('searchController', function($scope, $location, Portlets) {
            $scope.portlets = Portlets;

            function updateSearch () {
                if ( $location.search().pP_q ) {
                    $scope.chosenPortlet = $location.search().pP_q;
                }
            }
            updateSearch();

            $scope.$on('$routeUpdate', updateSearch);

            if ( _.contains($location.path(), '/max/') ) {
                $scope.maxMode = true;
            }

            $scope.searchFor = function(term) {
                $location.path('/p/search/max/render.uP');
                $location.search('pP_q', term);
            };

            $scope.$on('$destroy', function() {
                $location.search('pP_q', null);
            });
        });
    }
})(window, up.underscore);
