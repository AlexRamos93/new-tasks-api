import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import Db from './db';

module.exports = app => {
  const Users = Db.models.user;
  const opts = {};
  opts.secretOrKey = app.libs.config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const strategy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
    .then(user => {
      if (user) {
        return done(null, {
          id: user.id,
          email: user.email
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.libs.config.jwtSession),
  };
};