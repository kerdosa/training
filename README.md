Sample Project with Express and Mongoose
===

## References

* [NodeJs hackathon starter](https://github.com/sahat/hackathon-starter)


## Setup

* [Nodejs 5.x.x](https://nodejs.org/)
* [MongoDB 3.2.x](https://www.mongodb.org/)
* [gulp 3.9.0](http://gruntjs.com/)
* [SendGrid 1.9.2](https://sendgrid.com/)


## Configuration
All configuration is set up in `config/default.js`.  To overwrite the configuration for production or test environment, add those to `config/production.js` or `config/test.js`.

* **MONGODB_URL** the MongoDB URI.
* **SERVER_PORT** the web server port.


## Heroku Deployment

Install heroku [toolbelt](https://toolbelt.heroku.com/), and run the following commands in the project folder. This deployment example uses MongoLab, the DB URL is automatically configured by an environment variable `MONGOLAB_URI` in Heroku.

Before deploy please check configuration is set correctly in the `config/default.js` and `.env` file.

	$ heroku login
	$ git init
	$ git add .
	$ git commit -m "init"
	$ heroku create
	$ heroku addons:create mongolab
	$ heroku addons:create sendgrid	
	$ git push heroku master
	// create test users
	$ heroku run node data/create-data.js
    $ heroku open
	$ heroku logs -t
	

## Local Deployment

Please make sure the MongoDB server is running locally.

Install gulp & mocha.

	$ npm install -g gulp
	$ npm install -g mocha

Unzip the submission and cd to the unzipped folder.

Install npm module dependencies.

	$ npm install
	$ bower install			// if necessary

Run jslint test.

	$ gulp lint

Create test users to database.

	$ cd data
	$ node create-data.js
	$ cd ..
	
This command creates two predefined users and 10 random users in DB.

| username | role |
| --------| ------ | ------ |
| admin@gmail.com  | Admin |
| user1@gmail.com  | Regular user|

Start the application.

	$ npm start
		
By default the application runs in port 3000. Visit http://localhost:3000

Run the test.
	
	$ gulp test
	

## Debug Message

To see the verbose debug message, export DEBUG=backend:api

	$ export DEBUG=backend:api

