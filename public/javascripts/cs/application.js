(function() {
  $(function() {
    var map, poly;
    GMapEdit.mapInit();
    map = GMapEdit.getMap();
    poly = new GMapEdit.Polyline(map);
    return poly.draw();
  });
}).call(this);