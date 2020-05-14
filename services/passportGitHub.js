const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/dev');

const User = mongoose.model('users')

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
});


passport.use(
    new TwitterStrategy({
        consumerKey: keys.twitterClientID,
        consumerSecret: keys.twitterSecretID,
        callbackURL: '/auth/twitter/callback',
        proxy: true

    }, async (accessToken,refreshToken,profile,done) => {
        console.log(profile)
        const existingUser = await User.findOne({twitterId: profile.id})
        if(existingUser){
            return done(null, existingUser)
        } else {
           const user = await new User({
                twitterId: profile.id,
                profilePic: profile._json.profile_image_url,
                displayName: profile.displayName
            }).save()

            done(null, user)
        }
    })
)