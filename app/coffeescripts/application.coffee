
$ ->
  GMapEdit.mapInit()
  map = GMapEdit.getMap()
  poly = new GMapEdit.Polygon map
  poly.draw()
  poly.setPointEventCallback(callback)

  new_polygon()

  $('.flash').fadeOut(2000, -> $(@).remove() )



callback = (poly)->
  alert poly.serialize()


new_polygon = ->
  $('#polygon_submit').live 'click', (e) ->
    e.preventDefault()
    form = $('#new_polygon')
    action = form.attr('action')
    if !$('#polygon_data').val()
      flash_alert('Narysuj obiekt przed wysłaniem')
    else
      $.post action, form.serialize(), (response) ->
      flash_alert('works')
      


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

