class PolygonsController < ApplicationController

  def index
    respond_to do |format|
      format.js { render :json => current_user.polygons.to_json(:only => [ :id, :name, :description, :color, :data ]) }
    end
  end

  def show
    respond_to do |format|
      format.js { render :json => current_user.polygons.find(params[:id]).to_json(:only => [ :id, :name, :description, :color, :data ]) }
    end
  end


  def destroy
    polygon = current_user.polygons.find(params[:id])
    if polygon.destroy
      response = { :status => 'success'}
    else
      response = { :status => 'failed' }    
    end
    respond_to do |format|
      format.js { render :json => response }
    end

  end


  def update
    polygon = current_user.polygons.find(params[:id])
    polygon.update_attributes(params[:polygon])

    if polygon.save
      response = { :status => 'success'}
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end

  end

  def new
    @polygon = Polygon.new
    respond_to do |format|
      format.js
    end
  end

  def edit
    @polygon = current_user.polygons.find(params[:id])
  end

  def create
    polygon = current_user.polygons.create(params[:polygon])
    if polygon.save
      response = { :status => 'success', :id => polygon.id }
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end
  end

end
