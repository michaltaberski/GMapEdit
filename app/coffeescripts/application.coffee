polylines = new Array()
polygons = new Array()
points = new Array()

num = 0


$ ->
  GMapEdit.mapInit()
  @map = GMapEdit.getMap()

  $('.flash').fadeOut(2000, -> $(@).remove())

  load_data()

  links_setup()


load_data = ->
  

  # POLYGONS 
  for p in polygons
    p.destroy()
  
  $.get("/polygons", (data) ->
    for p in data
      temp = new GMapEdit.Polygon(GMapEdit.getMap())
      temp.deserialize(p)
      temp.setObjClickCallback ->
        load_polygon_form(@)
      polygons.push(temp)
  , "json")

links_setup = ->
  $('#new_polygon_link').click (e) ->
    e.preventDefault()
    load_new_polygon_form()

  $('#new_polyline_link').live 'click', (e) ->
    e.preventDefault()
    alert 'e'

  $('#new_point_link').live 'click', (e) ->
    e.preventDefault()
    alert 'f'

load_links = ->
  $.getScript '/map/menu', -> links_setup()

load_polygon_form = (poly) ->
  $.getScript("/polygons/#{poly.getId()}/edit", ->
    poly.setPointEventCallback ->
      $('#polygon_data').val(poly.serialize())

    poly.draw()

    $('#cancel').click (e)->
      poly.setPointEventCallback( -> )
      poly.unselect()
      e.preventDefault()
      load_links()
      load_data()
    
  )

load_new_polygon_form = ->
  $.getScript($('#new_polygon_link').attr('href'), ->

    poly = new GMapEdit.Polygon GMapEdit.getMap()
    poly.draw()
    poly.setPointEventCallback ->
      $('#polygon_data').val(poly.serialize())

    $('#polygon_submit').click (e) ->
      e.preventDefault()
      form = $('#new_polygon')
      action = form.attr('action')

      if !$('#polygon_data').val()
        flash_alert('Narysuj powierzchnię przed wysłaniem')
      else
        $.post action, form.serialize(), (data) ->
          if data.status == 'success'
            poly.unselect()
            poly.setId(data.id)
            polygons.push(poly)
            load_links()
            flash_notice "Powierzchnia zapisana poprawnie"
        , 'json'

    $('#cancel').click (e)->
      poly.setPointEventCallback( -> )
      poly.destroy()
      e.preventDefault()
      load_links()
  )

flash_alert = (msg) ->
  $('.container').append("<div class = 'flash alert'>#{msg}</div>")
  setTimeout( (msg) ->
    $('.flash').fadeOut(2000, -> $(@).remove() )
  , 3000) 


flash_notice = (msg) ->
  $('.container').append("<div class = 'flash notice'>#{msg}</div>")
  setTimeout( (msg) ->
    $('.flash').fadeOut(2000, -> $(@).remove() )
  , 3000) 

