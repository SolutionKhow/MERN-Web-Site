const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJWT } = require('passport-jwt');

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        // find the user in the database
        const user = await User.findById(jwtPayload.id);
        // if user is found, add it to the request object
        if (user) {
          return done(null, user);
        }
        // if user is not found, return an error
        return done(null, false);
      } catch (error) {
        done(error);
      }
    }
  )
);

// this middleware function will add the user to the request object
exports.isAuthenticated = passport.authenticate('jwt', { session: false });
