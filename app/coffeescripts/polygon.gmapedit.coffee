
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
    @name = 'no name' unless @name
    @map = map
    this.createPolygon(@map)
    @id = 'new'
    @objClickCallback = -> 
    @pointEventCallback = ->
    
  createPolygon: (map) ->
    @line = new google.maps.Polygon conf.line
    google.maps.event.addListener(@line, 'click', => @objClickCallback())
    
    @line.setMap(map)
    @markers = []
    
  draw: ->
    google.maps.event.removeListener(@currentListener) if @currentListener
    
    for m in @markers
      m.setMap @getMap()

    @currentListener = google.maps.event.addListener(this.getMap(), 'click', (e) => 
      @addNewPoint(e.latLng)
    )

  addNewPoint: (latLng) ->
    path = @line.getPath()
    path.push(latLng)
    @createMarker(latLng)
    

  setId: (@id) ->
  getId: -> @id
  
  setDescription: (@description) ->
  getDescription: -> @description

  unselect: ->
    google.maps.event.clearInstanceListeners(@getMap(), 'click')
    # google.maps.event.removeListener(@currentListener) if @currentListener
    for m in @markers
      m.setMap(null)

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

    google.maps.event.addListener(marker, "dragend", =>
      for m in @markers
        if m == marker
          @pointEventCallback(@)
          break
    )

    google.maps.event.addListener(marker, "dblclick", =>
      for m in @markers
        if m == marker and @markers.length != 1
          i = @markers.indexOf(m)
          @line.getPath().removeAt(i)
          @markers.splice(i, 1)
          marker.setMap(null)
          @pointEventCallback(@)
          break
    )
    @markers.push marker
    @pointEventCallback(@)
    
  getMap: -> @line.getMap()

  deserialize: (obj) ->
    obj = obj.polygon
    @deserialize_data(obj.data)
    @setId(obj.id)
    @setColor(obj.color)
    @setName(obj.name)
    @setDescription(obj.description)
    @unselect()

  deserialize_data: (input) ->
    elements = input.split('|')
    for e in elements
      sube = e.split(',')
      latlng = new google.maps.LatLng(sube[0], sube[1])
      @addNewPoint(latlng)

  serialize: ->
    result = []
    if @markers.length > 0
      for m in @markers
        lat = m.getPosition().lat()
        lng = m.getPosition().lng()
        result.push([lat, lng])
      return result.join('|')
    else
      return null


  setObjClickCallback: (@objClickCallback) ->
  setPointEventCallback: (@pointEventCallback) ->

  setName: (name) -> @name = name
  getName: -> @name

  setColor: (color) -> 
    @color = color
    @line.setOptions {'color': color}
  getColor: -> @color

  toString: -> @name
  
  destroy: ->
    @unselect()
    @line.setMap(null)
  
# end Polyline class
  
@['GMapEdit']['Polygon'] = (color) -> new Polygon(color)
  
