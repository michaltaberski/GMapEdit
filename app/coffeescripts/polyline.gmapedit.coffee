
conf =
  color: '#10bf4d'
  line:
    strokeColor: @color
    strokeOpacity: 1
    strokeWeight: 5

@Polyline = class Polyline extends Polygon
    
  createObject: (map) ->
    @type = 'polyline'
    @object = new google.maps.Polyline conf.line
    @object.setMap(map)
    @setObjClickCallback(@objClickCallback)
    @markers = []
  
