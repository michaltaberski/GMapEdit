(function() {
  var Polyline, addEvent, conf, removeEvent;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  addEvent = google.maps.event.addListener;
  removeEvent = google.maps.event.removeListener;
  conf = {
    color: '#10bf4d',
    line: {
      strokeColor: this.color,
      strokeOpacity: 1,
      strokeWeight: 5
    }
  };
  Polyline = function(map, _arg, _arg2) {
    var _this;
    this.name = _arg2;
    this.color = _arg;
    _this = this;
    this.drag_marker = function(){ return Polyline.prototype.drag_marker.apply(_this, arguments); };
    this.remove_marker = function(){ return Polyline.prototype.remove_marker.apply(_this, arguments); };
    this.add_new_marker = function(){ return Polyline.prototype.add_new_marker.apply(_this, arguments); };
    if (!(this.color)) {
      this.color = conf.color;
    }
    if (!(this.name)) {
      this.name = 'unknown';
    }
    this.map = map;
    this.createPolyline(this.map);
    return this;
  };
  Polyline.prototype.createPolyline = function(map) {
    this.line = new google.maps.Polyline(conf.line);
    this.line.setMap(map);
    return (this.markers = []);
  };
  Polyline.prototype.add_new_marker = function(e) {
    var path;
    path = this.line.getPath();
    path.push(e.latLng);
    return this.createMarker(e.latLng);
  };
  Polyline.prototype.remove_marker = function(marker) {
    return __bind(function() {
      return this.markers.forEach(function(m, i) {
        if (m === marker && this.markers.length !== 1) {
          this.line.getPath().removeAt(i);
          this.markers.splice(i, 1);
          marker.setMap(null);
          return _.breakLoop();
        } else {

        }
      }, this);
    }, this);
  };
  Polyline.prototype.drag_marker = function(marker) {
    return __bind(function() {
      return this.markers.forEach(function(m, i) {
        return m === marker ? this.line.getPath().setAt(this.markers.indexOf(m), marker.getPosition()) : null;
      }, this);
    }, this);
  };
  Polyline.prototype.draw = function() {
    if (this.currentListener) {
      removeEvent(this.currentListener);
    }
    return (this.currentListener = addEvent(this.getMap(), 'click', this.add_new_marker));
  };
  Polyline.prototype.createMarker = function(latLng) {
    var marker;
    marker = new google.maps.Marker({
      draggable: true,
      position: latLng,
      map: this.map
    });
    addEvent(marker, "drag", this.drag_marker(marker));
    addEvent(marker, "dblclick", this.remove_marker(marker));
    return this.markers.push(marker);
  };
  Polyline.prototype.getMap = function() {
    return this.line.getMap();
  };
  Polyline.prototype.setName = function(_arg) {
    this.name = _arg;
  };
  Polyline.prototype.getName = function() {
    return this.name;
  };
  Polyline.prototype.setColor = function(color) {
    this.color = color;
    return this.line.setOptions({
      'color': color
    });
  };
  Polyline.prototype.getColor = function() {
    return this.color;
  };
  Polyline.prototype.toString = function() {
    return this.name;
  };
  this['GMapEdit']['Polyline'] = function(color) {
    return new Polyline(color);
  };
}).call(this);