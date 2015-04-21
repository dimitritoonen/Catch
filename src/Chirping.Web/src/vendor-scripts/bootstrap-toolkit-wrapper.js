/*
  AMD Wrapper for the boot-strap toolkit

  note: extended the toolkit with the custom ms-viewpoint
*/

define(['jquery', 'knockout'], function ($, ko) {

  var viewpoint = ResponsiveBootstrapToolkit;

  // Updates the default interval between firing 'changed' method
  viewpoint.interval = 10;

  // add custom break point
  viewpoint.breakpoints.ms = $('<div class="device-ms visible-ms"></div>').appendTo('body');
    
  // define a sort order for the breakpoint
  viewpoint.breakpoints.xs.order = 0;
  viewpoint.breakpoints.ms.order = 1;
  viewpoint.breakpoints.sm.order = 2;
  viewpoint.breakpoints.md.order = 3;
  viewpoint.breakpoints.lg.order = 4;
 

  // Check if the passed breakpoint is bigger than the current
  viewpoint.is.largerThan = function (breakpoint) {
    var order = viewpoint.breakpoints[breakpoint].order;
    var current = viewpoint.breakpoints[viewpoint.current()];

    return (current.order > order);
  }

  // Check if the passed breakpoint is smaller than the current
  viewpoint.is.smallerThan = function (breakpoint) {
    var order = viewpoint.breakpoints[breakpoint].order;
    var current = viewpoint.breakpoints[viewpoint.current()];

    return (current.order < order);
  }

  // define knockout observable to indicate when a viewpoint has been changed
  viewpoint.currentViewpoint = ko.observable(viewpoint.current());

  // Execute code only when document has been loaded fully
  $(document).ready(function () {
    $(window).on('resize', function () {
      viewpoint.changed(function () {
        viewpoint.currentViewpoint(viewpoint.current());
      })
    });
  });

  return viewpoint;

})