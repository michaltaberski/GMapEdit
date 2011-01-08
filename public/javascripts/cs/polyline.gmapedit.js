/* DO NOT MODIFY. This file was compiled Sat, 08 Jan 2011 21:00:28 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/polyline.gmapedit.coffee
 */

(function() {
  var Polyline, conf;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  conf = {
    color: '#10bf4d',
    line: {
      strokeColor: this.color,
      strokeOpacity: 1,
      strokeWeight: 5
    }
  };
  this.Polyline = Polyline = (function() {
    function Polyline() {
      Polyline.__super__.constructor.apply(this, arguments);
    }
    __extends(Polyline, Polygon);
    Polyline.prototype.createObject = function(map) {
      this.type = 'polyline';
      this.object = new google.maps.Polyline(conf.line);
      this.object.setMap(map);
      this.setObjClickCallback(this.objClickCallback);
      return this.markers = [];
    };
    return Polyline;
  })();
}).call(this);
