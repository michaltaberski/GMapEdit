
conf =
  map:
    zoom: 6
    center: new google.maps.LatLng(52, 19)
    mapTypeId: google.maps.MapTypeId.ROADMAP
    mapTypeControl: false
    navigationControl: true
    navigationControlOptions:
      style: google.maps.NavigationControlStyle.ZOOM_PAN
      position: google.maps.ControlPosition.TOP_RIGHT
    scaleControl: true
    scaleControlOptions:
      position: google.maps.ControlPosition.BOTTOM_RIGHT
    

@['GMapEdit'] =

  mapInit: (latLng) ->
    @map = new google.maps.Map($('#map').get(0), conf.map)
    @map.setCenter(latLng) if latLng
    
  getMap: -> @map
