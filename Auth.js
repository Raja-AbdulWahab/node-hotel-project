const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;//local strategy means authentication through username and password.
const Person = require('./model/Person')

//Authentication
passport.use(new LocalStrategy(async(USERNAME, PASSWORD, done)=>{
    //authentication logic here 
    try {
        //console.log('Recieved Credentials:', USERNAME, PASSWORD);
        const user = await Person.findOne({username: USERNAME})
        if(!user){
            return done(null, false, {message: 'Incorrect Username.'});//done takes 3 parameters done(error,user,info).If user true done(null,user)
        }
        const isPasswordMatch =  await user.comparePassword(PASSWORD) //user.password === PASSWORD? true: false;
        if(isPasswordMatch){
            return done(null, user)
        }
        else{
            return done(null, false, {message: 'Incorrect password'});
        }

    } catch (err) {
        return done(err);
    }
}))

module.exports = passport;