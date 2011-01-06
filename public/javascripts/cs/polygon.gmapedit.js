/* DO NOT MODIFY. This file was compiled Thu, 06 Jan 2011 15:16:43 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/polygon.gmapedit.coffee
 */

(function() {
  var Polygon, conf;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  conf = {
    color: '#10bf4d',
    polygon: {
      strokeColor: this.color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: this.color,
      fillOpacity: 0.35
    }
  };
  Polygon = (function() {
    function Polygon(map, color, name) {
      this.color = color;
      this.name = name;
      if (!this.color) {
        this.color = conf.color;
      }
      if (!this.name) {
        this.name = 'unknown';
      }
      this.map = map;
      this.createPolygon(this.map);
      this.pointEventCallback = function() {};
    }
    Polygon.prototype.createPolygon = function(map) {
      this.line = new google.maps.Polygon(conf.line);
      this.line.setMap(map);
      return this.markers = [];
    };
    Polygon.prototype.draw = function() {
      if (this.currentListener) {
        google.maps.event.removeListener(this.currentListener);
      }
      return this.currentListener = google.maps.event.addListener(this.getMap(), 'click', __bind(function(e) {
        var path;
        path = this.line.getPath();
        path.push(e.latLng);
        return this.createMarker(e.latLng);
      }, this));
    };
    Polygon.prototype.createMarker = function(latLng) {
      var marker;
      marker = new google.maps.Marker({
        draggable: true,
        position: latLng,
        map: this.map
      });
      google.maps.event.addListener(marker, "drag", __bind(function() {
        var m, _i, _len, _ref, _results;
        _ref = this.markers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (m === marker) {
            this.line.getPath().setAt(this.markers.indexOf(m), marker.getPosition());
            break;
          }
        }
        return _results;
      }, this));
      google.maps.event.addListener(marker, "dragend", __bind(function() {
        var m, _i, _len, _ref, _results;
        _ref = this.markers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (m === marker) {
            this.pointEventCallback(this);
            break;
          }
        }
        return _results;
      }, this));
      google.maps.event.addListener(marker, "dblclick", __bind(function() {
        var i, m, _i, _len, _ref, _results;
        _ref = this.markers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (m === marker && this.markers.length !== 1) {
            i = this.markers.indexOf(m);
            this.line.getPath().removeAt(i);
            this.markers.splice(i, 1);
            marker.setMap(null);
            this.pointEventCallback(this);
            break;
          }
        }
        return _results;
      }, this));
      this.pointEventCallback(this);
      return this.markers.push(marker);
    };
    Polygon.prototype.getMap = function() {
      return this.line.getMap();
    };
    Polygon.prototype.serialize = function() {
      if (this.markers.length > 0) {
        return this.markers[0].getPosition().toString();
      } else {
        return null;
      }
    };
    Polygon.prototype.setPointEventCallback = function(pointEventCallback) {
      this.pointEventCallback = pointEventCallback;
    };
    Polygon.prototype.setName = function(name) {
      return this.name = name;
    };
    Polygon.prototype.getName = function() {
      return this.name;
    };
    Polygon.prototype.setColor = function(color) {
      this.color = color;
      return this.line.setOptions({
        'color': color
      });
    };
    Polygon.prototype.getColor = function() {
      return this.color;
    };
    Polygon.prototype.toString = function() {
      return this.name;
    };
    return Polygon;
  })();
  this['GMapEdit']['Polygon'] = function(color) {
    return new Polygon(color);
  };
}).call(this);
