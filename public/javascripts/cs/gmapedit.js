/* DO NOT MODIFY. This file was compiled Sat, 08 Jan 2011 17:47:17 GMT from
 * /Users/tesla/Sites/Ruby_projects/GMapEdit/app/coffeescripts/gmapedit.coffee
 */

(function() {
  var conf;
  conf = {
    map: {
      zoom: 6,
      center: new google.maps.LatLng(52, 19),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      navigationControl: true,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.ZOOM_PAN,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      scaleControl: true,
      scaleControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_RIGHT
      }
    }
  };
  this['GMapEdit'] = {
    mapInit: function(latLng) {
      this.map = new google.maps.Map($('#map').get(0), conf.map);
      if (latLng) {
        this.map.setCenter(latLng);
      }
      return this.polygons = {};
    },
    getMap: function() {
      return this.map;
    }
  };
}).call(this);
