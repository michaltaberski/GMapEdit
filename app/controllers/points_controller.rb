class PointsController < ApplicationController


  def index
    respond_to do |format|
      format.js { render :json => current_user.points.to_json(:only => [ :id, :name, :description, :color, :data ]) }
    end
  end

  def show
    respond_to do |format|
      format.js { render :json => current_user.points.find(params[:id]).to_json(:only => [ :id, :name, :description, :color, :data ]) }
    end
  end


  def destroy
    point = current_user.points.find(params[:id])
    if point.destroy
      response = { :status => 'success'}
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end

  end


  def update
    point = current_user.points.find(params[:id])
    point.update_attributes(params[:point])

    if point.save
      response = { :status => 'success'}
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end

  end

  def new
    @point = Point.new
    respond_to do |format|
      format.js
    end
  end

  def edit
    @point = current_user.points.find(params[:id])
    
  end

  def create
    point = current_user.points.create(params[:point])
    if point.save
      response = { :status => 'success', :id => point.id }
    else
      response = { :status => 'failed' }
    end
    respond_to do |format|
      format.js { render :json => response }
    end
  end


end
