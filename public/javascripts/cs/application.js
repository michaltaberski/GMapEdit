/* DO NOT MODIFY. This file was compiled Sat, 08 Jan 2011 20:13:38 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/application.coffee
 */

(function() {
  var ajax_create_polygon, ajax_update_polygon, c, cancel, current_obj, flash_alert, flash_notice, genericObjClickCallback, load_links, load_new_polygon_form, load_polygon_form, refresh;
  current_obj = null;
  $(function() {
    GMapEdit.mapInit();
    this.map = GMapEdit.getMap();
    $('.flash').fadeOut(2000, function() {
      return $(this).remove();
    });
    load_links();
    $.get("/polygons", function(data) {
      var p, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        p = data[_i];
        GMapEdit.polygons[p.polygon.id] = new Polygon(GMapEdit.getMap());
        GMapEdit.polygons[p.polygon.id].deserialize(p);
        _results.push(GMapEdit.polygons[p.polygon.id].setObjClickCallback(genericObjClickCallback));
      }
      return _results;
    }, "json");
    return console.log(GMapEdit.polygons);
  });
  cancel = function(obj) {
    if (obj) {
      if (obj.id === 'new') {
        obj.destroy();
      } else {
        obj.unselect();
        refresh(obj);
      }
    }
    return load_links();
  };
  load_links = function() {
    return $.getScript('/map/menu', function() {
      $('#new_polygon_link').click(function(e) {
        e.preventDefault();
        return load_new_polygon_form();
      });
      $('#new_polyline_link').live('click', function(e) {
        e.preventDefault();
        return alert('e');
      });
      return $('#new_point_link').live('click', function(e) {
        e.preventDefault();
        return alert('f');
      });
    });
  };
  load_polygon_form = function() {
    return $.getScript("/polygons/" + (current_obj.getId()) + "/edit", function() {
      current_obj.setPointEventCallback(function() {
        return $('#polygon_data').val(current_obj.serialize());
      });
      $('#polygon_submit').click(function(e) {
        e.preventDefault();
        return ajax_update_polygon(current_obj);
      });
      $('#cancel').click(function(e) {
        e.preventDefault();
        return cancel(current_obj);
      });
      return $('#delete').click(function(e) {
        e.preventDefault();
        return $.post($(this).attr('href'), {
          '_method': "delete"
        }, function(data) {
          if (data.status === 'success') {
            current_obj.destroy();
            current_obj = null;
            return flash_notice("Powierzchnia usunięta poprawnie");
          }
        }, "json");
      });
    });
  };
  load_new_polygon_form = function() {
    cancel(current_obj);
    return $.getScript($('#new_polygon_link').attr('href'), function() {
      current_obj = new Polygon(GMapEdit.getMap());
      current_obj.draw();
      current_obj.setPointEventCallback(function() {
        return $('#polygon_data').val(current_obj.serialize());
      });
      $('#polygon_submit').click(function(e) {
        e.preventDefault();
        return ajax_create_polygon(current_obj);
      });
      return $('#cancel').click(function(e) {
        e.preventDefault();
        return cancel(current_obj);
      });
    });
  };
  ajax_update_polygon = function(obj) {
    var action, form;
    form = $('form.formtastic.polygon');
    action = form.attr('action');
    return $.post(action, form.serialize(), function(data) {
      if (data.status === 'success') {
        cancel(obj);
        load_links();
        return flash_notice("Powierzchnia zapisana poprawnie");
      } else {
        return flash_alert("Błąd");
      }
    }, 'json');
  };
  ajax_create_polygon = function(obj) {
    var action, form;
    form = $('#new_polygon');
    action = form.attr('action');
    if (!$('#polygon_data').val()) {
      return flash_alert('Narysuj powierzchnię przed wysłaniem');
    } else {
      return $.post(action, form.serialize(), function(data) {
        if (data.status === 'success') {
          obj.unselect();
          obj.setId(data.id);
          GMapEdit.polygons[data.id] = obj;
          GMapEdit.polygons[data.id].setObjClickCallback(genericObjClickCallback);
          load_links();
          cancel(obj);
          return flash_notice("Powierzchnia zapisana poprawnie");
        }
      }, 'json');
    }
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
  refresh = function(obj) {
    return $.get("/polygons/" + obj.id, function(data) {
      return obj.deserialize(data);
    }, 'json');
  };
  genericObjClickCallback = function() {
    if (current_obj && current_obj.id !== this.id) {
      cancel(current_obj);
    }
    current_obj = this;
    current_obj.draw();
    return load_polygon_form();
  };
  c = function(x) {
    return console.log(x);
  };
}).call(this);
