const mongoose = require('mongoose');

const EntriesSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },

    body: {
        type:String,
        default: ''
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}); 

module.exports = mongoose.model('Entries', EntriesSchema);

