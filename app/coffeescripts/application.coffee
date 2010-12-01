$ ->
  GMapEdit.mapInit()
  map = GMapEdit.getMap()
  poly = new GMapEdit.Polyline(map)
  poly.draw()