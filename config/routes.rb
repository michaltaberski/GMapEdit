GMapEdit::Application.routes.draw do

  devise_for :users

  get "map/index"
  get "map/menu"
  get "map/kml", :as => "kml"


  resources :polygons
  resources :polylines
  resources :points

  root :to => "home#index"
end
