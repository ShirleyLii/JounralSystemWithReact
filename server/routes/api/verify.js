const User = require('../../models/User');
const bcrypt = require('bcrypt');
const UserSession = require('../../models/UserSession');

// const bcrypt = require('bcrypt');
module.exports = (app) => {

    /*
    * validate 
    */


    app.get('/api/account/verify', (request, response, next) => {
        //get the token 
        const { query } = request;
        const { token } = query;
        // verify the token is one of a kind 

        UserSession.find({
            _id: token,
            isDeleted: false 
        }, (error, sessions) => {
            if (error) {
                return response.send({
                   success: false,
                   messgage: 'Error: Server Error' 
                });
            }

            if (sessions.length != 1 ){
                return response.send({
                    success: false,
                    message: 'Error: Invalid session'
                });
            }

            else{
                return response.send({
                    success: true,
                    message: "Verified Successully"
                })
            }
        })

    });
    
}