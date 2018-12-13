const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    // entryId: {
    //     type: String,
    //     default: -1
    // },

    title: {
        type: String,
        default: ''
    },

    ebody: {
        type:String,
        default: ''
    },


    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // }

}); 

module.exports = mongoose.model('Entry', EntrySchema);

