# -*- encoding : utf-8 -*-
class MapController < ApplicationController
  layout 'map'
  before_filter :authenticate_user!

  def index
  end

  def menu
    
  end

  def kml
    @points = current_user.points.all
    @polygons = current_user.polygons.all
    @polylines = current_user.polylines.all
    output = render_to_string "map/kml", :layout => false
    # raise output
    send_data output, :filename => "#{current_user.id}_mapa.kml"
  end

end
