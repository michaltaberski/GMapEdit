/* DO NOT MODIFY. This file was compiled Sat, 08 Jan 2011 21:58:47 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/application.coffee
 */

(function() {
  var ajax_create_object, ajax_update_object, c, cancel, current_obj, flash_alert, flash_notice, genericObjClickCallback, load_links, load_new_object_form, load_object_form, refresh;
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
    $.get("/polylines", function(data) {
      var p, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        p = data[_i];
        GMapEdit.polylines[p.polyline.id] = new Polyline(GMapEdit.getMap());
        GMapEdit.polylines[p.polyline.id].deserialize(p);
        _results.push(GMapEdit.polylines[p.polyline.id].setObjClickCallback(genericObjClickCallback));
      }
      return _results;
    }, "json");
    console.log(GMapEdit.polygons);
    console.log(GMapEdit.polylines);
    return console.log(GMapEdit.points);
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
        return load_new_object_form('polygon');
      });
      $('#new_polyline_link').click(function(e) {
        e.preventDefault();
        return load_new_object_form('polyline');
      });
      return $('#new_point_link').live('click', function(e) {
        e.preventDefault();
        return alert('f');
      });
    });
  };
  load_object_form = function() {
    var type, types;
    type = current_obj.type;
    types = "" + type + "s";
    return $.getScript("/" + types + "/" + (current_obj.getId()) + "/edit", function() {
      current_obj.setPointEventCallback(function() {
        return $("#" + type + "_data").val(current_obj.serialize());
      });
      $("#" + type + "_submit").click(function(e) {
        e.preventDefault();
        return ajax_update_object(current_obj);
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
            load_links();
            return flash_notice("Obiekt usunięto poprawnie");
          }
        }, "json");
      });
    });
  };
  load_new_object_form = function(obj_type) {
    cancel(current_obj);
    return $.getScript($("#new_" + obj_type + "_link").attr('href'), function() {
      if (obj_type === 'polygon') {
        current_obj = new Polygon(GMapEdit.getMap());
      }
      if (obj_type === 'polyline') {
        current_obj = new Polyline(GMapEdit.getMap());
      }
      current_obj.draw();
      current_obj.setPointEventCallback(function() {
        return $("#" + obj_type + "_data").val(current_obj.serialize());
      });
      $("#" + obj_type + "_submit").click(function(e) {
        e.preventDefault();
        return ajax_create_object(current_obj);
      });
      return $('#cancel').click(function(e) {
        e.preventDefault();
        return cancel(current_obj);
      });
    });
  };
  ajax_update_object = function(obj) {
    var action, form, type, types;
    type = obj.type;
    types = "" + type + "s";
    form = $("form.formtastic." + type);
    action = form.attr('action');
    return $.post(action, form.serialize(), function(data) {
      if (data.status === 'success') {
        cancel(obj);
        load_links();
        return flash_notice("Obiekt zapisana poprawnie");
      } else {
        return flash_alert("Błąd");
      }
    }, 'json');
  };
  ajax_create_object = function(obj) {
    var action, form, type, types;
    type = obj.type;
    types = "" + type + "s";
    form = $("#new_" + type);
    action = form.attr('action');
    if (!$("#" + type + "_data").val()) {
      return flash_alert('Narysuj obiekt  przed wysłaniem');
    } else {
      c("-> " + action);
      return $.post(action, form.serialize(), function(data) {
        if (data.status === 'success') {
          obj.unselect();
          obj.setId(data.id);
          GMapEdit[types][data.id] = obj;
          GMapEdit[types][data.id].setObjClickCallback(genericObjClickCallback);
          load_links();
          cancel(obj);
          return flash_notice("Obiekt zapisano poprawnie");
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
    var type, types;
    type = obj.type;
    types = "" + type + "s";
    return $.get("/" + types + "/" + obj.id, function(data) {
      return obj.deserialize(data);
    }, 'json');
  };
  genericObjClickCallback = function() {
    if (current_obj && current_obj.id !== this.id) {
      cancel(current_obj);
    }
    current_obj = this;
    current_obj.draw();
    return load_object_form();
  };
  c = function(x) {
    return console.log(x);
  };
}).call(this);
