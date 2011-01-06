GMapEdit::Application.routes.draw do

  devise_for :users

  get "map/index"

  resources :polygons
  resources :polylines
  resources :points

  root :to => "home#index"
end
