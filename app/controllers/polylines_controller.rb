class PolylinesController < ApplicationController


  def index
    respond_to do |format|
      format.js { render :json => current_user.polylines.to_json(:only => [ :id, :name, :description, :color, :data ]) }
    end
  end

  def show
    respond_to do |format|
      format.js { render :json => current_user.polylines.find(params[:id]).to_json(:only => [ :id, :name, :description, :color, :data ]) }
    end
  end


  def destroy
    polyline = current_user.polylines.find(params[:id])
    if polyline.destroy
      response = { :status => 'success'}
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end

  end


  def update
    polyline = current_user.polylines.find(params[:id])
    polyline.update_attributes(params[:polyline])

    if polyline.save
      response = { :status => 'success'}
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end

  end

  def new
    @polyline = Polyline.new
    respond_to do |format|
      format.js
    end
  end

  def edit
    @polyline = current_user.polylines.find(params[:id])
  end

  def create
    polyline = current_user.polylines.create(params[:polyline])
    if polyline.save
      response = { :status => 'success', :id => polyline.id }
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end
  end

end
