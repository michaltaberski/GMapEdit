(function() {
  var Polygon, conf;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
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
  Polygon = function(map, _arg, _arg2) {
    this.name = _arg2;
    this.color = _arg;
    if (!(this.color)) {
      this.color = conf.color;
    }
    if (!(this.name)) {
      this.name = 'unknown';
    }
    this.map = map;
    this.createPolygon(this.map);
    return this;
  };
  Polygon.prototype.createPolygon = function(map) {
    this.line = new google.maps.Polygon(conf.line);
    this.line.setMap(map);
    return (this.markers = []);
  };
  Polygon.prototype.draw = function() {
    if (this.currentListener) {
      google.maps.event.removeListener(this.currentListener);
    }
    return (this.currentListener = google.maps.event.addListener(this.getMap(), 'click', __bind(function(e) {
      var path;
      path = this.line.getPath();
      path.push(e.latLng);
      return this.createMarker(e.latLng);
    }, this)));
  };
  Polygon.prototype.createMarker = function(latLng) {
    var marker;
    marker = new google.maps.Marker({
      draggable: true,
      position: latLng,
      map: this.map
    });
    google.maps.event.addListener(marker, "drag", __bind(function() {
      var _i, _len, _ref, _result, m;
      _result = []; _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m === marker) {
          this.line.getPath().setAt(this.markers.indexOf(m), marker.getPosition());
          break;
        }
      }
      return _result;
    }, this));
    google.maps.event.addListener(marker, "dblclick", __bind(function() {
      var _i, _len, _ref, _result, i, m;
      _result = []; _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        if (m === marker && this.markers.length !== 1) {
          i = this.markers.indexOf(m);
          this.line.getPath().removeAt(i);
          this.markers.splice(i, 1);
          marker.setMap(null);
          break;
        }
      }
      return _result;
    }, this));
    return this.markers.push(marker);
  };
  Polygon.prototype.getMap = function() {
    return this.line.getMap();
  };
  Polygon.prototype.setName = function(name) {
    return (this.name = name);
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
  this['GMapEdit']['Polygon'] = function(color) {
    return new Polygon(color);
  };
}).call(this);