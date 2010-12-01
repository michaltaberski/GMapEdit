
conf =
  color: '#10bf4d'
  polygon:
    strokeColor: this.color
    strokeOpacity: 0.8
    strokeWeight: 2
    fillColor: this.color
    fillOpacity: 0.35

class Polygon
  constructor: (map, @color, @name) ->
    @color = conf.color unless @color
    @name = 'unknown' unless @name
    @map = map
    this.createPolygon(@map)
    
  createPolygon: (map) ->
    @line = new google.maps.Polygon conf.line
    @line.setMap(map)
    @markers = []
    
  draw: ->
    google.maps.event.removeListener(@currentListener) if @currentListener
    @currentListener = google.maps.event.addListener(this.getMap(), 'click', (e) => 
      path = @line.getPath()
      path.push(e.latLng)
      this.createMarker(e.latLng)
    )
    
  createMarker: (latLng) ->
    marker =  new google.maps.Marker({
      draggable: true,
      position: latLng,
      map: @map
    })
    
    google.maps.event.addListener(marker, "drag", =>
      for m in @markers
        if m == marker
          @line.getPath().setAt(@markers.indexOf(m), marker.getPosition())
          break
    )
    
    google.maps.event.addListener(marker, "dblclick", =>
      for m in @markers
        if m == marker and @markers.length != 1
          i = @markers.indexOf(m)
          @line.getPath().removeAt(i)
          @markers.splice(i, 1)
          marker.setMap(null)
          break
    )
    
    @markers.push marker
    
  getMap: -> @line.getMap()

  setName: (name) -> @name = name
  getName: -> @name

  setColor: (color) -> 
    @color = color
    @line.setOptions {'color': color}
  getColor: -> @color

  toString: -> @name
# end Polyline class
  
@['GMapEdit']['Polygon'] = (color) -> new Polygon(color)
  
