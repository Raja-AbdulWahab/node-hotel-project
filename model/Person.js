const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Define the person Schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
})

personSchema.pre('save', async function (next){ 
    const person = this;
    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try {
        //Hash Password generation
        const salt = await bcrypt.genSalt(10);

        //Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)

        //Override the plain password with the hashed password 
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

//how compare function works
//atual pass = wahab and hashed pass of this is = svdtube
//login ---> Abdul
//svdtube --> extract salt from stored hashed pass
//salt+Abdul --> hash --> wdjfklfjvdf
//compare stored hash = svdtube with new hashed = wdjfklfjvdf
personSchema.methods.comparePassword = async function (candidatePassword){
    try {
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (err) {
        throw err;
    }
}

//Create person Model
const Person = mongoose.model('Person',personSchema)
module.exports = Person;