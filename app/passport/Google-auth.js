const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const User=require('../models/User');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new googleStrategy({
        clientID : process.env.GOOGLE_CLIENTID ,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET ,
        callbackURL : process.env.GOOGLE_CALLBACK 
    }, (token , refreshToken , profile , done ) => {
        User.findOne({ username: profile.emails[0].value } , (err , user) => {
            if(err) return done(err);
            if(user) return done(null , user);

            const newUser = new User({
                name : profile.displayName,
                username : profile.emails[0].value,
                password : profile.id,
                profileImage:profile.photos[0].value
            });

            newUser.save(err => {
                if(err) throw err;
                done(null , newUser);
            })

        })
    }));