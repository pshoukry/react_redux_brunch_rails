Rails.application.routes.draw do

  devise_for :users
  resources :users, defaults:  { format:  :json } do
    get 'current', on: :collection
  end

  resources :tickets, defaults: { format: :json } do
    get 'mine', on: :collection
    get 'assigned_to_me', on: :collection
    get 'closed_last_30_days', on: :collection
    patch 'assign_to_me', on: :member
  end

  resource :comments
  root 'home#index'
end
