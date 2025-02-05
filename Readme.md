

# 🚀 Express.js & MongoDB Cheat Sheet

## 📌 **Install Express**  
To install Express, run the following command in your terminal:
```bash
npm install express
```
This will add Express as a dependency in your `package.json`.

## 📌 **Create a Server**  
To create a server, initialize Express and define a server instance:
- Example: You create an instance of Express and assign it to a variable, then set it to listen on a specific port.

## 📌 **Listen to Port 7777**  
After setting up the server, you will use the `.listen()` method to specify the port where the server should run.
- Example: You tell the server to listen on port 7777, so it will respond when the browser or client hits that port.

## 📌 **Request Handlers for `/test` & `/hello`**  
You set up specific routes to handle GET requests.
- Example: When someone goes to `/test`, the server responds with a message like "Test Route". Similarly, for `/hello`, it might respond with "Hello World".

## 📌 **Install Nodemon & Update Scripts**  
Install Nodemon globally to automatically restart the server whenever changes are made:
```bash
npm install -g nodemon
```
Then, in your `package.json`, add a script to start the server with Nodemon:
```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```
This allows you to run the server in development mode with auto-reloading.

## 📌 **What are Dependencies?**  
Dependencies are external libraries that your project requires to function properly.
- Example: Express and Nodemon are dependencies that your project needs to handle HTTP requests and auto-restart during development.

## 📌 **What is the use of `-g` in `npm install`?**  
When you install a package globally using the `-g` flag, it makes that package available throughout your system rather than just within your project.
- Example: Installing `nodemon -g` makes it available from any terminal window, regardless of the current directory.

## 📌 **`^` vs `~` in `package.json`**  
The caret (`^`) and tilde (`~`) symbols in `package.json` control how versions are updated:
- `^1.2.3` allows updates to `1.x.x` but not `2.x.x`.
- `~1.2.3` allows updates to `1.2.x` but not `1.3.x`.

## 📌 **Initialize Git**  
Run the following command in your project folder to initialize a Git repository:
```bash
git init
```
This sets up version control for your project.

## 📌 **`.gitignore`**  
Create a `.gitignore` file to specify which files or folders should not be tracked by Git.
- Example: You would typically add `node_modules/` to `.gitignore` to prevent unnecessary files from being committed to the repository.

## 📌 **Create a Remote Repo on GitHub**  
Create a new repository on GitHub and link it to your local Git repository:
- Example: After creating the repo on GitHub, link it to your local project using:
```bash
git remote add origin <repo-url>
```

## 📌 **Push Code to GitHub**  
Once the GitHub repository is set up, push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```
This sends your code from your local machine to GitHub.

## 📌 **Play with Routes & Extensions**  
Define different routes with different URL patterns:
- Example: You might create a route `/hello/2`, which handles the `/hello` request with a parameter `2`.

## 📌 **Order of Routes Matters!**  
The order in which routes are defined affects how Express matches the requests:
- Example: If `/hello` comes before `/hello/2`, the `/hello/2` route might never be reached.

## 📌 **Install Postman & Test API Calls**  
Use Postman to test your API:
- Example: In Postman, create a collection and send a GET request to `http://localhost:7777/test` to check if the server is responding.

## 📌 **Handle API Calls in Express**  
Set up handlers for GET, POST, PATCH, and DELETE methods to manage resources.
- Example: You can create a POST request to add a new user to your database and a GET request to fetch user data.

## 📌 **Route Patterns (`?`, `+`, `()`, `*`)**  
Use special characters in route patterns:
- `?` for optional parameters.
- `+` for one or more occurrences of a character.
- `*` to match any sequence of characters.

## 📌 **Regex in Routes**  
You can use regular expressions in routes to match complex patterns:
- Example: `/^a/` will match routes starting with "a" and `/.*fly$/` will match routes ending with "fly".

## 📌 **Reading Query Params & Dynamic Routes**  
Access query parameters and dynamic route parameters:
- Example: For `/user/:id`, you can read the dynamic ID in `req.params.id`.
- For `/search?query=hello`, you access the query parameter via `req.query.query`.

## 📌 **Multiple Route Handlers & `next()`**  
Define multiple handlers for a single route. The `next()` function passes control to the next handler.
- Example: If you define multiple middlewares, `next()` passes control from one handler to the next.

## 📌 **Middleware - Why Do We Need It?**  
Middleware is used for logging, authentication, error handling, and more.
- Example: Authentication middleware ensures users are logged in before accessing protected routes.

## 📌 **How Express JS Handles Requests Behind the Scenes**  
When a request is made, Express processes it through middleware, matches the route, and sends a response:
- Example: A user hits `/hello` and Express matches the route and returns the "Hello World" response.

