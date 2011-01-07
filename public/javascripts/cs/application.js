/* DO NOT MODIFY. This file was compiled Fri, 07 Jan 2011 21:43:00 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/application.coffee
 */

(function() {
  var flash_alert, flash_notice, links_setup, load_data, load_links, load_new_polygon_form, load_polygon_form, num, points, polygons, polylines;
  polylines = new Array();
  polygons = new Array();
  points = new Array();
  num = 0;
  $(function() {
    GMapEdit.mapInit();
    this.map = GMapEdit.getMap();
    $('.flash').fadeOut(2000, function() {
      return $(this).remove();
    });
    load_data();
    return links_setup();
  });
  load_data = function() {
    var p, _i, _len;
    for (_i = 0, _len = polygons.length; _i < _len; _i++) {
      p = polygons[_i];
      p.destroy();
    }
    return $.get("/polygons", function(data) {
      var p, temp, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        p = data[_i];
        temp = new GMapEdit.Polygon(GMapEdit.getMap());
        temp.deserialize(p);
        temp.setObjClickCallback(function() {
          return load_polygon_form(this);
        });
        _results.push(polygons.push(temp));
      }
      return _results;
    }, "json");
  };
  links_setup = function() {
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
  };
  load_links = function() {
    return $.getScript('/map/menu', function() {
      return links_setup();
    });
  };
  load_polygon_form = function(poly) {
    return $.getScript("/polygons/" + (poly.getId()) + "/edit", function() {
      poly.setPointEventCallback(function() {
        return $('#polygon_data').val(poly.serialize());
      });
      poly.draw();
      return $('#cancel').click(function(e) {
        poly.setPointEventCallback(function() {});
        poly.unselect();
        e.preventDefault();
        load_links();
        return load_data();
      });
    });
  };
  load_new_polygon_form = function() {
    return $.getScript($('#new_polygon_link').attr('href'), function() {
      var poly;
      poly = new GMapEdit.Polygon(GMapEdit.getMap());
      poly.draw();
      poly.setPointEventCallback(function() {
        return $('#polygon_data').val(poly.serialize());
      });
      $('#polygon_submit').click(function(e) {
        var action, form;
        e.preventDefault();
        form = $('#new_polygon');
        action = form.attr('action');
        if (!$('#polygon_data').val()) {
          return flash_alert('Narysuj powierzchnię przed wysłaniem');
        } else {
          return $.post(action, form.serialize(), function(data) {
            if (data.status === 'success') {
              poly.unselect();
              poly.setId(data.id);
              polygons.push(poly);
              load_links();
              return flash_notice("Powierzchnia zapisana poprawnie");
            }
          }, 'json');
        }
      });
      return $('#cancel').click(function(e) {
        poly.setPointEventCallback(function() {});
        poly.destroy();
        e.preventDefault();
        return load_links();
      });
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
