const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}); 
UserSchema.methods.generateHash = function(password){
    return bcrpyt.hashSync(password, bcrpyt.genSaltSync(8),null);
}

UserSchema.methods.validPassword = function(password){
    return bcrpyt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
