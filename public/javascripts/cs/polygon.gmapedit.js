/* DO NOT MODIFY. This file was compiled Sun, 23 Jan 2011 15:12:19 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/polygon.gmapedit.coffee
 */

(function() {
  var Polygon, c, conf;
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
  this.Polygon = Polygon = (function() {
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
      this.createObject(this.map);
      this.id = 'new';
      this.objClickCallback = function() {};
      this.pointEventCallback = function() {};
    }
    Polygon.prototype.createObject = function(map) {
      this.type = 'polygon';
      this.object = new google.maps.Polygon(conf.line);
      this.object.setMap(map);
      this.setObjClickCallback(this.objClickCallback);
      return this.markers = [];
    };
    Polygon.prototype.draw = function() {
      var m, _i, _len, _ref;
      if (this.mapClickListener) {
        google.maps.event.removeListener(this.mapClickListener);
      }
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        m.setMap(this.getMap());
      }
      return this.mapClickListener = google.maps.event.addListener(this.getMap(), 'click', __bind(function(e) {
        return this.addNewPoint(e.latLng);
      }, this));
    };
    Polygon.prototype.addNewPoint = function(latLng) {
      var path;
      path = this.object.getPath();
      path.push(latLng);
      return this.createMarker(latLng);
    };
    Polygon.prototype.setId = function(id) {
      this.id = id;
    };
    Polygon.prototype.getId = function() {
      return this.id;
    };
    Polygon.prototype.getSurface = function() {
      return google.maps.geometry.spherical.computeArea(this.object.getPath());
    };
    Polygon.prototype.setDescription = function(description) {
      this.description = description;
    };
    Polygon.prototype.getDescription = function() {
      return this.description;
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
            this.object.getPath().setAt(this.markers.indexOf(m), marker.getPosition());
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
            this.object.getPath().removeAt(i);
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
      return this.object.getMap();
    };
    Polygon.prototype.setMap = function(map) {
      return this.object.setMap(map);
    };
    Polygon.prototype.deserialize = function(obj) {
      obj = obj[this.type];
      this.deserialize_data(obj.data);
      this.setId(obj.id);
      this.setColor(obj.color);
      this.setName(obj.name);
      this.setDescription(obj.description);
      return this.unselect();
    };
    Polygon.prototype.clear = function() {
      var m, path, _i, _len, _ref;
      path = this.object.getPath();
      path.clear();
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        m.setMap(null);
      }
      return this.markers.length = 0;
    };
    Polygon.prototype.deserialize_data = function(input) {
      var e, elements, latlng, sube, _i, _len, _results;
      this.clear();
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
      if (this.objClickListner) {
        google.maps.event.removeListener(this.objClickListner);
      }
      this.objClickCallback = objClickCallback;
      return this.objClickListner = google.maps.event.addListener(this.object, 'click', __bind(function() {
        return this.objClickCallback(this.id);
      }, this));
    };
    Polygon.prototype.setPointEventCallback = function(pointEventCallback) {
      this.pointEventCallback = pointEventCallback;
    };
    Polygon.prototype.nullCallbacks = function() {
      this.setPointEventCallback(function() {});
      return this.setObjClickCallback(function() {});
    };
    Polygon.prototype.setName = function(name) {
      return this.name = name;
    };
    Polygon.prototype.getName = function() {
      return this.name;
    };
    Polygon.prototype.setColor = function(color) {
      this.color = color;
      return this.object.setOptions({
        'color': color
      });
    };
    Polygon.prototype.getColor = function() {
      return this.color;
    };
    Polygon.prototype.toString = function() {
      return this.name;
    };
    Polygon.prototype.unselect = function() {
      var m, _i, _len, _ref, _results;
      if (this.mapClickListener) {
        google.maps.event.removeListener(this.mapClickListener);
      }
      _ref = this.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        _results.push(m.setMap(null));
      }
      return _results;
    };
    Polygon.prototype.destroy = function() {
      this.unselect();
      if (this.object) {
        this.object.setMap(null);
      }
      this.map = null;
      return this.object = null;
    };
    return Polygon;
  })();
  c = function(x) {
    return console.log(x);
  };
}).call(this);
