## Storefy

An API for e-commerce sites, with auhthenthication and basic
functionalities, such as shopping cart, users, customers. You
can deploy this API and connect with your frontend app, you can
store your e-commerce data in the postgresql database

## Steps for run the project 🚀

### .env variables

For enviroment variables you can copy .env.example and change to .env
and change the value for all variables in order to use in this project

### Docker containers starts

    docker-compose up -d

### Login to pgadmin and connect to the postgres server 🚧

- Enter in `pgadmin`(localhost:5050)
- Login at pgadmin:
  you must create an .enx file in the root project folder
  with PGADMIN_EMAIL variable and value for the pgadmin username
  and PGADMIN_PASSWORD variable and value for the pgadmin password.

- Create and connect with postgresql Database:

  - Object > Register > Server
  - General.Name: storefy
  - Connection.Host: "docker-compose database service name"
  - Connection.Maintenance database: "same as .env DB_NAME"
  - Connection.Username: "same as .env DB_USER"
  - Connection.Password: "same as .env DB_PASSWORD"
