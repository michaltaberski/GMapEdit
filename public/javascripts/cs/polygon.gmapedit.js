/* DO NOT MODIFY. This file was compiled Fri, 07 Jan 2011 21:36:00 GMT from
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
        this.name = 'no name';
      }
      this.map = map;
      this.createPolygon(this.map);
      this.id = 'new';
      this.objClickCallback = function() {};
      this.pointEventCallback = function() {};
    }
    Polygon.prototype.createPolygon = function(map) {
      this.line = new google.maps.Polygon(conf.line);
      google.maps.event.addListener(this.line, 'click', __bind(function() {
        return this.objClickCallback();
      }, this));
      this.line.setMap(map);
      return this.markers = [];
    };
    Polygon.prototype.draw = function() {
      var m, _i, _len, _ref;
      if (this.currentListener) {
        google.maps.event.removeListener(this.currentListener);
      }
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        m.setMap(this.getMap());
      }
      return this.currentListener = google.maps.event.addListener(this.getMap(), 'click', __bind(function(e) {
        return this.addNewPoint(e.latLng);
      }, this));
    };
    Polygon.prototype.addNewPoint = function(latLng) {
      var path;
      path = this.line.getPath();
      path.push(latLng);
      return this.createMarker(latLng);
    };
    Polygon.prototype.setId = function(id) {
      this.id = id;
    };
    Polygon.prototype.getId = function() {
      return this.id;
    };
    Polygon.prototype.setDescription = function(description) {
      this.description = description;
    };
    Polygon.prototype.getDescription = function() {
      return this.description;
    };
    Polygon.prototype.unselect = function() {
      var m, _i, _len, _ref, _results;
      google.maps.event.clearInstanceListeners(this.getMap(), 'click');
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        _results.push(m.setMap(null));
      }
      return _results;
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
      this.markers.push(marker);
      return this.pointEventCallback(this);
    };
    Polygon.prototype.getMap = function() {
      return this.line.getMap();
    };
    Polygon.prototype.deserialize = function(obj) {
      obj = obj.polygon;
      this.deserialize_data(obj.data);
      this.setId(obj.id);
      this.setColor(obj.color);
      this.setName(obj.name);
      this.setDescription(obj.description);
      return this.unselect();
    };
    Polygon.prototype.deserialize_data = function(input) {
      var e, elements, latlng, sube, _i, _len, _results;
      elements = input.split('|');
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        e = elements[_i];
        sube = e.split(',');
        latlng = new google.maps.LatLng(sube[0], sube[1]);
        _results.push(this.addNewPoint(latlng));
      }
      return _results;
    };
    Polygon.prototype.serialize = function() {
      var lat, lng, m, result, _i, _len, _ref;
      result = [];
      if (this.markers.length > 0) {
        _ref = this.markers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          lat = m.getPosition().lat();
          lng = m.getPosition().lng();
          result.push([lat, lng]);
        }
        return result.join('|');
      } else {
        return null;
      }
    };
    Polygon.prototype.setObjClickCallback = function(objClickCallback) {
      this.objClickCallback = objClickCallback;
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
    Polygon.prototype.destroy = function() {
      this.unselect();
      return this.line.setMap(null);
    };
    return Polygon;
  })();
  this['GMapEdit']['Polygon'] = function(color) {
    return new Polygon(color);
  };
}).call(this);
