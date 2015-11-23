<%--
Licensed to Apereo under one or more contributor license
agreements. See the NOTICE file distributed with this work
for additional information regarding copyright ownership.
Apereo licenses this file to you under the Apache License,
Version 2.0 (the "License"); you may not use this file
except in compliance with the License.  You may obtain a
copy of the License at the following location:

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.

--%>

<%@ page contentType="text/html" isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="portlet" uri="http://java.sun.com/portlet_2_0" %>

<portlet:defineObjects/>

<c:set var="nc"><portlet:namespace/></c:set>
<c:set var="lc" value="${fn:toLowerCase(nc)}" />
<c:set var="n" value="${fn:replace(lc, '_', '')}"/>

<script type="text/javascript" src="/uPortal/search/scripts/module.js"></script>


<script type="text/javascript">
  (function(window, $) {
    if (typeof window.angular === 'undefined') {
      //No matter what, check angular and load if needed.
      var ANGULAR_SCRIPT_ID = 'angular-uportal-script';

      var scr = document.getElementById(ANGULAR_SCRIPT_ID);

      if (!scr) {
        scr = document.createElement('script');
        scr.type = 'text/javascript';
        scr.id = ANGULAR_SCRIPT_ID;
        scr.async = true;
        scr.charset = 'utf-8';
        scr.src = 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular.js';
        document.body.appendChild(scr);
      }
    }

    $(window).load(function() {
      if ( up.ngBootstrap ) {
        //Once the needed scripts ready, bootstrap if needed.
        up.ngBootstrap.search('${n}');
      }
    });
    
  })(window, up.jQuery);
</script>

<style>
  #${n}-search[ng-cloak] {
    display: none;
  }
</style>

<div id="${n}-search" ng-cloak ng-controller="searchController">
    <form name="search"
        ng-submit="searchFor(chosenPortlet)">
        <div class="form-group form-group-sm">
            <div class="input-group">
                <input class="form-control" type="text" id="search-${n}"
                aria-label="Search"
                placeholder="Enter search terms"
                typeahead="portlet.title for portlet in portlets.list | filterAny:{title: $viewValue, description: $viewValue}"
                typeahead-template-url="/jasig-widget-portlets/advisor_card_admin/views/portlet-picker.html"
                typeahead-focus-first="false"
                ng-model="chosenPortlet"
                typeahead-on-select="portlets.navigate($item); chosenPortlet = null; $event.preventDefault(); $event.stopPropagation()" />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-search"></span>
                </span>
            </div>
      </div>
  </form>
</div>
