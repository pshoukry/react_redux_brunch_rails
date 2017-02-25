# Tickets
An Example SPA written in React/Redux with backend Rails API:

- Brunch is used to compile SPA code in frontend folder to Rails asset pipeline.
- karma is used to run frontend tests
- Rspec used for rails tests
- Jasmine used for frontend tests

## Installation and prerequisites
1- Install required gems

```
bundle install
```

2- Configure the database
- In case there is a running MySQL instance edit config/database.yml to reflect the MySQL server credentials.

- In case you have docker installed and don't have mysql the following command will create a dockerized MySQL server
  for the purpose of developing/testing the application

```
docker-compose up -d db
```

3- Install frontend requirements

```
cd  frontend
npm install
npm install -g brunch
npm install -g karma
```

## Create and initialize the database
In the Code directory run:

```
rake db:create
rake db:migrate
rake db:seed
```

## Starting the server
In the Code directory run:

```
rails s
```

If you want to modify the javscript code in the frontend folder run:

```
brunch watch
```

## Running tests
- Rspec

In the code directory run:

```
bundle exec guard
```

- Jasmine

in the frontend folder

```
karama start
```

## Checking coverage
- Backend

  in coverage/

- Frontend

  in frontend/coverage
