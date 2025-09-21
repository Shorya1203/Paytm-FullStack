# We are building paytm like application that let's users send money to each other given an initial dummy balance

# Steps: 

Step 1) 

-> Connect to the MongoDB instance
-> We need 3 routes for the user :
    -> Allow user to sign up
    -> Allow user to sign in
    -> Allow user to update their information (firstName, lastName, password) 

Step 2)
-> Creating the Mongoose Schema for the users table
-> Importing Mongoose and connecting to a Mongo Database
-> Creating the mongoose schema for users table
-> Export the mongoose model from the file(calling it user)

Step 3)
-> In the index.js file, route the all requests to /api/v1 to a apiRouter defined in backend/routes/index.js

-> Create a new file in bakcned/routes/index.js that exports the express router
-> import the router in index.js and route the requests from /api/v1 to it

Step 4) 
Create a new user router and import it in index router.
Route all the requests that go to /api/v1/user to the user router
Import all the userRouter in backneed/routes/index.js so all requests to /api/v1/user get routed to the userRouter

step 5)
-> Adding cors to the api's;
-> Adding body parser to the api's 
-> Adding jsonwebtokens

Step 6)
-> Adding backend routes
-> Signup -> This route needs the user information, do input validation and store the information in the database provided.

Step 7) 
--> Add a middleware to make sure only the authenticated users can hit it. We are introducing an auth middleware.

Step-8) User Routes
--> Create a route to update the information
--> create a route for user to get the other users from the backend -> route (api/v1/user/bulk) & queryParameter: ?filter = harkirat

Step-9) Creating the Bank Related Schema
-> In a payment application we store 8888 instead of 88.88 and then convert back.

Step-10) Transactions in databases
--> A lot of times, you want multiple databases transactions to be atomic
--> Either all of them should update or none should.
--> Revert everything if some issue came => Rollback everything if something fails.
--> We will do a transacations
--> Also there is another issue, if two requests came at the same time (with lets say send 10rs to user A and user B) => and the user only has balance of 10rs => Then it may be possible that both of the requests are fulfilled.

Step-11) Initialize balances on signup => Give each user a random balance between 1 and 10000.

Step-12) Creating a new route for the accounts -> all the requests with api/v1/account will be handled through the accountRouter

Step-13) Balance and transfer endpoints :
-> first endpoints for user to get their balance.
-> An endpoint for user to transfer money to other account 
-> for the second endpoint we have two problems -> concurrent request can pass even if we have insufficient balance & second partial changes can happen due to nodejs process being failed or DB going off.