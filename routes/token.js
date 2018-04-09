import jwt from 'jwt-simple';
import bcrypt from "bcryptjs";
import Db from '../db';

module.exports = app => {
    const cfg = app.libs.config;
    const Users = Db.models.user;


    const isCompare = (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
    };


    app.post("/token", (req, res) => {
        if (req.body.email && req.body.password) {
          const email = req.body.email;
          const password = req.body.password;
          Users.findOne({where: {email: email}})
            .then(user => {
              if(isCompare(user.password, password)) {
                const payload = {id: user.id};
                res.json({
                  token: jwt.encode(payload, cfg.jwtSecret)
                });
              } else {
                res.sendStatus(401);
              }
            })
            .catch(error => {
              console.log(error);
              res.sendStatus(403);
            });
        } else {
          res.sendStatus(404);
        }
      });
};