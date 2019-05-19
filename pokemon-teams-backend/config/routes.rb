Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/pokemons', to: 'pokemons#index'
  post '/pokemons', to: 'pokemons#create'
  delete '/pokemons/:id', to: 'pokemons#destroy'
  get '/trainers', to: 'trainers#index'
end
