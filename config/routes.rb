Rails.application.routes.draw do
  root 'pages#home'
  get 'resume', to: 'pages#resume'
  get 'projects', to: 'pages#projects'
  get 'contact', to: 'pages#contact'
end

