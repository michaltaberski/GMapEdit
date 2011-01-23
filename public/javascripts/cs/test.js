/* DO NOT MODIFY. This file was compiled Wed, 19 Jan 2011 22:45:49 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/test.coffee
 */

(function() {
  var SuperPoly;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  this.SuperPolygon = SuperPoly = (function() {
    function SuperPoly() {
      SuperPoly.__super__.constructor.apply(this, arguments);
    }
    __extends(SuperPoly, google.maps.Polygon);
    SuperPoly.prototype.name = function() {
      return alert('I am super');
    };
    return SuperPoly;
  })();
}).call(this);
