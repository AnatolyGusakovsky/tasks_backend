Backend for tasks app
MVC based.

Requirements: 
Node 20 or higher - proven (but theoretically should work from v14)

Setup on Mac/Linux:
1. run `npm i`
2. install mongodb: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#installing-mongodb-6.0-edition-edition

Run
1. run MongoDB Linux - `sudo systemctl start mongod`, Mac - `brew services start mongodb-community`, Windows - `net start MongoDB`
2. ensure it's running `sudo systemctl status mongod`
3. run `npm run dev`

 