class MapController < ApplicationController
  layout 'map'
  before_filter :authenticate_user!

  def index
  end

end
