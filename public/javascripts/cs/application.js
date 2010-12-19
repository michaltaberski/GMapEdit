(function() {
  $(function() {
    var map, poly;
    GMapEdit.mapInit();
    map = GMapEdit.getMap();
    poly = new GMapEdit.Polygon(map);
    return poly.draw();
  });
}).call(this);