# -*- encoding : utf-8 -*-
class HomeController < ApplicationController

  def index
    if current_user
      redirect_to map_index_path 
    end
  end

end
