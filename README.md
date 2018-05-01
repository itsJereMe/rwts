# ranking-the-stars
Little quiz based on a Dutch show (Ranking the stars). Ask contenders to rank players based on the question, appoint points and have the possibility to add a memorable quote to each answer

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project is build using create-react-app. To run the app, you will need NodeJS with the package manager installed.
Furthermore, this project makes use of mlab's online mongodb services.

### Installing

1.  Clone the project
2.  Go to the projects folder and run
```
npm install
```
3.  create a .env file  with the following variables included:
```
MDB_USER='user'
MDB_PASS='pass'
MDB_DBASE='databasename'
```
4.  Or change line 27 of ```server.js``` to connect to a different db
```
mongoose.connect('mongodb://' + user + ':' + pass + '@ds143532.mlab.com:43532/' + database);
```
5.  Replace ```http://server:3001/api``` to e.g. ```http://localhost:3001/api``` in all the necessary files, to be able to access the api (server.js)
6.  Run the project using ```npm run start-dev```
