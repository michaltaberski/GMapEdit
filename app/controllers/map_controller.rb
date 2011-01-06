# -*- encoding : utf-8 -*-
class MapController < ApplicationController
  layout 'map'
  before_filter :authenticate_user!

  def index
    # flash[:notice] = 'Przezroczystość CSS3'
  end

end
