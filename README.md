# Tasks API

API for schedule tasks and receive a sms reminder in your cell phone.
In this new version of my Tasks API, i implemented Cluster an Node.js module.
The reason was because the cluster module allows you to create a small network of separate processes which can share server ports,
this gives your Node.js app access to the full power of your server.
Another change was, switch to PostgreSQL instead of MongoDB, the reason was just to learn the use o RDBS and ORM with Node.js.

## Getting Started

Clone or download the repository.

In the sms.js, put your twillo credentials.
```
const accountSid = 'YOUR TWILLO ACCOUNT SID';
const authToken = 'YOUR TWILLO AUTH TOKEN';
const twilioNumber = 'YOUR TWILLO NUMBER';
```
In the db.js, put your db credentials.
```
const Conn = new Sequelize(
    '', //DB NAME
    '', //USERNAME
    '', //SERVER PASSWORD
    {
        dialect: 'postgres', //You can use any RDB that sequelize supports.
        host: '' //YOUR HOST
    }
);
```
### Prerequisites

You need an twillo account and Postgres installed.

### Installing
```
$ npm install -g
```

### Running
```
$ npm start
```

## Built With

* [Express](https://expressjs.com/) - The Node.JS web framework used.
* [Node.JS](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/) - The relational database used in the project.
* [Twillo API](https://www.twilio.com/) - Used to send a Text Message to the user cell phone.


## Authors

* **Alexandre Ramos** - [Portifolio Page](http://alexramos.esy.es)

