/* DO NOT MODIFY. This file was compiled Thu, 06 Jan 2011 15:16:17 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/application.coffee
 */

(function() {
  var callback, flash_alert, flash_notice, new_polygon;
  $(function() {
    var map, poly;
    GMapEdit.mapInit();
    map = GMapEdit.getMap();
    poly = new GMapEdit.Polygon(map);
    poly.draw();
    poly.setPointEventCallback(callback);
    new_polygon();
    return $('.flash').fadeOut(2000, function() {
      return $(this).remove();
    });
  });
  callback = function(poly) {
    return alert(poly.serialize());
  };
  new_polygon = function() {
    return $('#polygon_submit').live('click', function(e) {
      var action, form;
      e.preventDefault();
      form = $('#new_polygon');
      action = form.attr('action');
      if (!$('#polygon_data').val()) {
        return flash_alert('Narysuj obiekt przed wysłaniem');
      } else {
        $.post(action, form.serialize(), function(response) {});
        return flash_alert('works');
      }
    });
  };
  flash_alert = function(msg) {
    $('.container').append("<div class = 'flash alert'>" + msg + "</div>");
    return setTimeout(function(msg) {
      return $('.flash').fadeOut(2000, function() {
        return $(this).remove();
      });
    }, 3000);
  };
  flash_notice = function(msg) {
    $('.container').append("<div class = 'flash notice'>" + msg + "</div>");
    return setTimeout(function(msg) {
      return $('.flash').fadeOut(2000, function() {
        return $(this).remove();
      });
    }, 3000);
  };
}).call(this);
