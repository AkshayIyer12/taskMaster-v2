# TaskMaster-v2
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

* A simple application to manage tasks.

## How to run the project?
1. Install MongoDB by downloading it from [Mongo](https://www.mongodb.com/download-center)
2. Make directory ```/data``` in root directory.
3. Then create another directory ```db``` inside ```/data```.
4. In step 2 & 3 combined, you need to do this ```sudo mkdir /data/db```
5. Give permission to  ```/data/db``` using ```chown $USER -R /data/db``` 
6. Go to your terminal and run the mongoDB server using : ```mongod```
7. Go to your terminal and run the mongoDB-cli using: ```mongo```
8. To install the project dependencies run: ```npm install```
9. To run the project run: ```npm start```

## How to lint the code?

```npm test```

## What technologies are used?
* Express.js
* Node.js
* MongoDB
* React
* OAuth 2.0

## What dependencies are used?
* express
* body-parser
* path
* cors
* React
* React-dom
* React Scripts
* nodemon
* standardjs
* mongodb
* axios
* passport
* passport-google-oauth
* express-session

### How to file an issue, if you feel something is wrong ?
* Go to the [issues](https://github.com/anirudhbs/taskMaster-v2/issues) section of this project.
* Add issue in the following format:

```
Title: Keep the title concise and to the point.
Comment: State your problem description. Would be helpful if you state the error and code.
```