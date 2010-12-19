GMapEdit::Application.routes.draw do

  devise_for :users

  get "map/index"
  root :to => "home#index"
end
