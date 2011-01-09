
conf =
  blue: '/images/blue.png'
  red: '/images/red.png'
  point:
    title: 'Marker'
    icon: '/images/blue.png'


@Point = class Point extends Polygon
  
  constructor: (map, @color, @name) ->
    @name = 'no name' unless @name
    @map = map
    @createObject(@map)
    @id = 'new'
    @objClickCallback = -> 
    @pointEventCallback = ->
    
  createObject: (map) ->
    @type = 'point'
    @object = new google.maps.Marker conf.point
    @object.setMap(map)
    @setObjClickCallback(@objClickCallback)
    
  draw: ->
    google.maps.event.removeListener(@mapClickListener) if @mapClickListener
    @red()
    @mapClickListener = google.maps.event.addListener(@getMap(), 'click', (e) => 
      @object.setPosition(e.latLng)
      @pointEventCallback()
    )
  
  deserialize: (obj) ->
    obj = obj[@type]
    @deserialize_data(obj.data)
    @setId(obj.id)
    @setName(obj.name)
    @setDescription(obj.description)
    @unselect()

  deserialize_data: (input) ->
    sub = input.split(',')
    latlng = new google.maps.LatLng(sub[0], sub[1])
    @object.setPosition(latlng)

  serialize: ->
    lat = @object.getPosition().lat()
    lng = @object.getPosition().lng()
    return [lat, lng]



    
  blue: ->
    @object.setIcon '/images/blue.png'
  red: ->
    @object.setIcon '/images/red.png'
    
  unselect: ->
    google.maps.event.removeListener(@mapClickListener) if @mapClickListener
    @blue()
    
  destroy: ->
    @object.setMap null
