/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.post("/login", "UsersController.login");
    Route.post("/logout", "UsersController.logout");
    Route.post("/register", "UsersController.create");
  }).prefix("/auth");

  Route.group(() => {
    
    Route.get("/", "UsersController.getByAuth");
    Route.put("/", "UsersController.update");
    Route.delete("/:id", "UsersController.destroy");
  }).prefix("/users");

  Route.group(() => {
    //Get Order by ID.
    Route.get("/:id", "OrdersController.getById");
    //Get All Orders by user auth
    Route.get("/", "OrdersController.getByAuth");
    //Create Order with order products.
    Route.post("/", "OrdersController.createOrder");

  }).prefix("/orders");

  Route.group(() => {
    Route.get("/:id", "ProductsController.getById");
    //Get All Products.
    Route.get("/", "ProductsController.getAll");
    Route.post("/", "ProductsController.create");
    Route.put("/", "ProductsController.update");
    Route.delete("/:id", "ProductsController.destroy");
  }).prefix("/products");

}).prefix('api');
