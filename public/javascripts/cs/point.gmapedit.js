/* DO NOT MODIFY. This file was compiled Sun, 09 Jan 2011 15:31:58 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/point.gmapedit.coffee
 */

(function() {
  var Point, conf;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  conf = {
    blue: '/images/blue.png',
    red: '/images/red.png',
    point: {
      title: 'Marker',
      icon: '/images/blue.png'
    }
  };
  this.Point = Point = (function() {
    __extends(Point, Polygon);
    function Point(map, color, name) {
      this.color = color;
      this.name = name;
      if (!this.name) {
        this.name = 'no name';
      }
      this.map = map;
      this.createObject(this.map);
      this.id = 'new';
      this.objClickCallback = function() {};
      this.pointEventCallback = function() {};
    }
    Point.prototype.createObject = function(map) {
      this.type = 'point';
      this.object = new google.maps.Marker(conf.point);
      this.object.setMap(map);
      return this.setObjClickCallback(this.objClickCallback);
    };
    Point.prototype.draw = function() {
      if (this.mapClickListener) {
        google.maps.event.removeListener(this.mapClickListener);
      }
      this.red();
      return this.mapClickListener = google.maps.event.addListener(this.getMap(), 'click', __bind(function(e) {
        this.object.setPosition(e.latLng);
        return this.pointEventCallback();
      }, this));
    };
    Point.prototype.deserialize = function(obj) {
      obj = obj[this.type];
      this.deserialize_data(obj.data);
      this.setId(obj.id);
      this.setName(obj.name);
      this.setDescription(obj.description);
      return this.unselect();
    };
    Point.prototype.deserialize_data = function(input) {
      var latlng, sub;
      sub = input.split(',');
      latlng = new google.maps.LatLng(sub[0], sub[1]);
      return this.object.setPosition(latlng);
    };
    Point.prototype.serialize = function() {
      var lat, lng;
      lat = this.object.getPosition().lat();
      lng = this.object.getPosition().lng();
      return [lat, lng];
    };
    Point.prototype.blue = function() {
      return this.object.setIcon('/images/blue.png');
    };
    Point.prototype.red = function() {
      return this.object.setIcon('/images/red.png');
    };
    Point.prototype.unselect = function() {
      if (this.mapClickListener) {
        google.maps.event.removeListener(this.mapClickListener);
      }
      return this.blue();
    };
    Point.prototype.destroy = function() {
      return this.object.setMap(null);
    };
    return Point;
  })();
}).call(this);
