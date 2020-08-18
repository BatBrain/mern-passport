const passport = require('passport')
const LocalStrategy = require('./localStrategy')
// const GoogleStratgey = require('./googleStrategy')
const OktaStrategy = require('./oktaStrategy')
// const OktaStrategy = require('passport-okta-oauth').Strategy;
const User = require('../db/models/user')


passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	console.log('DEserialize ... called')
	User.findOne(
		{ _id: id },
		'firstName lastName photos local.username',
		(err, user) => {
			console.log('======= DESERILAIZE USER CALLED ======')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})

// ==== Register Strategies ====
passport.use(LocalStrategy)
passport.use(OktaStrategy)
// passport.use(new OktaStrategy({
//     audience: process.env.OKTA_AUDIENCE,   
//     clientID: process.env.OKTA_CLIENTID,
//     clientSecret: process.env.OKTA_CLIENTSECRET,
//     idp: process.env.OKTA_IDP,
  
//     scope: ['openid', 'email', 'profile'],
//     response_type: 'code',
//     callbackURL: baseURL + "/auth/okta/callback"
  
//   }, function(accessToken, refreshToken, profile, done) {
  
//     return profile
//   }));
// passport.use(GoogleStratgey)


module.exports = passport
