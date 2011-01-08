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
  
  console.log GMapEdit.polygons 


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
      load_new_polygon_form()

    $('#new_polyline_link').live 'click', (e) ->
      e.preventDefault()
      alert 'e'

    $('#new_point_link').live 'click', (e) ->
      e.preventDefault()
      alert 'f'
      
load_polygon_form = ->
  $.getScript "/polygons/#{current_obj.getId()}/edit", ->
    current_obj.setPointEventCallback ->
      $('#polygon_data').val(current_obj.serialize())

    $('#polygon_submit').click (e) ->
      e.preventDefault()
      ajax_update_polygon(current_obj)

    $('#cancel').click (e) ->
      e.preventDefault()
      cancel(current_obj)
      
    $('#delete').click (e) ->
      e.preventDefault()
      $.post $(@).attr('href'), { '_method': "delete" }, (data)->
        if data.status == 'success'
          current_obj.destroy()
          current_obj = null
          flash_notice "Powierzchnia usunięta poprawnie"
      , "json"


load_new_polygon_form = ->
  cancel(current_obj)
  $.getScript $('#new_polygon_link').attr('href'), ->
    current_obj = new Polygon GMapEdit.getMap()
    current_obj.draw()
    current_obj.setPointEventCallback ->
      $('#polygon_data').val(current_obj.serialize())

    $('#polygon_submit').click (e) ->
      e.preventDefault()
      ajax_create_polygon(current_obj)

    $('#cancel').click (e) ->
      e.preventDefault()
      cancel(current_obj)

ajax_update_polygon = (obj) ->
  form = $('form.formtastic.polygon')
  action = form.attr('action')
  $.post action, form.serialize(), (data) ->
    if data.status == 'success'
      cancel(obj)
      load_links()
      flash_notice "Powierzchnia zapisana poprawnie"
    else
      flash_alert "Błąd"
  , 'json'
  
  
ajax_create_polygon = (obj)->
  form = $('#new_polygon')
  action = form.attr('action')

  if !$('#polygon_data').val()
    flash_alert('Narysuj powierzchnię przed wysłaniem')
  else
    $.post action, form.serialize(), (data) ->
      if data.status == 'success'
        obj.unselect()
        obj.setId(data.id)
        GMapEdit.polygons[data.id] = obj
        GMapEdit.polygons[data.id].setObjClickCallback genericObjClickCallback 
        load_links()
        cancel(obj)
        flash_notice "Powierzchnia zapisana poprawnie"
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
  $.get "/polygons/#{obj.id}", (data) ->
    obj.deserialize(data)
  , 'json'

genericObjClickCallback = -> 
    cancel(current_obj) if current_obj and current_obj.id != @id
    current_obj = @
    current_obj.draw()
    load_polygon_form()



c = (x) -> console.log x