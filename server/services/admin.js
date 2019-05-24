const mongoose = require('mongoose');
const User = mongoose.model('User');

export const checkPassword = async (email,password)=> {
    let match = false;
    let user = await User.findOne({email: email})

    if(user) {
        match = user.comparePassword(password, user.password)    
    }

    return {
        match,
        user
    }

}