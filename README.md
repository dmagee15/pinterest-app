# Pinterest Clone App

User Stories

1. As an unauthenticated user, I can login with Twitter.
2. As an authenticated user, I can link to images.
3. As an authenticated user, I can delete images that I've linked to.
4. As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
5. As an unauthenticated user, I can browse other users' walls of images.
6. As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to have installed

```
Node.js v6.11.2 or greater
MongoDB v2.6.12 or greater
npm v3.10.10 or greater
```

### Installing

Fork the repository and create a local copy

```
1. Click the fork button on the upper right hand corner of this repository.
2. Open the command line, navigate to the directory of your choice.
3. Enter 'git clone https://github.com/yourUsername/pinterest-app.git' where 'yourUsername' is your github username.
```

Install dependencies

```
Type 'npm install' into the command line.
```

Create .env file in the local repository directory with the following contents:

```
MONGO_URI=mongodb://localhost:27017/pinterestapp
PORT=8080
APP_URL=http://localhost:8080/
TWITTER_KEY=(Your twitter key goes here)
TWITTER_SECRET=(Your twitter secret goes here)
```

Run MongoDB, start the server, and open app in browser window

```
1. In a separate command line window, navigate to where MongoDB is installed and type 'mongod.exe'.
2. In the other command line window, in the project directory, type 'node server.js'.
3. In a browser, navigate to http://localhost:8080/ to open the app. 
```