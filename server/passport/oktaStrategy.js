const OktaStrategy = require('passport-okta-oauth').Strategy;
const User = require('../db/models/user')
const baseURL = process.env.BASE_URL

const strategy = new OktaStrategy({
    audience: process.env.OKTA_AUDIENCE,   
    clientID: process.env.OKTA_CLIENTID,
    clientSecret: process.env.OKTA_CLIENTSECRET,
    idp: process.env.OKTA_IDP,
  
    scope: ['openid', 'email', 'profile'],
    response_type: 'code',
    callbackURL: baseURL + "/auth/okta/callback"
  
  }, function(accessToken, refreshToken, profile, done) {
  
    return profile
    console.log(profile)
  });

  module.exports = strategy