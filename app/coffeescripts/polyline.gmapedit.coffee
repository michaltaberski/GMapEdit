# Alias
addEvent = google.maps.event.addListener
removeEvent = google.maps.event.removeListener

conf =
  color: '#10bf4d'
  line:
    strokeColor: @color
    strokeOpacity: 1
    strokeWeight: 5

class Polyline
  constructor: (map, @color, @name) ->
    @color = conf.color unless @color
    @name = 'unknown' unless @name
    @map = map
    @createPolyline(@map)
    
  createPolyline: (map) ->
    @line = new google.maps.Polyline conf.line
    @line.setMap(map)
    @markers = []
  
  # -----------------
  # Event listeners:
  
  add_new_marker: (e) =>
    path = @line.getPath()
    path.push(e.latLng)
    @createMarker(e.latLng) 
  
  remove_marker: (marker)=>
    =>
      @markers.forEach (m, i) ->
        if m == marker and @markers.length != 1
          @line.getPath().removeAt(i)
          @markers.splice(i, 1)
          marker.setMap(null)
          _.breakLoop()
        else
      , this
  
  drag_marker: (marker) =>
    =>
      @markers.forEach (m, i) ->
        if m == marker
          @line.getPath().setAt(@markers.indexOf(m), marker.getPosition())
      , this
    
  # -----------------
  draw: ->
    removeEvent(@currentListener) if @currentListener
    @currentListener = addEvent(@getMap(), 'click', @add_new_marker)
    
  createMarker: (latLng) ->
    marker =  new google.maps.Marker({
      draggable: true,
      position: latLng,
      map: @map
    })
    addEvent(marker, "drag", @drag_marker(marker))
    addEvent(marker, "dblclick", @remove_marker(marker))
    @markers.push marker
    
  getMap: -> @line.getMap()

  setName: (@name) ->
  getName: -> @name

  setColor: (color) -> 
    @color = color
    @line.setOptions {'color': color}
  getColor: -> @color

  toString: -> @name
# end Polyline class
  
@['GMapEdit']['Polyline'] = (color) -> new Polyline(color)

