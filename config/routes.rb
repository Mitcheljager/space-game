Rails.application.routes.draw do
  root "home#index"

  resources :orbits, only: [:index, :show]
end
