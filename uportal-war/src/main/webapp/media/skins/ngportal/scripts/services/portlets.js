angular.module('ngPortalApp')
    .service('Portlets', function($http, $location) {
        'use strict';
        var portlets = this;

        /**
         * @ngdoc service
         * @name ngPortalApp.service:Portlets
         * @description Portlets service exists to pull portlets from the uPortal endpoint
         * and expose that data and related functionality.
         */

        /**
         * @ngdoc
         * @propertyOf ngPortalApp.service:Portlets
         * @name ngPortalApp.service:Portlets#list
         * @description A list of all the portlets for the current user.
         */
        portlets.list = [];

        /**
         * @ngdoc
         * @propertyOf ngPortalApp.service:Portlets
         * @name ngPortalApp.service:Portlets#byId
         * @description An index of portlets by id.
         */
        portlets.byId = {};

        /**
         * @ngdoc
         * @propertyOf ngPortalApp.service:Portlets
         * @name ngPortalApp.service:Portlets#byName
         * @description An index of portlets by fname.
         */
        portlets.byName = {};

        /**
         * @ngdoc
         * @propertyOf ngPortalApp.service:Portlets
         * @name ngPortalApp.service:Portlets#byCategory
         * @description A map of portlets grouped by category.
         */
        portlets.byCategory = [];

        var refreshPromise;
        /**
         * @ngdoc
         * @methodOf ngPortalApp.service:Portlets
         * @name ngPortalApp.service:Portlets#refresh
         * @description The refresh method queries all portlets from the server 
         * again.
         */
        portlets.refresh = function() {
            return refreshPromise = refreshPromise || $http.get('/uPortal/api/portletList')
            .success(function(data) {
                portlets.byCategory = [];
                processCategories(data.registry, function(chan, cat) {
                    //Add portlet to id index then store reference at `chan` variable
                    chan = portlets.byId[chan.id] = portlets.byId[chan.id] || chan;
                    portlets.byName[chan.fname] = portlets.byName[chan.fname] || chan;

                    chan.categories = chan.categories || [];
                    chan.categories.push(cat);
                });

                portlets.list = _.toArray(portlets.byId);
                _.each(portlets.list, function(port) {
                    port.url = '/uPortal/p/' + port.fname + '/max/render.uP';
                });
            });
        };
        portlets.refresh();

        function open (portletUrl) {
            var prefix = '/uPortal';
            if ( portletUrl.indexOf(prefix) === 0 ) {
                portletUrl = portletUrl.substr(prefix.length);
            }

            $location.path(portletUrl);
        }

        /**
         * @ngdoc
         * @methodOf ngPortalApp.service:Portlets
         * @name ngPortalApp.service:Portlets#navigate
         * @description `navigate` is a method to navigate to a portlet by name
         * or object. If an object is passed, it should have a `url` property.
         */
        portlets.navigate = function(portlet) {
            if ( !portlet ) { return; }

            if ( _.isString(portlet) ) {
                open(portlet);
            } else if ( _.isObject(portlet) && portlet.url ) {
                open(portlet.url);
            }
        };

        function processCategories(obj, process) {
            obj = obj || {};
            if(!obj.categories) { return; }
            _.each(obj.categories, function(c) {
                portlets.byCategory.push(c);
                //in-order DFS of the category tree
                processCategories(c, process);
                if ( c.channels ) {
                    _.each(c.channels, function(chan) {
                        process(chan, c);
                    });
                }
            });
        }
    });