## 📌 **Difference between `app.use` and `app.all`**  
- `app.use()` is used to apply middleware to a route or all routes.
- `app.all()` handles all HTTP methods for a specific route.
- Example: `app.use()` might be used for logging, while `app.all()` could handle any HTTP method at `/contact`.

## 📌 **Write a Dummy Auth Middleware for Admin**  
Create middleware to check if the user is an admin:
- Example: In the middleware, check the user's role and deny access if they are not an admin.

## 📌 **Write a Dummy Auth Middleware for All User Routes, Except `/user/login`**  
Create middleware that checks if a user is authenticated for all routes except `/user/login`:
- Example: You allow access to the login route, but restrict other routes unless the user is logged in.

## 📌 **Error Handling using `app.use("/", (err, req, res, next) => {...})`**  
Create an error-handling middleware that catches all errors and sends a response:
- Example: If a route handler throws an error, it is caught by the global error handler and a proper error message is sent back to the client.

## 📌 **Create a Free Cluster on MongoDB Atlas**  
Go to MongoDB Atlas, create a free cluster, and generate a connection string:
- Example: The connection URL is something like `mongodb+srv://<user>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority`.

## 📌 **Install Mongoose Library**  
Install Mongoose to interact with MongoDB:
```bash
npm install mongoose
```

## 📌 **Connect Application to MongoDB**  
Use Mongoose to connect your app to MongoDB:
- Example: In your app, you use `mongoose.connect("<connection-url>/devTinder")` to establish the connection.

## 📌 **Create a User Schema & Model**  
Define a schema for your user data and create a model:
- Example: The schema might include fields like `name`, `email`, and `password`.

## 📌 **Create POST `/signup` API to Add Data to Database**  
Create a POST route that adds a user to your database:
- Example: When a new user signs up, their data is saved to MongoDB.

## 📌 **Push Documents Using Postman API Calls**  
Use Postman to make a POST request to add data to the `/signup` API:
- Example: Send a JSON body with user details and see the new document added to the database.

## 📌 **Error Handling Using Try, Catch**  
Use try-catch blocks to catch and handle errors during database operations:
- Example: If saving a user fails, the error is caught and a response is sent to the client.

## 📌 **JS Object vs JSON (Difference)**  
- **JS Object**: Used within JavaScript code to represent data.
- **JSON**: A data format that is often used for exchanging data between server and client.
- Example: JavaScript objects are part of your code, while JSON is a string representation used for sending/receiving data.

## 📌 **Add the `express.json()` Middleware to Your App**  
Add `express.json()` to your Express app to automatically parse incoming JSON data:
- Example: This allows you to read the `req.body` as a JSON object in routes that require it.

## 📌 **Make Your Signup API Dynamic to Receive Data**  
Ensure your `/signup` API accepts dynamic data from the client:
- Example: Use `req.body` to receive user data like `name`, `email`, and `password`.

## 📌 **User.findOne with Duplicate Emails - What Object is Returned?**  
When you query for a user by email and multiple documents match, `User.findOne()` returns the first matched document:
- Example: It will return the first user with the given email address, or `null` if no match is found.

## 📌 **API - Get User by Email**  
Create an API route to retrieve a user by their email:
- Example: A GET request to `/user/email` will return the user with the given email.

## 📌 **API - Feed API - Get All Users**  
Create an API route to retrieve all users:
- Example: A GET request to `/feed` will return a list of all users in your database.

## 📌 **API - Get User by ID**  
Create an API route to retrieve a user by their unique ID:
- Example: A GET request to `/user/:id` will return the user with that ID.

## 📌 **Create a Delete User API**  
Create a route that deletes a user by their ID:
- Example: A DELETE request to `/user/:id` will remove that user from the database.

## 📌 **Difference between PATCH and PUT**  
- **PATCH**: Updates only specific fields.
- **PUT**: Replaces the entire resource with new data.
- Example: PATCH updates just the `email`, while PUT would replace the whole user document.

## 📌 **API - Update a User**  
Create an API route to update a user's data:
- Example: A PUT request to `/user/:id` will replace the user's details with the provided data.

## 📌 **Explore the Mongoose Documentation for Model Methods**  
Review Mongoose’s documentation to learn about model methods like `find()`, `findOne()`, `update()`, etc.

## 📌 **Options in `Model.findOneAndUpdate()` Method**  
Explore the options you can use in the `findOneAndUpdate()` method, such as `{ new: true }` to return the updated document and `{ runValidators: true }` to enforce validation rules.

## 📌 **API - Update the User with Email ID**  
Create an API to update a user using their email:
- Example: A PATCH request to `/user/email` will update the user with that email.

---

This should give you a well-rounded **README** with examples explained in a clear format! Let me know if you need further adjustments! 😊