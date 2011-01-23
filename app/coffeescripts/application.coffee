current_obj = null

$ ->
  GMapEdit.mapInit()
  @map = GMapEdit.getMap()
  $('.flash').fadeOut(2000, -> $(@).remove())
    
  load_links()

  $.get("/polygons", (data) ->
    for p in data
      GMapEdit.polygons[p.polygon.id] = new Polygon(GMapEdit.getMap())
      GMapEdit.polygons[p.polygon.id].deserialize(p)
      GMapEdit.polygons[p.polygon.id].setObjClickCallback genericObjClickCallback 
  , "json")

  $.get("/polylines", (data) ->
    for p in data
      GMapEdit.polylines[p.polyline.id] = new Polyline(GMapEdit.getMap())
      GMapEdit.polylines[p.polyline.id].deserialize(p)
      GMapEdit.polylines[p.polyline.id].setObjClickCallback genericObjClickCallback 
  , "json")
  
  $.get("/points", (data) ->
    for p in data
      GMapEdit.points[p.point.id] = new Point(GMapEdit.getMap())
      GMapEdit.points[p.point.id].deserialize(p)
      GMapEdit.points[p.point.id].setObjClickCallback genericObjClickCallback 
  , "json")


cancel = (obj)->
  if obj
    if obj.id == 'new'
      obj.destroy()
    else
      obj.unselect()
      refresh(obj)
  load_links()
    

load_links = ->
  $.getScript '/map/menu', -> 
    $('#new_polygon_link').click (e) ->
      e.preventDefault()
      load_new_object_form('polygon')

    $('#new_polyline_link').click (e) ->
      e.preventDefault()
      load_new_object_form('polyline')
      
    $('#new_point_link').click (e) ->
      e.preventDefault()
      load_new_object_form('point')


load_object_form = ->
  type = current_obj.type
  types = "#{type}s"
  $.getScript "/#{types}/#{current_obj.getId()}/edit", ->
    current_obj.setPointEventCallback ->
      $("##{type}_data").val(current_obj.serialize())


    if type == 'polygon'
      $("#polygon_surface").val(current_obj.getSurface())
      wynik = "<b>Powierzchnia</b> #{parseInt(current_obj.getSurface()/1000000)} [km2]"
      $("#surface").html(wynik)

    if type == 'polyline'
      $("#polyline_length").val(current_obj.getLength())
      wynik = "<b>Długość</b> #{parseInt(current_obj.getLength()/1000)} [km]"
      $("#length").html(wynik)


    $("##{type}_submit").click (e) ->
      e.preventDefault()
      ajax_update_object(current_obj)

    $('#cancel').click (e) ->
      e.preventDefault()
      cancel(current_obj)

    $('#delete').click (e) ->
      e.preventDefault()
      $.post $(@).attr('href'), { '_method': "delete" }, (data)->
        if data.status == 'success'
          current_obj.destroy()
          current_obj = null
          load_links()
          flash_notice "Obiekt usunięto poprawnie"
      , "json"



load_new_object_form = (obj_type) ->
  cancel(current_obj)
  $.getScript $("#new_#{obj_type}_link").attr('href'), ->
    if obj_type == 'polygon'
      current_obj = new Polygon GMapEdit.getMap()
    if obj_type == 'polyline'
      current_obj = new Polyline GMapEdit.getMap()
    if obj_type == 'point'
      current_obj = new Point GMapEdit.getMap()

    
    current_obj.draw()
    current_obj.setPointEventCallback ->
      $("##{obj_type}_data").val(current_obj.serialize())
      if obj_type == 'polygon'
        $("#polygon_surface").val(current_obj.getSurface())
        wynik = "<b>Powierzchnia</b> #{parseInt(current_obj.getSurface()/1000000)} [km2]"
        $("#surface").html(wynik)

      if obj_type == 'polyline'
        $("#polyline_length").val(current_obj.getLength())
        wynik = "<b>Długość</b> #{parseInt(current_obj.getLength()/1000)} [km]"
        $("#length").html(wynik)




    $("##{obj_type}_submit").click (e) ->
      e.preventDefault()
      ajax_create_object(current_obj)

    $('#cancel').click (e) ->
      e.preventDefault()
      cancel(current_obj)

ajax_update_object = (obj) ->
  type = obj.type
  types = "#{type}s"
  form = $("form.formtastic.#{type}")
  action = form.attr('action')
  $.post action, form.serialize(), (data) ->
    if data.status == 'success'
      cancel(obj)
      load_links()
      flash_notice "Obiekt zapisana poprawnie"
    else
      flash_alert "Błąd"
  , 'json'

ajax_create_object = (obj)->
  type = obj.type
  types = "#{type}s"
  form = $("#new_#{type}")
  action = form.attr('action')

  if !$("##{type}_data").val()
    flash_alert('Narysuj obiekt  przed wysłaniem')
  else
    c "-> #{action}"
    $.post action, form.serialize(), (data) ->
      if data.status == 'success'
        obj.unselect()
        obj.setId(data.id)
        GMapEdit[types][data.id] = obj
        GMapEdit[types][data.id].setObjClickCallback genericObjClickCallback 
        load_links()
        cancel(obj)
        flash_notice "Obiekt zapisano poprawnie"
    , 'json'

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

  
refresh = (obj) ->
  type = obj.type
  types = "#{type}s"
  $.get "/#{types}/#{obj.id}", (data) ->
    obj.deserialize(data)
  , 'json'

genericObjClickCallback = -> 
  cancel(current_obj) if current_obj and current_obj.id != @id
  current_obj = @
  current_obj.draw()
  load_object_form()



c = (x) -> console.log x