const passport=require('passport');
const githubStrategy=require('passport-github2').Strategy
const User=require('../models/User');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new githubStrategy({
        clientID : process.env.GITHUB_CLIENTID ,
        clientSecret : process.env.GITHUB_CLIENT_SECRET ,
        callbackURL : process.enITHUB_CALLBACK 
    }, (token , refreshToken , profile , done ) => {
        // console.log({
        //     "profile":profile.username,
        //     "id":profile.id,
        //     "name":profile.displayName,
        //     "profileImage":profile.photos[0].value
        // })
        User.findOne({ username: profile.username } , (err , user) => {
            if(err) return done(err);
            if(user) return done(null , user);

            const newUser = new User({
                name : profile.displayName,
                username : profile.username,
                password : profile.id,
                profileImage:profile.photos[0].value,
                role:"admin"
            });

            newUser.save(err => {
                if(err) throw err;
                done(null , newUser);
            })

        })
    }));